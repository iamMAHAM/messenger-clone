import { FC } from 'react';
import { IconType } from 'react-icons';

interface MobileItemProps {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: FC<MobileItemProps> = () => {
  return <div>MobileItem</div>;
};

export default MobileItem;
