import { v4 } from "uuid";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  ScanCommand,
  PutItemInput,
  GetItemInput,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// Determine if we're running offline (e.g., with serverless offline)
const isOffline = process.env.IS_OFFLINE === "true";
const region = process.env.AWS_REGION || "us-east-1";

// Create the DynamoDB client
const dbClient: DynamoDBClient = new DynamoDBClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "dummy",
  },
  // When running offline, use the local endpoint provided in .env
  ...(isOffline && process.env.DYNAMODB_ENDPOINT
    ? { endpoint: process.env.DYNAMODB_ENDPOINT }
    : {}),
});

export default abstract class BaseRepository {
  createEntity = async (data: any): Promise<any> => {
    data.id = v4();
    data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();

    const params: PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(data),
    };
    await dbClient.send(new PutItemCommand(params));
    return data;
  };

  updateEntity = async (id: string, data: any): Promise<any> => {
    data.id = id;
    data.updatedAt = new Date().toISOString();

    const params: PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall(data),
    };
    await dbClient.send(new PutItemCommand(params));
    return data;
  };

  findAllEntity = async (): Promise<any> => {
    const { Items } = await dbClient.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
      } as ScanCommandInput)
    );
    return Items?.map((item) => unmarshall(item)) || [];
  };

  findEntityById = async (id: string): Promise<any> => {
    console.log("teeeeest" + process.env.DYNAMODB_TABLE_NAME);
    const params: GetItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: marshall({ id }),
    };
    const { Item } = await dbClient.send(new GetItemCommand(params));
    if (!Item) {
      throw new Error(
        JSON.stringify({
          error: { statusCode: 404, message: `Entity with ID ${id} not found` },
        })
      );
    }
    return unmarshall(Item);
  };

  deleteEntity = async (id: string): Promise<any> => {
    // Validate existence
    const { Item } = await dbClient.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id }),
      })
    );
    if (!Item) {
      throw new Error(
        JSON.stringify({
          error: { statusCode: 404, message: `Entity with ID ${id} not found` },
        })
      );
    }
    // Delete
    await dbClient.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id }),
      })
    );
    return `Entity with ID ${id} deleted`;
  };
}
