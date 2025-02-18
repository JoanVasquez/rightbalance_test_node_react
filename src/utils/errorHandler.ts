// src/utils/errorHandler.ts
import { ValidationError } from "joi";
import { HandlerLambda, NextFunction } from "middy";

export default () => ({
  onError: (handler: HandlerLambda, next: NextFunction) => {
    if (handler.error instanceof ValidationError) {
      handler.response = {
        statusCode: 400,
        body: JSON.stringify({ error: handler.error.details }),
      };
    } else {
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
    next();
  },
});
