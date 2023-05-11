import { FC, PropsWithChildren } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

interface SideBarProps extends PropsWithChildren {}

// @ts-expect-error Server-only component
const SideBar: FC<SideBarProps> = async ({ children }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
