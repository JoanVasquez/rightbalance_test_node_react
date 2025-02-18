import { injectable } from "tsyringe";
import BaseRepository from "./base.repository";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const dbClient: DynamoDBClient = new DynamoDBClient({});

@injectable()
export default class TextRepository extends BaseRepository {
  // Example method for "collab" or "lock" state
  setCollabState = async (id: string, isLocked: boolean): Promise<string> => {
    const params: UpdateItemCommandInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME!,
      Key: marshall({ id }),
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

    await dbClient.send(new UpdateItemCommand(params));
    return `Text with ID ${id} lock-state updated to ${isLocked}`;
  };
}
