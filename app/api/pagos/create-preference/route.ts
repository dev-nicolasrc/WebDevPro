import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createMercadoPagoPreference, getMercadoPagoConfig } from '@/lib/mercadopago';
import { getCurrencyFromCountry, type Currency } from '@/lib/currency';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cotizacionId, leadId, country } = body;

    if (!cotizacionId || !leadId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cotizacion = await prisma.cotizacion.findUnique({
      where: { id: cotizacionId },
      include: { lead: true },
    });

    if (!cotizacion) {
      return NextResponse.json({ error: 'Cotizacion not found' }, { status: 404 });
    }

    const currency = (cotizacion.moneda as Currency) || getCurrencyFromCountry(country || 'CO');
    const precio = cotizacion.precioLocal || cotizacion.precioEstimado;

    const config = getMercadoPagoConfig();

    const preference = await createMercadoPagoPreference(
      {
        title: `Desarrollo Web - ${cotizacion.tipoSitio}`,
        description: `Paquete ${cotizacion.tipoSitio} para ${cotizacion.lead.nombre}`,
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
        metadata: { init_point: preference.init_point },
      },
    });

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (error: any) {
    console.error('Error creating payment preference:', error);
    return NextResponse.json(
      { error: 'Failed to create payment preference', details: error.message },
      { status: 500 }
    );
  }
}
