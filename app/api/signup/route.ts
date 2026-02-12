import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { email, password, name } = body ?? {};
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y password son requeridos' }, { status: 400 });
    }
    const existingUser = await prisma?.user?.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
    }
    const hashedPassword = await bcrypt?.hash(password, 10);
    const user = await prisma?.user?.create({
      data: { email, password: hashedPassword, name: name || email?.split('@')?.[0] || 'User', role: 'admin' },
    });
    return NextResponse.json({ success: true, user: { id: user?.id, email: user?.email, name: user?.name } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}