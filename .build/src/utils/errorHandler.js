"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/errorHandler.ts
const joi_1 = require("joi");
exports.default = () => ({
    onError: (handler, next) => {
        if (handler.error instanceof joi_1.ValidationError) {
            handler.response = {
                statusCode: 400,
                body: JSON.stringify({ error: handler.error.details }),
            };
        }
        else {
            handler.response = {
                statusCode: 500,
                body: JSON.stringify({ error: "Internal server error" }),
            };
        }
        next();
    },
});
