import { FC, PropsWithChildren } from 'react';

interface SideBarProps extends PropsWithChildren {}

const SideBar: FC<SideBarProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SideBar;
