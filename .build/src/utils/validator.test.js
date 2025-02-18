"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../../src/utils/validator"));
const joi_1 = __importDefault(require("joi"));
describe("validator middleware", () => {
    const mockSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
    });
    const handler = {
        event: { body: JSON.stringify({ name: "John" }) },
    };
    it("should pass if body is valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const beforeMiddleware = (0, validator_1.default)(mockSchema).before;
        expect(() => beforeMiddleware(handler, jest.fn())).not.toThrow();
    }));
    it("should throw error if body is invalid", () => {
        const invalidHandler = {
            event: { body: JSON.stringify({}) },
        };
        const beforeMiddleware = (0, validator_1.default)(mockSchema).before;
        expect(() => beforeMiddleware(invalidHandler, jest.fn())).toThrow();
    });
});
