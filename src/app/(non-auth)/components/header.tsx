import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
}

export const NonAuthHeader: React.FC<Props> = ({ title }) => (
  <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
    <Image
      className='mx-auto h-10 w-auto'
      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
      alt='Your Company'
    />
    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
      {title}
    </h2>
  </div>
);
