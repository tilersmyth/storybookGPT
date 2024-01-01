import * as React from 'react';

import Header from '@/app/(auth)/components/header';

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className='flex grow'>{children}</div>
    </>
  );
}
