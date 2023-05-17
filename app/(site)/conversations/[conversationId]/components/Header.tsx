'use client';

import Link from 'next/link';
import { FC, useMemo } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

import Avatar from '@/components/Avatar';
import useOtherUser from '@/hooks/useOtherUser';
import { FullConversationType } from '@/types';

interface HeaderProps {
  conversation: Omit<FullConversationType, 'messages'>;
}

const Header: FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(
    () => conversation.users.length + ' members',
    [conversation.users]
  );

  return (
    <div
      className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        <Link
          href="/conversations"
          className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name ?? otherUser.name}</div>
          <div className="text-sm text-neutral-500">{statusText}</div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  );
};

export default Header;
