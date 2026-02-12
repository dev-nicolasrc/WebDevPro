import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request?.json();
    const { email, password } = body ?? {};
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y password son requeridos' }, { status: 400 });
    }
    const user = await prisma?.user?.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }
    const isValid = await bcrypt?.compare(password, user?.password ?? '');
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }
    return NextResponse.json({ success: true, user: { id: user?.id, email: user?.email, name: user?.name } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error al iniciar sesion' }, { status: 500 });
  }
}