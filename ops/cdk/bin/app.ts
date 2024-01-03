#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import 'source-map-support/register';

import { StageNameEnum } from '../enums/stage-name';
import { CognitoUserPoolStack } from '../lib/cognito-stack';
import { getStageName } from '../utils/stage-name';

dotenv.config({ path: `${__dirname}/../.env` });

const app = new cdk.App();

const stageName = getStageName(app);

const cdkStageContext = app.node.tryGetContext(stageName) as cdk.Environment;

const props: cdk.StackProps = {
  description: `(${stageName}) Cognito User Pool Stack`,
  env: cdkStageContext,
};

new CognitoUserPoolStack(app, `${stageName}-CognitoUserPool`, props);

// Dev environment only needs Cognito
if (stageName !== StageNameEnum.DEVELOPMENT) {
  console.log('to do');
}
