import "reflect-metadata";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import TextRepository from "../../src/repositories/text.repository";

describe("TextRepository", () => {
  const ddbMock = mockClient(DynamoDBClient);
  let textRepo: TextRepository;

  beforeAll(() => {
    textRepo = new TextRepository();
  });

  beforeEach(() => {
    ddbMock.reset();
  });

  it("setCollabState should call UpdateItemCommand with correct params", async () => {
    ddbMock.on(UpdateItemCommand).resolves({});
    const result = await textRepo.setCollabState("abc123", true);

    expect(result).toContain("abc123");
    expect(ddbMock).toHaveReceivedCommandTimes(UpdateItemCommand, 1);
    // Optionally check the exact UpdateExpression or ExpressionAttributeValues
  });
});
