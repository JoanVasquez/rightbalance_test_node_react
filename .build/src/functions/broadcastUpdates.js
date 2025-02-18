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
exports.handler = void 0;
const middy_1 = __importDefault(require("middy"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.handler = (0, middy_1.default)((event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const routeKey = event.requestContext.routeKey;
    if (routeKey === "$connect") {
        // Handle new connection
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Connected" }),
        };
    }
    else if (routeKey === "$disconnect") {
        // Handle disconnect
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Disconnected" }),
        };
    }
    else if (routeKey === "broadcast") {
        // In a real implementation, you might parse the body and send the message to connected clients.
        // Here, we simply return a success message.
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Broadcast successful" }),
        };
    }
    else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid route" }),
        };
    }
})).use((0, errorHandler_1.default)());
