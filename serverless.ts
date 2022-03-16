import type { AWS } from "@serverless/typescript";

import graphql from "@functions/graphql";

const serverlessConfiguration: AWS = {
  service: "apollo-server-lambda",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dotenv-plugin",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-2",
    timeout: 20,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["${env:LAMBDA_API_KEY}"],
      usagePlan: {
        quota: {
          limit: 5000,
          offset: 2,
          period: "MONTH",
        },
        throttle: {
          burstLimit: 200,
          rateLimit: 100,
        },
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { graphql },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
