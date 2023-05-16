import prisma from '@/libs/prisma';

import getSession from './getSession';

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (e: any) {
    console.error(e);
    return null;
  }
};

export default getCurrentUser;
