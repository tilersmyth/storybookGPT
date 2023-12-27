import * as React from 'react';

import { ResetPasswordForm } from '@/app/(non-auth)/reset-password/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className='layout relative flex items-center justify-center'>
      <section className='bg-white'>
        <ResetPasswordForm />
      </section>
    </main>
  );
}
