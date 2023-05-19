'use client';

import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';

import useConversation from '@/hooks/useConversation';
import { FullMessageType } from '@/types';

import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).then((res) => {});
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          message={message}
        />
      ))}
      <div
        ref={bottomRef}
        className="pt-24"
      ></div>
    </div>
  );
};

export default Body;
