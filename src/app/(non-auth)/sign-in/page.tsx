import * as React from 'react';

import { GoogleSignIn } from '@/app/(non-auth)/sign-in/components/google-signin-btn';
import { SignInForm } from '@/app/(non-auth)/sign-in/components/sign-in-form';

export default function SignInPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <div>
          <div>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              Login page!
            </h2>

            <SignInForm />

            <p className='my-3 text-sm'>OR</p>

            <GoogleSignIn />
          </div>
        </div>
      </section>
    </main>
  );
}
