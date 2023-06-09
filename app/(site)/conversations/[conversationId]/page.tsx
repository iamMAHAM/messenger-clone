import { FC, use } from 'react';

import getConversationById from '@/actions/getConversationById';
import getMessages from '@/actions/getMessages';
import EmptyState from '@/components/EmptyState';

import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header';

interface ConversatonIdProps {
  params: {
    conversationId: string;
  };
}

const ConversatonId: FC<ConversatonIdProps> = ({ params }) => {
  const messages = use(getMessages(params.conversationId));
  const conversation = use(getConversationById(params.conversationId));

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversatonId;
