import * as React from 'react';

import { ForgotPasswordForm } from '@/app/(non-auth)/forgot-password/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
