import { Metadata } from 'next';
import './globals.css';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Messenger clone',
  description: 'Messenger clone - realtime messaging',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
