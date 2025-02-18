import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import TextService from "../../src/services/text.service";

// Mock tsyringe
jest.mock("tsyringe", () => {
  const actual = jest.requireActual("tsyringe");
  return {
    ...actual,
    container: {
      resolve: jest.fn(),
    },
  };
});

describe("createText handler", () => {
  let mockService: jest.Mocked<TextService>;
  let handler: (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Function
  ) => void;

  // Helper to invoke the middy-wrapped handler (which expects a callback)
  const invokeHandler = (
    event: APIGatewayProxyEvent,
    context: Context = {} as Context
  ): Promise<APIGatewayProxyResult> =>
    new Promise((resolve, reject) => {
      handler(event, context, (err: any, result: APIGatewayProxyResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

  beforeEach(() => {
    // Reset modules to ensure the handler picks up our mock
    jest.resetModules();

    // Create a mock TextService instance
    mockService = {
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      setCollabState: jest.fn(),
    } as any;

    // Set up the container.resolve mock to return our mockService
    const tsyringe = require("tsyringe");
    tsyringe.container.resolve.mockReturnValue(mockService);

    // Re-import the handler after setting up the mock
    handler = require("../../src/functions/createText").handler;
  });

  it("should return 201 with the created item", async () => {
    // Arrange: Ensure the save method resolves with the correct object
    (mockService.save as jest.Mock).mockResolvedValue({
      id: "123",
      title: "Test",
      content: "Test content",
    });
    const event = {
      body: JSON.stringify({ title: "Test", content: "Test content" }),
    } as APIGatewayProxyEvent;

    // Act: Invoke the handler using our helper
    const result = await invokeHandler(event);

    // Assert: Check for a 201 response and correct body
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      id: "123",
      title: "Test",
      content: "Test content",
    });
  });

  it("should return 500 if service throws", async () => {
    // Arrange: Ensure the save method rejects with an error
    (mockService.save as jest.Mock).mockRejectedValue(new Error("Some error"));
    const event = {
      body: JSON.stringify({ title: "Test", content: "Test content" }),
    } as APIGatewayProxyEvent;

    // Act: Invoke the handler using our helper
    const result = await invokeHandler(event);

    // Assert: The error middleware returns 500 with a generic error message
    expect(result.statusCode).toBe(500);
    expect(result.body).toContain("Internal server error");
  });
});
