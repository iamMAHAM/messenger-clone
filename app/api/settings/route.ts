import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prisma';

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const { name, image } = body;

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('ERROR_UPDATE_SETTINGS', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
