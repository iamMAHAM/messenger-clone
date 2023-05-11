import prisma from '@libs/prismadb';
import getSession from './getSession';

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
    return [];
  }
};

export default getUsers;
