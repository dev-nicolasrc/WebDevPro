import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { nombre, email, telefono, tipoNegocio, tipoSitio, caracteristicas, precioEstimado, descripcion, moneda, precioLocal } = body ?? {};
    if (!email || !nombre) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 });
    }
    // Create or update lead
    const lead = await prisma?.lead?.upsert({
      where: { email },
      update: { nombre, telefono, tipoNegocio, fuente: 'cotizador' },
      create: { nombre, email, telefono, tipoNegocio, fuente: 'cotizador' },
    });
    // Create quotation
    const cotizacion = await prisma?.cotizacion?.create({
      data: {
        leadId: lead?.id ?? '',
        tipoSitio: tipoSitio ?? 'profesional',
        caracteristicas: caracteristicas ?? {},
        precioEstimado: precioEstimado ?? 0,
        descripcion,
        estado: 'pendiente',
        moneda: moneda ?? 'USD',
        precioLocal: precioLocal ?? precioEstimado ?? 0
      },
    });
    // Send notification email
    await sendCotizacionNotification({ nombre, email, telefono, tipoNegocio, tipoSitio, precioEstimado, descripcion, caracteristicas });
    return NextResponse.json({ success: true, cotizacionId: cotizacion?.id, cotizacion: { id: cotizacion?.id, precioEstimado: cotizacion?.precioEstimado } });
  } catch (error) {
    console.error('Cotizacion error:', error);
    return NextResponse.json({ error: 'Error al crear cotizacion' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cotizaciones = await prisma?.cotizacion?.findMany({ include: { lead: true }, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ cotizaciones: cotizaciones ?? [] });
  } catch (error) {
    console.error('Get cotizaciones error:', error);
    return NextResponse.json({ error: 'Error al obtener cotizaciones' }, { status: 500 });
  }
}

async function sendCotizacionNotification(data: any) {
  try {
    const appUrl = process.env.NEXTAUTH_URL || '';
    const appName = appUrl ? new URL(appUrl)?.hostname?.split('.')?.[0] : 'WebDev Pro';
    const caracteristicasHtml = Object.entries(data?.caracteristicas ?? {})?.map(([key, val]) => `<li>${key}: ${val}</li>`)?.join('') || 'N/A';
    const htmlBody = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#0066FF;border-bottom:2px solid #0066FF;padding-bottom:10px;">Nueva Cotizacion Solicitada</h2><div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;"><p><strong>Nombre:</strong> ${data?.nombre || 'N/A'}</p><p><strong>Email:</strong> <a href="mailto:${data?.email}">${data?.email}</a></p><p><strong>Telefono:</strong> ${data?.telefono || 'N/A'}</p><p><strong>Tipo de Negocio:</strong> ${data?.tipoNegocio || 'N/A'}</p><p><strong>Tipo de Sitio:</strong> ${data?.tipoSitio || 'N/A'}</p><p><strong>Precio Estimado:</strong> $${data?.precioEstimado?.toLocaleString?.() || 0} USD</p><p><strong>Descripcion:</strong> ${data?.descripcion || 'N/A'}</p><p><strong>Caracteristicas:</strong></p><ul>${caracteristicasHtml}</ul></div><p style="color:#666;font-size:12px;">Solicitado: ${new Date().toLocaleString()}</p></div>`;
    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deployment_token: process.env.ABACUSAI_API_KEY, app_id: process.env.WEB_APP_ID, notification_id: process.env.NOTIF_ID_NUEVA_COTIZACIN_SOLICITADA, subject: `Nueva Cotizacion: ${data?.nombre} - $${data?.precioEstimado?.toLocaleString?.() || 0} USD`, body: htmlBody, is_html: true, recipient_email: 'dev.nicolasrodriguez@gmail.com', sender_alias: appName }),
    });
  } catch (e) { console.error('Cotizacion notification error:', e); }
}