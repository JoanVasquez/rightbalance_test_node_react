import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import middy from "middy";
import errorHandler from "../utils/errorHandler";
import validator from "../utils/validator";
import { textSchema } from "../utils/validationRules";
import TextService from "../services/text.service";

const textService = container.resolve(TextService);

export const handler = middy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    const id = event.pathParameters!.id as string;
    const data = JSON.parse(event.body!);

    const updated = await textService.update!(id, data);

    return {
      statusCode: 201,
      body: JSON.stringify(updated),
    };
  }
)
  // Validate request body against Joi schema
  .use(validator(textSchema))
  .use(errorHandler());
