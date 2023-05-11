import getUsers from '@/actions/getUsers';
import UserList from '@/(site)/users/components/UserList';
import SideBar from '@/components/sidebar/Sidebar';
import { FC, PropsWithChildren, use } from 'react';

interface UsersLayoutProps extends PropsWithChildren {}

const UsersLayout: FC<UsersLayoutProps> = ({ children }) => {
  const users = use(getUsers());
  return (
    <SideBar>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
};

export default UsersLayout;
