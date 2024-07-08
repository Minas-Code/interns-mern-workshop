import { TodoStatus } from "@prisma/client";
import Joi from "joi";

class TodosValidator {
  public createSchema() {
    return Joi.object({
      title: Joi.string().min(3).max(30).required(),
      description: Joi.string().required(),
      status: Joi.string()
        .valid(...Object.values(TodoStatus))
        .required(),
    });
  }

  public updateSchema() {
    return Joi.object({
      title: Joi.string().min(3).max(30).optional(),
      description: Joi.string().optional(),
      status: Joi.string()
        .valid(...Object.values(TodoStatus))
        .optional(),
    });
  }
}

export default new TodosValidator();
