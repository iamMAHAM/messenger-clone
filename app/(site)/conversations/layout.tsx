import SideBar from '@/components/sidebar/Sidebar';
import { FC, PropsWithChildren } from 'react';
import ConversationsList from './components/ConversationsList';

interface ConversionsLayoutProps extends PropsWithChildren {}

const ConversionsLayout: FC<ConversionsLayoutProps> = ({ children }) => {
  return (
    <SideBar>
      <div className="h-full">
        <ConversationsList initialConversations={[]} />
        {children}
      </div>
    </SideBar>
  );
};

export default ConversionsLayout;
