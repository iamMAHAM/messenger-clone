'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

interface AuthContextProps extends PropsWithChildren {}

const AuthContext: FC<AuthContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
