import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

import { fetchStageName } from '../utils';

export class CognitoUserPoolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
      throw new Error('Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');

    const stageName = fetchStageName(scope);

    const userPool = new cognito.UserPool(this, 'CognitoPool', {
      userPoolName: `${stageName}-CognitoPool`,
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: 'You need to verify your email',
        emailBody: 'Thanks for signing up Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        givenName: {
          mutable: true,
          required: true,
        },
        familyName: {
          mutable: true,
          required: true,
        },
      },
      customAttributes: {
        createdAt: new cognito.DateTimeAttribute(),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const appClient = userPool.addClient('UserPoolClient', {
      userPoolClientName: `${stageName}-UserPoolClient`,
      authFlows: {
        userPassword: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
      ],
      oAuth: {
        callbackUrls: [
          stageName === 'development'
            ? 'http://localhost:3000/provider-redirect'
            : 'TO DO',
        ],
        logoutUrls: [
          stageName === 'development'
            ? 'http://localhost:3000/provider-redirect'
            : 'TO DO',
        ],
      },
    });

    const provider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      `${stageName}-GoogleUserPool`,
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        userPool,
        scopes: ['profile', 'email', 'openid'],
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
          givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
          familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
        },
      }
    );

    appClient.node.addDependency(provider);

    userPool.addDomain(`${stageName}-AuthDomain`, {
      cognitoDomain: {
        domainPrefix: `${stageName}-demo-auth-domain`,
      },
    });
  }
}
