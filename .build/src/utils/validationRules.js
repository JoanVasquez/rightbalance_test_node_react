"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.textSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "any.required": "Title is required",
    }),
    content: joi_1.default.string().required().messages({
        "any.required": "Content is required",
    }),
    isLocked: joi_1.default.boolean().optional(),
});
