import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reuniones = await prisma?.reunion?.findMany({ include: { lead: true }, orderBy: { fechaReunion: 'desc' } });
    return NextResponse.json({ reuniones: reuniones ?? [] });
  } catch (error) {
    console.error('Get reuniones error:', error);
    return NextResponse.json({ error: 'Error al obtener reuniones' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { leadId, fechaReunion, horaReunion, notas } = body ?? {};
    if (!leadId || !fechaReunion) {
      return NextResponse.json({ error: 'LeadId y fecha son requeridos' }, { status: 400 });
    }
    const reunion = await prisma?.reunion?.create({
      data: { leadId, fechaReunion: new Date(fechaReunion), horaReunion: horaReunion ?? '10:00', notas, estado: 'programada' },
    });
    return NextResponse.json({ success: true, reunion });
  } catch (error) {
    console.error('Create reunion error:', error);
    return NextResponse.json({ error: 'Error al crear reunion' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request?.json();
    const { id, estado, notas } = body ?? {};
    if (!id) {
      return NextResponse.json({ error: 'ID es requerido' }, { status: 400 });
    }
    const reunion = await prisma?.reunion?.update({ where: { id }, data: { estado, notas } });
    return NextResponse.json({ success: true, reunion });
  } catch (error) {
    console.error('Update reunion error:', error);
    return NextResponse.json({ error: 'Error al actualizar reunion' }, { status: 500 });
  }
}