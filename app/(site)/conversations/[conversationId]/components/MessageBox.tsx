import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

import Avatar from '@/components/Avatar';
import { FullMessageType } from '@/types';

interface MessageBoxProps {
  isLast: boolean;
  message: FullMessageType;
}

const MessageBox: FC<MessageBoxProps> = ({ isLast, message }) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === message?.sender?.email;
  const seenList = (message.seen || [])
    .filter((s) => s.email !== session.data?.user?.email)
    .map((u) => u.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');

  const avatar = clsx(isOwn && 'order-2');

  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

  const messagecls = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray100',
    message.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.email}</div>
        </div>
        <div className="text-xs text-gray-400">
          {format(new Date(message.createdAt), 'p')}
        </div>
        <div className={messagecls}>
          {message.image ? (
            <Image
              src={message.image}
              alt="cimage"
              height={288}
              width={288}
              className="object-cover cursor-pointer hover:scale-110 transition"
              priority
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs text-gray-400"> Seen by {seenList}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;

// <div
// key={message.id}
// className="
// flex
// flex-col
// items-center
// justify-center
// "
// >

// <p>{message.body}</p>
// </div>
