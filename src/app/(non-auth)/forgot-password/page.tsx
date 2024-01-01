import * as React from 'react';

import { NonAuthHeader } from '@/app/(non-auth)/components/header';
import { ForgotPasswordForm } from '@/app/(non-auth)/forgot-password/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <>
      <NonAuthHeader title='Forgot your password?' />
      <ForgotPasswordForm />
    </>
  );
}
