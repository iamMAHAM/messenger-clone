import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from '@/libs/pusher';
import prisma from '@libs/prisma';

interface IParams {
  conversationId: string;
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  try {
    const conversationId = params.conversationId;
    const currentUser = await getCurrentUser();

    if (!currentUser?.email || !currentUser.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid Id', { status: 404 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
      },
    });

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversation.id,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      currentUser.email,
      'conversation:update',
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (e: any) {
    console.error('ERROR_MESSAGES_SEEN_ROUTE', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
