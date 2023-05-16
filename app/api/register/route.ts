import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new NextResponse('Missing parameters', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new NextResponse('Email already exists', { status: 401 });
    }
    console.error('REGISTRATION_ERROR : ', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
