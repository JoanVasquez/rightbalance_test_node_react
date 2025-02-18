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
require("reflect-metadata");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
const text_repository_1 = __importDefault(require("../../src/repositories/text.repository"));
describe("TextRepository", () => {
    const ddbMock = (0, aws_sdk_client_mock_1.mockClient)(client_dynamodb_1.DynamoDBClient);
    let textRepo;
    beforeAll(() => {
        textRepo = new text_repository_1.default();
    });
    beforeEach(() => {
        ddbMock.reset();
    });
    it("setCollabState should call UpdateItemCommand with correct params", () => __awaiter(void 0, void 0, void 0, function* () {
        ddbMock.on(client_dynamodb_1.UpdateItemCommand).resolves({});
        const result = yield textRepo.setCollabState("abc123", true);
        expect(result).toContain("abc123");
        expect(ddbMock).toHaveReceivedCommandTimes(client_dynamodb_1.UpdateItemCommand, 1);
        // Optionally check the exact UpdateExpression or ExpressionAttributeValues
    }));
});
