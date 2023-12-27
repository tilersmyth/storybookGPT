'use client';

import { signInWithRedirect } from 'aws-amplify/auth';
import React from 'react';

export const GoogleSignIn: React.FC = () => {
  return (
    <button
      onClick={async () => await signInWithRedirect({ provider: 'Google' })}
    >
      Login with Google
    </button>
  );
};
