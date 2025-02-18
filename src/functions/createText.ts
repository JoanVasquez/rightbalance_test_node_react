import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import middy from "middy";
import TextService from "../services/text.service";
import errorHandler from "../utils/errorHandler";
import validator from "../utils/validator";
import { textSchema } from "../utils/validationRules";

const textService = container.resolve(TextService);

export const handler = middy(
  async (event: APIGatewayProxyEvent, _: Context) => {
    const data = JSON.parse(event.body!);
    const result = await textService.save!(data);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  }
)
  .use(validator(textSchema))
  .use(errorHandler());
