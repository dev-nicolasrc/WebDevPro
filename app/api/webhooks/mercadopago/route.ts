import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getPaymentInfo, getMercadoPagoConfig } from '@/lib/mercadopago';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'payment') {
      const paymentId = data.id;
      const config = getMercadoPagoConfig();

      const paymentInfo = await getPaymentInfo(paymentId, config.accessToken);

      const externalReference = paymentInfo.external_reference;

      const pago = await prisma.pago.findFirst({
        where: {
          OR: [
            { mercadoPagoId: paymentInfo.preference_id },
            { cotizacionId: externalReference },
          ],
        },
      });

      if (pago) {
        await prisma.pago.update({
          where: { id: pago.id },
          data: {
            transaccionId: paymentId,
            mercadoPagoStatus: paymentInfo.status,
            estadoPago:
              paymentInfo.status === 'approved'
                ? 'completado'
                : paymentInfo.status === 'rejected'
                ? 'rechazado'
                : 'pendiente',
            metadata: paymentInfo,
          },
        });

        if (paymentInfo.status === 'approved' && pago.cotizacionId) {
          await prisma.cotizacion.update({
            where: { id: pago.cotizacionId },
            data: { estado: 'pagado' },
          });

          await prisma.lead.update({
            where: { id: pago.leadId },
            data: { estado: 'convertido' },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
