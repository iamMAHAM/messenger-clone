import clsx from 'clsx';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FC, useCallback, useMemo } from 'react';

import Avatar from '@/components/Avatar';
import useOtherUser from '@/hooks/useOtherUser';
import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  conversation: FullConversationType;
  selected: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({
  conversation,
  selected,
}) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages ?? [];

    return messages[messages.length - 1] || {};
  }, [conversation.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    const seensMessages = lastMessage?.seen ?? [];

    return seensMessages.some((seen) => seen.email === userEmail);
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage.image) return 'Image';
    if (lastMessage.body) return lastMessage.body.slice(0, 30);

    return 'Start a conversation';
  }, [lastMessage.body, lastMessage.image]);

  return (
    <div
      onClick={handleClick}
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
      <Avatar user={otherUser} />
      <div className="min-0 flex-1 focus:outline-none">
        <div className="flex justify-between items-center">
          <p className="text-md font-medium capitalize">
            {conversation.name ?? otherUser.name?.toLocaleLowerCase()}
          </p>
          {lastMessage.createdAt && (
            <p
              className={clsx(
                'text-xs',
                'font-light',
                hasSeen ? 'text-neutral-400' : 'text-neutral-500'
              )}
            >
              {format(new Date(lastMessage.createdAt), 'p')}
            </p>
          )}
        </div>
        <p
          className={clsx(
            `
          truncate
          text-sm
          `,
            hasSeen ? 'text-gray-500' : 'font-medium text-black'
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
