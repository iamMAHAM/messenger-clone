import { FC, PropsWithChildren, use } from 'react';

import getConversations from '@/actions/getConversations';
import getUsers from '@/actions/getUsers';
import SideBar from '@/components/sidebar/Sidebar';

import ConversationsList from './components/ConversationsList';

interface ConversionsLayoutProps extends PropsWithChildren {}

const ConversionsLayout: FC<ConversionsLayoutProps> = ({ children }) => {
  const conversations = use(getConversations());
  const users = use(getUsers());
  return (
    <SideBar>
      <div className="h-full">
        <ConversationsList
          initialConversations={conversations}
          users={users}
        />
        {children}
      </div>
    </SideBar>
  );
};

export default ConversionsLayout;
