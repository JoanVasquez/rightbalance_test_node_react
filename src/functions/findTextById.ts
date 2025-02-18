import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import middy from "middy";
import errorHandler from "../utils/errorHandler";
import TextService from "../services/text.service";

const textService = container.resolve(TextService);

export const handler = middy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      const id: string = event.pathParameters!.id as string;
      const result = await textService.findById!(id);

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (err: any) {
      // If you threw a JSON error from repository:
      const error = JSON.parse(err.message);
      return {
        statusCode: error.error.statusCode,
        body: JSON.stringify({
          error: error.error.message,
        }),
      };
    }
  }
).use(errorHandler());
