import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import TextService from "../../src/services/text.service";

jest.mock("tsyringe", () => {
  const actual = jest.requireActual("tsyringe");
  return {
    ...actual,
    container: {
      resolve: jest.fn(),
    },
  };
});

describe("setCollabState handler", () => {
  let mockService: jest.Mocked<TextService>;
  let handler: (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Function
  ) => void;

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
    mockService = {
      setCollabState: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as any;
    const tsyringe = require("tsyringe");
    tsyringe.container.resolve.mockReturnValue(mockService);
    handler = require("../../src/functions/setCollabState").handler;
  });

  it("should return 200 with a success message", async () => {
    (mockService.setCollabState as jest.Mock).mockResolvedValue(
      "State updated"
    );
    const event = {
      pathParameters: { id: "123" },
      body: JSON.stringify({ isLocked: true }),
    } as unknown as APIGatewayProxyEvent;
    const result = await invokeHandler(event);
    expect(result.statusCode).toBe(200);
    expect(result.body).toContain("State updated");
  });
});
