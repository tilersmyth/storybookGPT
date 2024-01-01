#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import 'source-map-support/register';

import { CognitoUserPoolStack } from '../lib/cognito-stack';
import { fetchStageName } from '../utils';

dotenv.config({ path: `${__dirname}/../.env` });

const app = new cdk.App();

const stageName = fetchStageName(app);

const cdkStageContext = app.node.tryGetContext(stageName) as cdk.Environment;

if (stageName === 'development') {
  const props: cdk.StackProps = {
    description: `(${stageName}) Cognito User Pool Stack`,
    env: cdkStageContext,
  };

  new CognitoUserPoolStack(app, `${stageName}-CognitoUserPool`, props);
} else {
  console.log('BUILD ALL STACKS!');
}
