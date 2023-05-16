import { FC, PropsWithChildren, use } from 'react';

import getConversations from '@/actions/getConversations';
import SideBar from '@/components/sidebar/Sidebar';

import ConversationsList from './components/ConversationsList';

interface ConversionsLayoutProps extends PropsWithChildren {}

const ConversionsLayout: FC<ConversionsLayoutProps> = ({ children }) => {
  const conversations = use(getConversations());
  return (
    <SideBar>
      <div className="h-full">
        <ConversationsList initialConversations={conversations} />
        {children}
      </div>
    </SideBar>
  );
};

export default ConversionsLayout;
