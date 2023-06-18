'use client';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';

import GroupChatModal from '@/components/modals/GroupChatModal';
import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullConversationType } from '@/types';

import ConversationBox from './ConversationBox';

interface ConversationsListProps {
  initialConversations: FullConversationType[];
  users: User[];
}

const ConversationsList: FC<ConversationsListProps> = ({
  initialConversations,
  users,
}) => {
  const session = useSession();
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  useEffect(() => {
    if (!pusherKey) return;

    const newHandler = (conversation: FullConversationType) => {
      setConversations((conversations) => {
        if (conversations.find((c) => c.id === conversation.id)) {
          return conversations;
        }
        return [...conversations, conversation];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((conversations) =>
        conversations.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const deleteHandler = (conversation: FullConversationType) => {
      setConversations((conversations) =>
        conversations.filter(
          (currentConversation) => currentConversation.id !== conversation.id
        )
      );
      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:delete', deleteHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:delete', deleteHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
              onClick={() => setIsModalOpen(true)}
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
    </>
  );
};

export default ConversationsList;
