import Link from 'next/link';
import React from 'react';

export const SignUpConfirmSuccess: React.FC = () => {
  return (
    <h3 className='text-center text-xl font-medium leading-9 tracking-tight text-gray-900'>
      Success! Thanks for verifying your e-mail. <br />
      <br />
      You can now{' '}
      <Link
        href='/sign-in'
        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
      >
        sign in
      </Link>
      !
    </h3>
  );
};
