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
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const middy_1 = __importDefault(require("middy"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const text_service_1 = __importDefault(require("../services/text.service"));
const textService = tsyringe_1.container.resolve(text_service_1.default);
exports.handler = (0, middy_1.default)((event, _context) => __awaiter(void 0, void 0, void 0, function* () {
    const id = event.pathParameters.id;
    // Expecting body like: { "isLocked": true/false }
    const { isLocked } = JSON.parse(event.body);
    const result = yield textService.setCollabState(id, isLocked);
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
})).use((0, errorHandler_1.default)());
