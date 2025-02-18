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
// Mock tsyringe to return a mocked TextService
jest.mock("tsyringe", () => {
    const actual = jest.requireActual("tsyringe");
    return Object.assign(Object.assign({}, actual), { container: {
            resolve: jest.fn(),
        } });
});
describe("findText handler", () => {
    let mockService;
    let handler;
    beforeEach(() => {
        jest.resetModules();
        mockService = {
            findAll: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
            setCollabState: jest.fn(),
        };
        const tsyringe = require("tsyringe");
        tsyringe.container.resolve.mockReturnValue(mockService);
        // Re-import the handler after setting up the mock
        handler = require("../../src/functions/findText").handler;
    });
    it("should return 200 with all texts", () => __awaiter(void 0, void 0, void 0, function* () {
        mockService.findAll.mockResolvedValue([
            { id: "1", title: "Text1", content: "Content1" },
            { id: "2", title: "Text2", content: "Content2" },
        ]);
        const event = {};
        const result = yield handler(event, {});
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual([
            { id: "1", title: "Text1", content: "Content1" },
            { id: "2", title: "Text2", content: "Content2" },
        ]);
    }));
});
