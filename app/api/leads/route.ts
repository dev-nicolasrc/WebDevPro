import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leads = await prisma?.lead?.findMany({
      include: { cotizaciones: true, reuniones: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ leads: leads ?? [] });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json({ error: 'Error al obtener leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { nombre, email, telefono, tipoNegocio, fuente } = body ?? {};
    if (!email || !nombre) {
      return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 });
    }
    const lead = await prisma?.lead?.upsert({
      where: { email },
      update: { nombre, telefono, tipoNegocio, fuente: fuente ?? 'contacto' },
      create: { nombre, email, telefono, tipoNegocio, fuente: fuente ?? 'contacto' },
    });
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Create lead error:', error);
    return NextResponse.json({ error: 'Error al crear lead' }, { status: 500 });
  }
}