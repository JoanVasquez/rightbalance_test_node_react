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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
const base_repository_1 = __importDefault(require("../../src/repositories/base.repository"));
describe("BaseRepository", () => {
    const ddbMock = (0, aws_sdk_client_mock_1.mockClient)(client_dynamodb_1.DynamoDBClient);
    let baseRepo;
    beforeAll(() => {
        baseRepo = new (class extends base_repository_1.default {
        })();
        // extends an abstract class to instantiate
    });
    beforeEach(() => {
        ddbMock.reset(); // Reset mocks before each test
    });
    it("createEntity should call PutItemCommand with correct params", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        ddbMock.on(client_dynamodb_1.PutItemCommand).resolves({}); // Mock success response
        const sampleData = { title: "Test", description: "Desc" };
        // Act
        const result = yield baseRepo.createEntity(sampleData);
        // Assert
        expect(result.id).toBeDefined(); // Should have generated an ID
        expect(ddbMock).toHaveReceivedCommandTimes(client_dynamodb_1.PutItemCommand, 1);
    }));
    it("findEntityById should throw if item not found", () => __awaiter(void 0, void 0, void 0, function* () {
        ddbMock.on(client_dynamodb_1.GetItemCommand).resolves({ Item: undefined });
        yield expect(baseRepo.findEntityById("123")).rejects.toThrow("not found");
    }));
    it("deleteEntity should throw if item not found", () => __awaiter(void 0, void 0, void 0, function* () {
        ddbMock.on(client_dynamodb_1.GetItemCommand).resolves({ Item: undefined });
        yield expect(baseRepo.deleteEntity("999")).rejects.toThrow("not found");
    }));
    it("findAllEntity should scan the table", () => __awaiter(void 0, void 0, void 0, function* () {
        ddbMock.on(client_dynamodb_1.ScanCommand).resolves({
            Items: [
                { id: { S: "1" }, title: { S: "Title1" } },
                { id: { S: "2" }, title: { S: "Title2" } },
            ],
        });
        const items = yield baseRepo.findAllEntity();
        expect(items.length).toBe(2);
        expect(items[0].id).toBe("1");
        expect(items[1].id).toBe("2");
    }));
});
