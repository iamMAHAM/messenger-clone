import EmptyState from '@/components/EmptyState';
import { FC } from 'react';

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Users;
