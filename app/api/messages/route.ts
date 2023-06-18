import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import { pusherServer } from '@/libs/pusher';
import prisma from '@libs/prisma';

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { conversationId, image, message } = body;

    if (!currentUser?.email || !currentUser.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        image,
        body: message,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', lastMessage);
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
