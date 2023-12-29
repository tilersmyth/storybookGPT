import * as React from 'react';

import { NonAuthHeader } from '@/app/(non-auth)/components/header';
import { SignUpForm } from '@/app/(non-auth)/sign-up/components/sign-up-form';

export default function SignUpPage() {
  return (
    <>
      <NonAuthHeader title='Sign up for Storybook!' />
      <SignUpForm />
    </>
  );
}
