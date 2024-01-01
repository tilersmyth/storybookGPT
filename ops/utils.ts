import { Construct } from 'constructs';

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const fetchStageName = (app: Construct) => {
  let stageName = app.node.tryGetContext('stage');

  if (stageName === undefined) {
    throw new Error(
      'Deployment stage cannot be empty! Specify the stage with --context stage=<name>'
    );
  }

  stageName = String(stageName);

  const allowedStages = ['development', 'staging', 'production'];
  if (!allowedStages.includes(stageName)) {
    throw new Error(`Deployment stage must be ${allowedStages.join(' or ')}`);
  }

  return stageName;
};
