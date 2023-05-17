import prisma from '@libs/prisma';

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return messages;
  } catch (e: any) {
    console.error(e);
    return [];
  }
};

export default getMessages;
