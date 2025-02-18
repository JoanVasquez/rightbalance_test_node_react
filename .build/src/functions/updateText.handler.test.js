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
describe("updateText handler", () => {
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
            update: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            setCollabState: jest.fn(),
        };
        const tsyringe = require("tsyringe");
        tsyringe.container.resolve.mockReturnValue(mockService);
        handler = require("../../src/functions/updateText").handler;
    });
    it("should return 201 with the updated item", () => __awaiter(void 0, void 0, void 0, function* () {
        mockService.update.mockResolvedValue({
            id: "123",
            title: "Updated",
            content: "Updated content",
        });
        const event = {
            pathParameters: { id: "123" },
            body: JSON.stringify({ title: "Updated", content: "Updated content" }),
        };
        const result = yield invokeHandler(event);
        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body)).toEqual({
            id: "123",
            title: "Updated",
            content: "Updated content",
        });
    }));
});
