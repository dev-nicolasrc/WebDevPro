import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createMercadoPagoPreference, getMercadoPagoConfig } from '@/lib/mercadopago';
import { Currency } from '@/lib/currency';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cotizacionId, moneda } = body;

    const cotizacion = await prisma.cotizacion.findUnique({
      where: { id: cotizacionId },
      include: { lead: true },
    });

    if (!cotizacion) {
      return NextResponse.json(
        { error: 'Cotización no encontrada' },
        { status: 404 }
      );
    }

    const precio = cotizacion.precioLocal || cotizacion.precioEstimado;
    const currency = (cotizacion.moneda || moneda || 'USD') as Currency;

    const config = getMercadoPagoConfig();

    const preference = await createMercadoPagoPreference(
      {
        title: `Cotización - ${cotizacion.tipoSitio}`,
        description: `Pago de cotización para ${cotizacion.lead.nombre}`,
        price: precio,
        currency: currency,
        quantity: 1,
        leadEmail: cotizacion.lead.email,
        leadName: cotizacion.lead.nombre,
        cotizacionId: cotizacion.id,
      },
      config
    );

    await prisma.pago.create({
      data: {
        leadId: cotizacion.leadId,
        cotizacionId: cotizacion.id,
        monto: precio,
        moneda: currency,
        metodoPago: 'mercadopago',
        estadoPago: 'pendiente',
        mercadoPagoId: preference.id,
      },
    });

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (error) {
    console.error('Error creating quotation payment:', error);
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    );
  }
}
