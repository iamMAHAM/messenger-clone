import prisma from '@libs/prisma';

import getCurrentUser from './getCurrentUser';

const getConversationById = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export default getConversationById;
