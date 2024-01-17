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
            domain: process.env.AWS_OAUTH_DOMAIN
              ? process.env.AWS_OAUTH_DOMAIN.replace(/^https?:\/\//, '')
              : '',
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
});
