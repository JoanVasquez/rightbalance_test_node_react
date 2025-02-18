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
// Mock tsyringe
jest.mock("tsyringe", () => {
    const actual = jest.requireActual("tsyringe");
    return Object.assign(Object.assign({}, actual), { container: {
            resolve: jest.fn(),
        } });
});
describe("createText handler", () => {
    let mockService;
    let handler;
    // Helper to invoke the middy-wrapped handler (which expects a callback)
    const invokeHandler = (event, context = {}) => new Promise((resolve, reject) => {
        handler(event, context, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
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
        };
        // Set up the container.resolve mock to return our mockService
        const tsyringe = require("tsyringe");
        tsyringe.container.resolve.mockReturnValue(mockService);
        // Re-import the handler after setting up the mock
        handler = require("../../src/functions/createText").handler;
    });
    it("should return 201 with the created item", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange: Ensure the save method resolves with the correct object
        mockService.save.mockResolvedValue({
            id: "123",
            title: "Test",
            content: "Test content",
        });
        const event = {
            body: JSON.stringify({ title: "Test", content: "Test content" }),
        };
        // Act: Invoke the handler using our helper
        const result = yield invokeHandler(event);
        // Assert: Check for a 201 response and correct body
        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body)).toEqual({
            id: "123",
            title: "Test",
            content: "Test content",
        });
    }));
    it("should return 500 if service throws", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange: Ensure the save method rejects with an error
        mockService.save.mockRejectedValue(new Error("Some error"));
        const event = {
            body: JSON.stringify({ title: "Test", content: "Test content" }),
        };
        // Act: Invoke the handler using our helper
        const result = yield invokeHandler(event);
        // Assert: The error middleware returns 500 with a generic error message
        expect(result.statusCode).toBe(500);
        expect(result.body).toContain("Internal server error");
    }));
});
