import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from '@/libs/pusher';
import prisma from '@libs/prisma';

interface IParams {
  conversationId: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  try {
    const conversationId = params.conversationId;
    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid Id', { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          'conversation:delete',
          existingConversation
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.error('ERROR_DELETE_CONVERSATION', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
