import SideBar from '@/components/sidebar/Sidebar';
import { FC, PropsWithChildren } from 'react';

interface UsersLayoutProps extends PropsWithChildren {}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
};

export default UsersLayout;
