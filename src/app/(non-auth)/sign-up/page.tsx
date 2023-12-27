import * as React from 'react';

import { SignUpForm } from '@/app/(non-auth)/sign-up/components/sign-up-form';

export default function SignUpPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <SignUpForm />
      </section>
    </main>
  );
}
