import "reflect-metadata";
import TextService from "../../src/services/text.service";
import TextRepository from "../../src/repositories/text.repository";

describe("TextService", () => {
  let mockRepo: jest.Mocked<TextRepository>;
  let textService: TextService;

  beforeEach(() => {
    mockRepo = {
      createEntity: jest.fn(),
      updateEntity: jest.fn(),
      deleteEntity: jest.fn(),
      findEntityById: jest.fn(),
      findAllEntity: jest.fn(),
      setCollabState: jest.fn(),
    } as any;

    textService = new TextService(mockRepo);
  });

  it("setCollabState calls textRepository.setCollabState", async () => {
    mockRepo.setCollabState.mockResolvedValue("some success msg");
    const result = await textService.setCollabState("id123", true);
    expect(result).toBe("some success msg");
    expect(mockRepo.setCollabState).toHaveBeenCalledWith("id123", true);
  });

  it("save calls repository.createEntity", async () => {
    mockRepo.createEntity.mockResolvedValue({ id: "xyz", title: "Hello" });
    const newText = await textService.save!({ title: "Hello" } as any);
    expect(newText.id).toBe("xyz");
  });
});
