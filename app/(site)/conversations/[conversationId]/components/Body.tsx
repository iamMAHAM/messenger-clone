'use client';

import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';

import useConversation from '@/hooks/useConversation';
import { pusherClient } from '@/libs/pusher';
import { FullMessageType } from '@/types';

import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).then((res) => {});
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`).then((res) => {});
      setMessages((messages) => {
        if (messages.find((m) => m.id === message.id)) {
          return messages;
        }
        return [...messages, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (message: FullMessageType) => {
      setMessages((messages) =>
        messages.map((currentMessage) => {
          if (currentMessage.id === message.id) {
            return message;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
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
