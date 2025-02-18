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
describe("broadcastUpdates handler", () => {
    let handler;
    // Helper to invoke the handler using a callback
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
        // Re-import the handler after module reset
        handler = require("../../src/functions/broadcastUpdates").handler;
    });
    it("should return 200 with a connection message", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate a WebSocket $connect event
        const event = {
            requestContext: { routeKey: "$connect" },
        };
        const result = yield invokeHandler(event);
        expect(result.statusCode).toBe(200);
        // Adjust the expected message if your implementation differs
        expect(JSON.parse(result.body)).toEqual({ message: "Connected" });
    }));
});
