import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";

describe("broadcastUpdates handler", () => {
  let handler: (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Function
  ) => void;

  // Helper to invoke the handler using a callback
  const invokeHandler = (
    event: APIGatewayProxyEvent,
    context: Context = {} as Context
  ): Promise<APIGatewayProxyResult> =>
    new Promise((resolve, reject) => {
      handler(event, context, (err: any, result: APIGatewayProxyResult) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

  beforeEach(() => {
    jest.resetModules();
    // Re-import the handler after module reset
    handler = require("../../src/functions/broadcastUpdates").handler;
  });

  it("should return 200 with a connection message", async () => {
    // Simulate a WebSocket $connect event
    const event = {
      requestContext: { routeKey: "$connect" },
    } as unknown as APIGatewayProxyEvent;
    const result = await invokeHandler(event);
    expect(result.statusCode).toBe(200);
    // Adjust the expected message if your implementation differs
    expect(JSON.parse(result.body)).toEqual({ message: "Connected" });
  });
});
