import { FC, PropsWithChildren, use } from 'react';

import getCurrentUser from '@/actions/getCurrentUser';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

interface SideBarProps extends PropsWithChildren {}

const SideBar: FC<SideBarProps> = ({ children }) => {
  const currentUser = use(getCurrentUser());

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
