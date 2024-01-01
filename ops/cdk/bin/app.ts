#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { getStageName } from 'ops/cdk/utils/stage-name';
import 'source-map-support/register';

import { CognitoUserPoolStack } from '../lib/cognito-stack';

dotenv.config({ path: `${__dirname}/../.env` });

const app = new cdk.App();

const stageName = getStageName(app);

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
