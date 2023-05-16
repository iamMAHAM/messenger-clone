import { Conversation, Message, User } from '@prisma/client';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { FC, useCallback, useMemo } from 'react';

import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  conversation: FullConversationType;
  selected: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({
  conversation,
  selected,
}) => {
  return (
    <div
      className={clsx(
        `
      w-full 
      relative 
      flex 
      items-center 
      space-x-3 
      p-3 
      hover:bg-neutral-100
      rounded-lg
      transition
      cursor-pointer
    `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      ConversationBox
    </div>
  );
};

export default ConversationBox;
