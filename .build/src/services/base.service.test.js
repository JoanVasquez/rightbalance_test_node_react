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
const base_service_1 = __importDefault(require("../../src/services/base.service"));
describe("BaseService", () => {
    let mockRepo;
    let baseService;
    beforeEach(() => {
        // Create a mock of BaseRepository
        mockRepo = {
            createEntity: jest.fn(),
            updateEntity: jest.fn(),
            deleteEntity: jest.fn(),
            findEntityById: jest.fn(),
            findAllEntity: jest.fn(),
        };
        // Create a concrete instance of BaseService
        baseService = new (class extends base_service_1.default {
        })(mockRepo);
    });
    it("save should call repository.createEntity", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.createEntity.mockResolvedValue({ id: "123", title: "Test" });
        const data = { title: "Test" };
        const result = yield baseService.save(data);
        expect(mockRepo.createEntity).toHaveBeenCalledWith(data);
        expect(result.id).toBe("123");
    }));
    it("findById should call repository.findEntityById", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.findEntityById.mockResolvedValue({ id: "abc" });
        const item = yield baseService.findById("abc");
        expect(item.id).toBe("abc");
    }));
    it("delete should call repository.deleteEntity", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.deleteEntity.mockResolvedValue("deleted");
        const resp = yield baseService.delete("xyz");
        expect(resp).toBe("deleted");
    }));
});
