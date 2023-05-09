import { Metadata } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';
import ToastContext from './context/ToastContext';
import AuthContext from './context/AuthContext';

export const metadata: Metadata = {
  title: 'Messenger clone',
  description: 'Messenger clone - realtime messaging',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="fr">
      <body>
        <AuthContext>
          <ToastContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;
