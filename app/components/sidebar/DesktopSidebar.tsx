'use client';

import { User } from '@prisma/client';
import { FC, useState } from 'react';

import useRoutes from '@/hooks/useRoutes';

import DesktopItem from './DesktopItem';
import SettingsModal from './SettingsModal';
import Avatar from '../Avatar';

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="
      hidden 
      lg:fixed 
      lg:inset-y-0 
      lg:left-0 
      lg:z-40 
      lg:w-20 
      xl:px-6
      lg:overflow-y-auto 
      lg:bg-white 
      lg:border-r-[1px]
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
    "
      >
        <nav className="mt-4 flex flex-col justify-between">
          <ul
            role="list"
            className="flex flex-col items-center space-y-1"
          >
            {routes.map((route) => (
              <DesktopItem
                {...route}
                key={route.label}
              />
            ))}
          </ul>
        </nav>
        <nav
          className="
          flex
          flex-col
          items-center
          mt-4
          justify-beetween
        "
        >
          <div
            onClick={() => setIsOpen(true)}
            className="
            cursor-pointer
            hover:opacity-75
            transition
          "
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
