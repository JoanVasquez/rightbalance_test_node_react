import BaseService from "../../src/services/base.service";
import BaseRepository from "../../src/repositories/base.repository";

describe("BaseService", () => {
  let mockRepo: jest.Mocked<BaseRepository>;
  let baseService: BaseService<any>;

  beforeEach(() => {
    // Create a mock of BaseRepository
    mockRepo = {
      createEntity: jest.fn(),
      updateEntity: jest.fn(),
      deleteEntity: jest.fn(),
      findEntityById: jest.fn(),
      findAllEntity: jest.fn(),
    } as any;

    // Create a concrete instance of BaseService
    baseService = new (class extends BaseService<any> {})(mockRepo);
  });

  it("save should call repository.createEntity", async () => {
    mockRepo.createEntity.mockResolvedValue({ id: "123", title: "Test" });
    const data = { title: "Test" };
    const result = await baseService.save!(data);
    expect(mockRepo.createEntity).toHaveBeenCalledWith(data);
    expect(result.id).toBe("123");
  });

  it("findById should call repository.findEntityById", async () => {
    mockRepo.findEntityById.mockResolvedValue({ id: "abc" });
    const item = await baseService.findById!("abc");
    expect(item.id).toBe("abc");
  });

  it("delete should call repository.deleteEntity", async () => {
    mockRepo.deleteEntity.mockResolvedValue("deleted");
    const resp = await baseService.delete!("xyz");
    expect(resp).toBe("deleted");
  });
});
