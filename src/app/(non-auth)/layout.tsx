import * as React from 'react';

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex grow bg-gray-50'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        {children}
      </div>
    </div>
  );
}
