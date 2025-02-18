"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const errorHandler_1 = __importDefault(require("../../src/utils/errorHandler"));
describe("errorHandler middleware", () => {
    it("should return 400 for ValidationError", () => {
        const handler = {
            error: new joi_1.ValidationError("Validation failed", [], {}),
        };
        (0, errorHandler_1.default)().onError(handler, jest.fn());
        expect(handler.response.statusCode).toBe(400);
    });
    it("should return 500 for other errors", () => {
        const handler = {
            error: new Error("Unknown error"),
        };
        (0, errorHandler_1.default)().onError(handler, jest.fn());
        expect(handler.response.statusCode).toBe(500);
    });
});
