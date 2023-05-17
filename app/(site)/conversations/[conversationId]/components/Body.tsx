import { FC } from 'react';

import { FullMessageType } from '@/types';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = () => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
