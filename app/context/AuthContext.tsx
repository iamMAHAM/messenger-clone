'use client';

import { FC, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

interface AuthContextProps extends PropsWithChildren {}

const AuthContext: FC<AuthContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
