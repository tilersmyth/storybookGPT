import { NonAuthHeader } from '@/app/(non-auth)/components/header';
import { SignUpConfirmForm } from '@/app/(non-auth)/sign-up-confirm/components/sign-up-confirm-form';

export default function SignUpConfirmPage() {
  return (
    <>
      <NonAuthHeader title='Sign up verification' />
      <SignUpConfirmForm />
    </>
  );
}
