import * as React from 'react';

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='flex grow bg-gray-50'>{children}</div>;
}
