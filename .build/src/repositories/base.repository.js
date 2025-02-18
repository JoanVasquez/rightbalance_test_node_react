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
const uuid_1 = require("uuid");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
// Determine if we're running offline (e.g., with serverless offline)
const isOffline = process.env.IS_OFFLINE === "true";
const region = process.env.AWS_REGION || "us-east-1";
// Create the DynamoDB client
const dbClient = new client_dynamodb_1.DynamoDBClient(Object.assign({ region, credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
    } }, (isOffline && process.env.DYNAMODB_ENDPOINT
    ? { endpoint: process.env.DYNAMODB_ENDPOINT }
    : {})));
class BaseRepository {
    constructor() {
        this.createEntity = (data) => __awaiter(this, void 0, void 0, function* () {
            data.id = (0, uuid_1.v4)();
            data.createdAt = new Date().toISOString();
            data.updatedAt = new Date().toISOString();
            const params = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: (0, util_dynamodb_1.marshall)(data),
            };
            yield dbClient.send(new client_dynamodb_1.PutItemCommand(params));
            return data;
        });
        this.updateEntity = (id, data) => __awaiter(this, void 0, void 0, function* () {
            data.id = id;
            data.updatedAt = new Date().toISOString();
            const params = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: (0, util_dynamodb_1.marshall)(data),
            };
            yield dbClient.send(new client_dynamodb_1.PutItemCommand(params));
            return data;
        });
        this.findAllEntity = () => __awaiter(this, void 0, void 0, function* () {
            const { Items } = yield dbClient.send(new client_dynamodb_1.ScanCommand({
                TableName: process.env.DYNAMODB_TABLE_NAME,
            }));
            return (Items === null || Items === void 0 ? void 0 : Items.map((item) => (0, util_dynamodb_1.unmarshall)(item))) || [];
        });
        this.findEntityById = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("teeeeest" + process.env.DYNAMODB_TABLE_NAME);
            const params = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: (0, util_dynamodb_1.marshall)({ id }),
            };
            const { Item } = yield dbClient.send(new client_dynamodb_1.GetItemCommand(params));
            if (!Item) {
                throw new Error(JSON.stringify({
                    error: { statusCode: 404, message: `Entity with ID ${id} not found` },
                }));
            }
            return (0, util_dynamodb_1.unmarshall)(Item);
        });
        this.deleteEntity = (id) => __awaiter(this, void 0, void 0, function* () {
            // Validate existence
            const { Item } = yield dbClient.send(new client_dynamodb_1.GetItemCommand({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: (0, util_dynamodb_1.marshall)({ id }),
            }));
            if (!Item) {
                throw new Error(JSON.stringify({
                    error: { statusCode: 404, message: `Entity with ID ${id} not found` },
                }));
            }
            // Delete
            yield dbClient.send(new client_dynamodb_1.DeleteItemCommand({
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: (0, util_dynamodb_1.marshall)({ id }),
            }));
            return `Entity with ID ${id} deleted`;
        });
    }
}
exports.default = BaseRepository;
