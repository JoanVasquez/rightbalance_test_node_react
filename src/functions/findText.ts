import "reflect-metadata";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { container } from "tsyringe";
import TextService from "../services/text.service";

const textService = container.resolve(TextService);

console.log(textService);

export const handler = async (
  _event: APIGatewayProxyEvent,
  _context: Context
) => {
  const allTexts = await textService.findAll!();
  console.log(allTexts);
  return {
    statusCode: 200,
    body: JSON.stringify(allTexts),
  };
};
