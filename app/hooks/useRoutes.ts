import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';

import useConversation from './useConversation';

const useRoutes = () => {
  const { conversationId } = useConversation();
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        active: pathname === '/conversations' || !!conversationId,
        icon: HiChat,
      },
      {
        label: 'Users',
        href: '/users',
        active: pathname === '/users',
        icon: HiUsers,
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [conversationId, pathname]
  );

  return routes;
};

export default useRoutes;
