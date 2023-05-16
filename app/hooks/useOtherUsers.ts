import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import getSession from '@/actions/getSession';
import { FullConversationType } from '@/types';

const useOtherUsers = async (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUsers = conversation.users.filter(
      (u) => u.email !== currentUserEmail
    );

    return otherUsers;
  }, [conversation.users, session?.data?.user?.email]);
};

export default userOtherUsers;
