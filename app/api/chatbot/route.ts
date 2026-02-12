import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `Eres el asistente virtual de WebDev Pro, una agencia de desarrollo web profesional. Tu objetivo es:

1. CALIFICAR LEADS: Hacer preguntas estrategicas para entender las necesidades del cliente.
2. PRESENTAR SERVICIOS: Recomendar el paquete adecuado segun el tipo de negocio y necesidades.
3. RECOPILAR INFORMACION: Obtener nombre, email, telefono y tipo de negocio.
4. AGENDAR REUNIONES: Ofrecer agendar una llamada/reunion.

PAQUETES DISPONIBLES:
- Basico ($499 USD): Landing page profesional, 1 pagina, formulario contacto, responsive, SEO basico, 7 dias.
- Profesional ($1,299 USD): Sitio completo 5-7 paginas, galeria, blog, SEO optimizado, redes sociales, 14 dias. (MAS POPULAR)
- Premium ($2,499 USD): Hasta 15 paginas, sistema reservas, panel admin, chat en vivo, animaciones, soporte prioritario, 21 dias.
- E-commerce ($3,499 USD): Tienda online completa, catalogo ilimitado, carrito, pasarela pagos, inventario, reportes, 30 dias.

ESPECIALIZACIONES: Restaurantes, Hoteles, Clinicas.

INSTRUCCIONES:
- Se amigable y profesional
- Haz preguntas una a la vez
- Si el usuario muestra interes, pregunta por sus datos de contacto
- Si quiere agendar reunion, pide: nombre, email, telefono, fecha y hora preferida
- Responde en espanol
- Mantiene las respuestas concisas (2-3 oraciones max por punto)

Cuando el usuario proporcione datos de contacto o quiera agendar reunion, responde con un JSON estructurado al final de tu mensaje usando este formato exacto:
[DATA]{"action":"save_lead","data":{"nombre":"...","email":"...","telefono":"...","tipoNegocio":"..."}}[/DATA]
o
[DATA]{"action":"schedule_meeting","data":{"nombre":"...","email":"...","telefono":"...","fecha":"YYYY-MM-DD","hora":"HH:MM"}}[/DATA]`;

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { message, conversationId, history } = body ?? {};
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...((history ?? [])?.map?.((m: any) => ({ role: m?.role, content: m?.content })) ?? []),
      { role: 'user', content: message },
    ];
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}` },
      body: JSON.stringify({ model: 'gpt-4.1-mini', messages, stream: true, max_tokens: 1000 }),
    });
    let currentConversationId = conversationId;
    let fullContent = '';
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response?.body?.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let partialRead = '';
        try {
          while (true) {
            const result = await reader?.read();
            if (result?.done) break;
            partialRead += decoder?.decode(result?.value, { stream: true });
            const lines = partialRead?.split('\n');
            partialRead = lines?.pop() || '';
            for (const line of (lines ?? [])) {
              if (line?.startsWith('data: ')) {
                const data = line?.slice(6);
                if (data === '[DONE]') {
                  // Process extracted data
                  const dataMatch = fullContent?.match(/\[DATA\](.+?)\[\/DATA\]/s);
                  if (dataMatch) {
                    try {
                      const actionData = JSON.parse(dataMatch?.[1] ?? '{}');
                      if (actionData?.action === 'save_lead' && actionData?.data?.email) {
                        const leadData = actionData?.data ?? {};
                        const lead = await prisma?.lead?.upsert({
                          where: { email: leadData?.email },
                          update: { nombre: leadData?.nombre, telefono: leadData?.telefono, tipoNegocio: leadData?.tipoNegocio, fuente: 'chatbot' },
                          create: { nombre: leadData?.nombre ?? '', email: leadData?.email ?? '', telefono: leadData?.telefono, tipoNegocio: leadData?.tipoNegocio, fuente: 'chatbot' },
                        });
                        // Send notification
                        await sendLeadNotification(leadData);
                      } else if (actionData?.action === 'schedule_meeting' && actionData?.data?.email) {
                        const meetingData = actionData?.data ?? {};
                        const lead = await prisma?.lead?.upsert({
                          where: { email: meetingData?.email },
                          update: { nombre: meetingData?.nombre, telefono: meetingData?.telefono },
                          create: { nombre: meetingData?.nombre ?? '', email: meetingData?.email ?? '', telefono: meetingData?.telefono, fuente: 'chatbot' },
                        });
                        await prisma?.reunion?.create({
                          data: { leadId: lead?.id ?? '', fechaReunion: new Date(meetingData?.fecha ?? new Date()), horaReunion: meetingData?.hora ?? '10:00', estado: 'programada' },
                        });
                        await sendMeetingNotification(meetingData);
                      }
                    } catch (e) { console.error('Action parse error:', e); }
                  }
                  // Save conversation
                  if (!currentConversationId) {
                    const conv = await prisma?.conversacionChatbot?.create({ data: { mensajes: [...(history ?? []), { role: 'user', content: message }, { role: 'assistant', content: fullContent }] } });
                    currentConversationId = conv?.id;
                  } else {
                    await prisma?.conversacionChatbot?.update({ where: { id: currentConversationId }, data: { mensajes: [...(history ?? []), { role: 'user', content: message }, { role: 'assistant', content: fullContent }] } });
                  }
                  controller?.enqueue(encoder?.encode(`data: ${JSON.stringify({ done: true, conversationId: currentConversationId })}\n\n`));
                  controller?.close();
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed?.choices?.[0]?.delta?.content || '';
                  if (content) {
                    fullContent += content;
                    const cleanContent = content?.replace(/\[DATA\].*?\[\/DATA\]/gs, '');
                    if (cleanContent) {
                      controller?.enqueue(encoder?.encode(`data: ${JSON.stringify({ content: cleanContent, conversationId: currentConversationId })}\n\n`));
                    }
                  }
                } catch (e) { /* skip */ }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          controller?.error(error);
        }
      },
    });
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Error en el chatbot' }, { status: 500 });
  }
}

async function sendLeadNotification(leadData: any) {
  try {
    const appUrl = process.env.NEXTAUTH_URL || '';
    const appName = appUrl ? new URL(appUrl)?.hostname?.split('.')?.[0] : 'WebDev Pro';
    const htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#0066FF;border-bottom:2px solid #0066FF;padding-bottom:10px;">Nuevo Lead del Chatbot</h2><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Nombre:</strong> ${leadData?.nombre || 'No proporcionado'}</p><p><strong>Email:</strong> <a href="mailto:${leadData?.email}">${leadData?.email}</a></p><p><strong>Telefono:</strong> ${leadData?.telefono || 'No proporcionado'}</p><p><strong>Tipo de Negocio:</strong> ${leadData?.tipoNegocio || 'No especificado'}</p></div><p style="color:#666;font-size:12px;">Recibido: ${new Date().toLocaleString()}</p></div>`;
    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deployment_token: process.env.ABACUSAI_API_KEY, app_id: process.env.WEB_APP_ID, notification_id: process.env.NOTIF_ID_NUEVO_LEAD_DEL_CHATBOT, subject: `Nuevo Lead: ${leadData?.nombre || 'Cliente Potencial'}`, body: htmlBody, is_html: true, recipient_email: 'dev.nicolasrodriguez@gmail.com', sender_alias: appName }),
    });
  } catch (e) { console.error('Lead notification error:', e); }
}

async function sendMeetingNotification(meetingData: any) {
  try {
    const appUrl = process.env.NEXTAUTH_URL || '';
    const appName = appUrl ? new URL(appUrl)?.hostname?.split('.')?.[0] : 'WebDev Pro';
    const htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#06D6A0;border-bottom:2px solid #06D6A0;padding-bottom:10px;">Nueva Reunion Agendada</h2><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Nombre:</strong> ${meetingData?.nombre || 'No proporcionado'}</p><p><strong>Email:</strong> <a href="mailto:${meetingData?.email}">${meetingData?.email}</a></p><p><strong>Telefono:</strong> ${meetingData?.telefono || 'No proporcionado'}</p><p><strong>Fecha:</strong> ${meetingData?.fecha || 'Por definir'}</p><p><strong>Hora:</strong> ${meetingData?.hora || 'Por definir'}</p></div><p style="color:#666;font-size:12px;">Agendado: ${new Date().toLocaleString()}</p></div>`;
    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deployment_token: process.env.ABACUSAI_API_KEY, app_id: process.env.WEB_APP_ID, notification_id: process.env.NOTIF_ID_NUEVA_REUNIN_AGENDADA, subject: `Nueva Reunion: ${meetingData?.nombre || 'Cliente'} - ${meetingData?.fecha}`, body: htmlBody, is_html: true, recipient_email: 'dev.nicolasrodriguez@gmail.com', sender_alias: appName }),
    });
  } catch (e) { console.error('Meeting notification error:', e); }
}