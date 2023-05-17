'use client';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

import useConversation from '@/hooks/useConversation';
import { FullConversationType } from '@/types';

import ConversationBox from './ConversationBox';

interface ConversationsListProps {
  initialConversations: FullConversationType[];
}

const ConversationsList: FC<ConversationsListProps> = ({
  initialConversations,
}) => {
  const [conversations] = useState(initialConversations);

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
      fixed 
      inset-y-0 
      pb-20
      lg:pb-0
      lg:left-20 
      lg:w-80
      lg:block
      overflow-y-auto 
      border-r 
      border-gray-200 
    `,
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div
            className="
            rounded-full
            cursor-pointer
            hover:opacity-75
          "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        <div>
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
              selected={conversation.id === conversationId}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ConversationsList;
