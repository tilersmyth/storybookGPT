'use client';

import { signInWithRedirect } from 'aws-amplify/auth';
import React from 'react';

export const GoogleSignIn: React.FC = () => {
  return (
    <button
      className='flex w-full justify-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300'
      onClick={async () => await signInWithRedirect({ provider: 'Google' })}
    >
      <img
        className='h-5 w-6'
        src='https://www.svgrepo.com/show/475656/google-color.svg'
        loading='lazy'
        alt='google logo'
      />
      <span>Connect with Google</span>
    </button>
  );
};
