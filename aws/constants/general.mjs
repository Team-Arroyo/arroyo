const CONTENT_TYPE_APPLICATION_ZIP = "application/zip";
const ACL_PRIVATE = "private";
const OPEN = "open";
const ERROR = "error";
const USER_LOGS_S3_BUCKET_NAME='test44441'; // TODO this bucket will be created programmatically
const LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME='lambda-test-deployment-pkg';
const REHYDRATION_LAMBDA_NAME='TestLambda47';
const REHYDRATION_QUEUE_NAME='SQS_OBJECT_KEYS47';
const LAMBDA_ROLE_NAME='lambda-test-role';

export {
  CONTENT_TYPE_APPLICATION_ZIP,
  ACL_PRIVATE,
  OPEN,
  ERROR,
  USER_LOGS_S3_BUCKET_NAME,
  LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
  REHYDRATION_LAMBDA_NAME,
  REHYDRATION_QUEUE_NAME,
  LAMBDA_ROLE_NAME
}