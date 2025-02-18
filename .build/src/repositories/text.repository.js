"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const tsyringe_1 = require("tsyringe");
const base_repository_1 = __importDefault(require("./base.repository"));
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const dbClient = new client_dynamodb_1.DynamoDBClient({});
let TextRepository = class TextRepository extends base_repository_1.default {
    constructor() {
        super(...arguments);
        // Example method for "collab" or "lock" state
        this.setCollabState = (id, isLocked) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Key: (0, util_dynamodb_1.marshall)({ id }),
                UpdateExpression: "SET #isLocked = :isLocked, #updatedAt = :updatedAt",
                ExpressionAttributeNames: {
                    "#isLocked": "isLocked",
                    "#updatedAt": "updatedAt",
                },
                ExpressionAttributeValues: {
                    ":isLocked": { BOOL: isLocked },
                    ":updatedAt": { S: new Date().toISOString() },
                },
            };
            yield dbClient.send(new client_dynamodb_1.UpdateItemCommand(params));
            return `Text with ID ${id} lock-state updated to ${isLocked}`;
        });
    }
};
TextRepository = __decorate([
    (0, tsyringe_1.injectable)()
], TextRepository);
exports.default = TextRepository;
