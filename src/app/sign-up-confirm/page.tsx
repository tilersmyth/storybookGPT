import * as React from 'react';

import { SignUpConfirmForm } from '@/app/sign-up-confirm/_components/sign-up-form';

export default function SignUpConfirmPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <SignUpConfirmForm />
      </section>
    </main>
  );
}
