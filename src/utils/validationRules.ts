import Joi from "joi";

export const textSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  content: Joi.string().required().messages({
    "any.required": "Content is required",
  }),
  isLocked: Joi.boolean().optional(),
});
