import { FC, PropsWithChildren, use } from 'react';

import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

import getCurrentUser from '@/actions/getCurrentUser';

interface SideBarProps extends PropsWithChildren {}

const SideBar: FC<SideBarProps> = ({ children }) => {
  const currentUser = use(getCurrentUser());

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
