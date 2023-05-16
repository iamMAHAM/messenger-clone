import getSession from './getSession';

import prisma from '@/libs/prisma';

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          not: session.user.email,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  } catch (e: any) {
    console.error(e);
    return [];
  }
};

export default getUsers;
