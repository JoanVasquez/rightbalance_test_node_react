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
require("reflect-metadata");
const text_service_1 = __importDefault(require("../../src/services/text.service"));
describe("TextService", () => {
    let mockRepo;
    let textService;
    beforeEach(() => {
        mockRepo = {
            createEntity: jest.fn(),
            updateEntity: jest.fn(),
            deleteEntity: jest.fn(),
            findEntityById: jest.fn(),
            findAllEntity: jest.fn(),
            setCollabState: jest.fn(),
        };
        textService = new text_service_1.default(mockRepo);
    });
    it("setCollabState calls textRepository.setCollabState", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.setCollabState.mockResolvedValue("some success msg");
        const result = yield textService.setCollabState("id123", true);
        expect(result).toBe("some success msg");
        expect(mockRepo.setCollabState).toHaveBeenCalledWith("id123", true);
    }));
    it("save calls repository.createEntity", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRepo.createEntity.mockResolvedValue({ id: "xyz", title: "Hello" });
        const newText = yield textService.save({ title: "Hello" });
        expect(newText.id).toBe("xyz");
    }));
});
