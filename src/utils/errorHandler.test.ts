import { ValidationError } from "joi";
import errorHandler from "../../src/utils/errorHandler";

describe("errorHandler middleware", () => {
  it("should return 400 for ValidationError", () => {
    const handler = {
      error: new ValidationError("Validation failed", [], {}),
    } as any;

    errorHandler().onError(handler, jest.fn());
    expect(handler.response.statusCode).toBe(400);
  });

  it("should return 500 for other errors", () => {
    const handler = {
      error: new Error("Unknown error"),
    } as any;

    errorHandler().onError(handler, jest.fn());
    expect(handler.response.statusCode).toBe(500);
  });
});
