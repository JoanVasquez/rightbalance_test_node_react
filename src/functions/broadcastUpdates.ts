// src/functions/broadcastUpdates.ts
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import middy from "middy";
import errorHandler from "../utils/errorHandler";

export const handler = middy(
  async (
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const routeKey = event.requestContext.routeKey;

    if (routeKey === "$connect") {
      // Handle new connection
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Connected" }),
      };
    } else if (routeKey === "$disconnect") {
      // Handle disconnect
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Disconnected" }),
      };
    } else if (routeKey === "broadcast") {
      // In a real implementation, you might parse the body and send the message to connected clients.
      // Here, we simply return a success message.
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Broadcast successful" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid route" }),
      };
    }
  }
).use(errorHandler());
