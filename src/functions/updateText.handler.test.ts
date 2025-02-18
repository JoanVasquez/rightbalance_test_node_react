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

describe("updateText handler", () => {
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
      update: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      setCollabState: jest.fn(),
    } as any;
    const tsyringe = require("tsyringe");
    tsyringe.container.resolve.mockReturnValue(mockService);
    handler = require("../../src/functions/updateText").handler;
  });

  it("should return 201 with the updated item", async () => {
    (mockService.update as jest.Mock).mockResolvedValue({
      id: "123",
      title: "Updated",
      content: "Updated content",
    });
    const event = {
      pathParameters: { id: "123" },
      body: JSON.stringify({ title: "Updated", content: "Updated content" }),
    } as unknown as APIGatewayProxyEvent;
    const result = await invokeHandler(event);
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      id: "123",
      title: "Updated",
      content: "Updated content",
    });
  });
});
