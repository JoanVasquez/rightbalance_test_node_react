import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import middy from "middy";
import errorHandler from "../utils/errorHandler";
import TextService from "../services/text.service";

const textService = container.resolve(TextService);

export const handler = middy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    const id = event.pathParameters!.id as string;
    // Expecting body like: { "isLocked": true/false }
    const { isLocked } = JSON.parse(event.body!);

    const result = await textService.setCollabState(id, isLocked);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
).use(errorHandler());
