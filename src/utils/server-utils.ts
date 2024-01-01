import { createServerRunner } from '@aws-amplify/adapter-nextjs';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
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
});
