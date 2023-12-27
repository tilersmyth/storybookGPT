import * as React from 'react';

import { SignUpConfirmForm } from '@/app/(non-auth)/sign-up-confirm/components/sign-up-form';

export default function SignUpConfirmPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <SignUpConfirmForm />
      </section>
    </main>
  );
}
