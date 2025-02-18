import validator from "../../src/utils/validator";
import Joi from "joi";

describe("validator middleware", () => {
  const mockSchema = Joi.object({
    name: Joi.string().required(),
  });

  const handler = {
    event: { body: JSON.stringify({ name: "John" }) },
  } as any;

  it("should pass if body is valid", async () => {
    const beforeMiddleware = validator(mockSchema).before;
    expect(() => beforeMiddleware(handler, jest.fn())).not.toThrow();
  });

  it("should throw error if body is invalid", () => {
    const invalidHandler = {
      event: { body: JSON.stringify({}) },
    } as any;
    const beforeMiddleware = validator(mockSchema).before;
    expect(() => beforeMiddleware(invalidHandler, jest.fn())).toThrow();
  });
});
