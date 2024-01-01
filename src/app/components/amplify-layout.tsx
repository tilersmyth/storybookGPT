'use client';

import { Amplify } from 'aws-amplify';

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: process.env.AWS_COGNITO_POOL_ID || '',
        userPoolClientId: process.env.AWS_COGNITO_APP_CLIENT_ID || '',
        identityPoolId: process.env.AWS_COGNITO_IDENTITY_ID || '',
        loginWith: {
          oauth: {
            domain:
              'development-demo-auth-domain.auth.us-east-1.amazoncognito.com',
            scopes: [
              'phone',
              'email',
              'openid',
              'profile',
              'aws.cognito.signin.user.admin',
            ],
            redirectSignIn: ['http://localhost:3000/provider-redirect'],
            redirectSignOut: ['http://localhost:3000/provider-redirect'],
            responseType: 'code',
          },
        },
      },
    },
  },
  {
    ssr: true,
  }
);

export default function AmplifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
