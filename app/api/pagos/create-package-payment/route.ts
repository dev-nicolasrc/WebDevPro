import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createMercadoPagoPreference, getMercadoPagoConfig } from '@/lib/mercadopago';
import { Currency } from '@/lib/currency';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('📦 Received payment request:', body);

    const { nombre, email, telefono, empresa, paquete, precio, moneda } = body;

    if (!nombre || !email || !telefono || !paquete || !precio || !moneda) {
      console.error('❌ Missing required fields:', { nombre, email, telefono, paquete, precio, moneda });
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    console.log('🔍 Looking for lead with email:', email);
    let lead = await prisma.lead.findUnique({
      where: { email },
    });

    if (!lead) {
      console.log('➕ Creating new lead...');
      lead = await prisma.lead.create({
        data: {
          nombre,
          email,
          telefono,
          empresa: empresa || null,
          origen: 'paquete_directo',
          estado: 'nuevo',
        },
      });
      console.log('✅ Lead created:', lead.id);
    } else {
      console.log('✅ Lead found:', lead.id);
    }

    console.log('📝 Creating cotizacion...');
    const cotizacion = await prisma.cotizacion.create({
      data: {
        leadId: lead.id,
        tipoSitio: paquete,
        caracteristicas: {},
        precioEstimado: precio,
        precioLocal: precio,
        moneda: moneda || 'USD',
        estado: 'pendiente',
      },
    });
    console.log('✅ Cotizacion created:', cotizacion.id);

    console.log('💳 Getting MercadoPago config...');
    const config = getMercadoPagoConfig();
    console.log('✅ MercadoPago config loaded');

    console.log('🔐 Creating MercadoPago preference...');
    const preference = await createMercadoPagoPreference(
      {
        title: `Paquete ${paquete}`,
        description: `Compra de paquete ${paquete}`,
        price: precio,
        currency: (moneda || 'USD') as Currency,
        quantity: 1,
        leadEmail: email,
        leadName: nombre,
        cotizacionId: cotizacion.id,
      },
      config
    );
    console.log('✅ MercadoPago preference created:', preference.id);

    console.log('💾 Creating payment record...');
    await prisma.pago.create({
      data: {
        leadId: lead.id,
        cotizacionId: cotizacion.id,
        monto: precio,
        moneda: moneda || 'USD',
        metodoPago: 'mercadopago',
        estadoPago: 'pendiente',
        mercadoPagoId: preference.id,
      },
    });
    console.log('✅ Payment record created');

    console.log('🎉 Payment process completed successfully');
    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
    });
  } catch (error) {
    console.error('❌ Error creating package payment:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      {
        error: 'Error al crear la preferencia de pago',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
