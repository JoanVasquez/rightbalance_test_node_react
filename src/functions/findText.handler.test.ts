import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import TextService from "../../src/services/text.service";

// Mock tsyringe to return a mocked TextService
jest.mock("tsyringe", () => {
  const actual = jest.requireActual("tsyringe");
  return {
    ...actual,
    container: {
      resolve: jest.fn(),
    },
  };
});

describe("findText handler", () => {
  let mockService: jest.Mocked<TextService>;
  let handler: (
    event: APIGatewayProxyEvent,
    context: Context
  ) => Promise<APIGatewayProxyResult>;

  beforeEach(() => {
    jest.resetModules();
    mockService = {
      findAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      setCollabState: jest.fn(),
    } as any;

    const tsyringe = require("tsyringe");
    tsyringe.container.resolve.mockReturnValue(mockService);

    // Re-import the handler after setting up the mock
    handler = require("../../src/functions/findText").handler;
  });

  it("should return 200 with all texts", async () => {
    (mockService.findAll as jest.Mock).mockResolvedValue([
      { id: "1", title: "Text1", content: "Content1" },
      { id: "2", title: "Text2", content: "Content2" },
    ]);
    const event = {} as APIGatewayProxyEvent;
    const result = await handler(event, {} as Context);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual([
      { id: "1", title: "Text1", content: "Content1" },
      { id: "2", title: "Text2", content: "Content2" },
    ]);
  });
});
