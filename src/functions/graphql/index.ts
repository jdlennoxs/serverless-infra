import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        path: "graphql",
        method: "post",
        cors: true,
        authorizer: "aws_iam",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
    {
      http: {
        path: "graphql",
        method: "get",
        cors: true,
        authorizer: "aws_iam",
      },
    },
  ],
};
