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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
jest.mock("tsyringe", () => {
    const actual = jest.requireActual("tsyringe");
    return Object.assign(Object.assign({}, actual), { container: {
            resolve: jest.fn(),
        } });
});
describe("setCollabState handler", () => {
    let mockService;
    let handler;
    const invokeHandler = (event, context = {}) => new Promise((resolve, reject) => {
        handler(event, context, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
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
        };
        const tsyringe = require("tsyringe");
        tsyringe.container.resolve.mockReturnValue(mockService);
        handler = require("../../src/functions/setCollabState").handler;
    });
    it("should return 200 with a success message", () => __awaiter(void 0, void 0, void 0, function* () {
        mockService.setCollabState.mockResolvedValue("State updated");
        const event = {
            pathParameters: { id: "123" },
            body: JSON.stringify({ isLocked: true }),
        };
        const result = yield invokeHandler(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toContain("State updated");
    }));
});
