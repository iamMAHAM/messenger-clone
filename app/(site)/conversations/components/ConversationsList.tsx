import { Conversation } from '@prisma/client';
import { FC } from 'react';

interface ConversationsListProps {
  initialConversations: Conversation[];
}

const ConversationsList: FC<ConversationsListProps> = () => {
  return <div>ConversationsList</div>;
};

export default ConversationsList;
