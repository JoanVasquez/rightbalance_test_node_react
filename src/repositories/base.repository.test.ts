import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import BaseRepository from "../../src/repositories/base.repository";

describe("BaseRepository", () => {
  const ddbMock = mockClient(DynamoDBClient);
  let baseRepo: BaseRepository;

  beforeAll(() => {
    baseRepo = new (class extends BaseRepository {})();
    // extends an abstract class to instantiate
  });

  beforeEach(() => {
    ddbMock.reset(); // Reset mocks before each test
  });

  it("createEntity should call PutItemCommand with correct params", async () => {
    // Arrange
    ddbMock.on(PutItemCommand).resolves({}); // Mock success response
    const sampleData = { title: "Test", description: "Desc" };

    // Act
    const result = await baseRepo.createEntity(sampleData);

    // Assert
    expect(result.id).toBeDefined(); // Should have generated an ID
    expect(ddbMock).toHaveReceivedCommandTimes(PutItemCommand, 1);
  });

  it("findEntityById should throw if item not found", async () => {
    ddbMock.on(GetItemCommand).resolves({ Item: undefined });
    await expect(baseRepo.findEntityById("123")).rejects.toThrow("not found");
  });

  it("deleteEntity should throw if item not found", async () => {
    ddbMock.on(GetItemCommand).resolves({ Item: undefined });
    await expect(baseRepo.deleteEntity("999")).rejects.toThrow("not found");
  });

  it("findAllEntity should scan the table", async () => {
    ddbMock.on(ScanCommand).resolves({
      Items: [
        { id: { S: "1" }, title: { S: "Title1" } },
        { id: { S: "2" }, title: { S: "Title2" } },
      ],
    });
    const items = await baseRepo.findAllEntity();
    expect(items.length).toBe(2);
    expect(items[0].id).toBe("1");
    expect(items[1].id).toBe("2");
  });
});
