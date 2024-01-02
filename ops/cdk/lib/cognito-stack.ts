import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { StageNameEnum } from '../enums/stage-name';
import { getStageName } from '../utils/stage-name';

const getEnvCredentials = (env: StageNameEnum) => {
  switch (env) {
    case StageNameEnum.DEVELOPMENT:
      return {
        googleClientId: process.env.DEV_GOOGLE_CLIENT_ID || '',
        googleClientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET || '',
      };

    case StageNameEnum.PRODUCTION:
      return {
        googleClientId: process.env.GOOGLE_CLIENT_ID || '',
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      };

    default:
      throw Error(`Invalid environment: ${env}`);
  }
};

export class CognitoUserPoolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const stageName = getStageName(scope);

    const envVars = getEnvCredentials(stageName);

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
        minLength: StageNameEnum.DEVELOPMENT ? 6 : 8,
        requireLowercase: stageName != StageNameEnum.DEVELOPMENT,
        requireUppercase: stageName != StageNameEnum.DEVELOPMENT,
        requireDigits: stageName != StageNameEnum.DEVELOPMENT,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const appClient = userPool.addClient('UserPoolClient', {
      userPoolClientName: `${stageName}-UserPoolClient`,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.GOOGLE,
      ],
      oAuth: {
        callbackUrls: [
          stageName === StageNameEnum.DEVELOPMENT
            ? 'http://localhost:3000/provider-redirect'
            : 'TO DO',
        ],
        logoutUrls: [
          stageName === StageNameEnum.DEVELOPMENT
            ? 'http://localhost:3000/provider-redirect'
            : 'TO DO',
        ],
      },
    });

    const provider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      `${stageName}-GoogleUserPool`,
      {
        clientId: envVars.googleClientId,
        clientSecret: envVars.googleClientSecret,
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

    const identityPool = new cognito.CfnIdentityPool(
      this,
      `${stageName}-IdentityPool`,
      {
        identityPoolName: `${stageName}-IdentityPool`,
        allowUnauthenticatedIdentities: false,
        cognitoIdentityProviders: [
          {
            clientId: appClient.userPoolClientId,
            providerName: userPool.userPoolProviderName,
          },
        ],
      }
    );

    const identityPoolRole = new iam.Role(
      this,
      `${stageName}-IdentityPoolAuthenticatedRole`,
      {
        assumedBy: new iam.FederatedPrincipal(
          'cognito-identity.amazonaws.com',
          {
            StringEquals: {
              'cognito-identity.amazonaws.com:aud': identityPool.ref,
            },
            'ForAnyValue:StringLike': {
              'cognito-identity.amazonaws.com:amr': 'authenticated',
            },
          },
          'sts:AssumeRoleWithWebIdentity'
        ),
      }
    );

    identityPoolRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'mobileanalytics:PutEvents',
          'cognito-sync:*',
          'cognito-identity:*',
        ],
        resources: ['*'],
      })
    );

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      'IdentityPoolRoleAttachment',
      {
        identityPoolId: identityPool.ref,
        roles: { authenticated: identityPoolRole.roleArn },
      }
    );
  }
}
