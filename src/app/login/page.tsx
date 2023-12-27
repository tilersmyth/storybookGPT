import * as React from 'react';

import { GoogleSignIn } from '@/app/components/google-signin-btn';
import { UserLogin } from '@/app/login/_components/user-login';

export default function LoginPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <div>
          <div>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              Login page!
            </h2>

            <UserLogin />

            <p className='my-3 text-sm'>OR</p>

            <GoogleSignIn />
          </div>
        </div>
      </section>
    </main>
  );
}
