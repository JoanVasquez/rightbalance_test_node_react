import { Schema } from "joi";
import { HandlerLambda, NextFunction } from "middy";

export default (schema: Schema) => ({
  before: (handler: HandlerLambda, next: NextFunction) => {
    const { body } = handler.event;
    if (!body) {
      throw new Error("Empty request body!");
    }

    const data = JSON.parse(body);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      throw error;
    }

    return next();
  },
});
