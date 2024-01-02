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
            domain: process.env.AWS_OAUTH_DOMAIN || '',
            scopes: [
              'phone',
              'email',
              'openid',
              'profile',
              'aws.cognito.signin.user.admin',
            ],
            redirectSignIn: [process.env.AWS_OAUTH_REDIRECT_SIGNIN || ''],
            redirectSignOut: [process.env.AWS_OAUTH_REDIRECT_SIGNOUT || ''],
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

interface Props {
  children: React.ReactNode;
}

export const AmplifyLayout: React.FC<Props> = ({ children }) => <>{children}</>;
