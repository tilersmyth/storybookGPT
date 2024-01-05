import * as React from 'react';

import { NonAuthHeader } from '@/app/(non-auth)/components/header';
import { SignInForm } from '@/app/(non-auth)/sign-in/components/sign-in-form';

export default function SignInPage() {
  return (
    <>
      <NonAuthHeader title='Sign in to your account!' />
      <SignInForm />
    </>
  );
}
