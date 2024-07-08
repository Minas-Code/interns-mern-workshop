import { Router } from "express";
import { TodoController } from "../controllers/todos.controllers";
import { wrapper } from "../helpers/exception_wrapper";
import Schema from "../middleware/validator";
import todosValidator from "../validations/todos.validator";
import isAuthorized from "../middleware/isAuthorized";

// New Router instance
const router = Router();

// Todos routes

router.get("/", isAuthorized, wrapper(TodoController.index));
router.get("/:id", isAuthorized, wrapper(TodoController.todoById));
router.post(
  "/",
  isAuthorized,
  (req, res, next) => {
    Schema.handle(req, res, next, todosValidator.createSchema());
  },
  wrapper(TodoController.create)
);
router.patch(
  "/:id",
  isAuthorized,
  (req, res, next) => {
    Schema.handle(req, res, next, todosValidator.updateSchema());
  },
  wrapper(TodoController.updateTodoById)
);
router.delete("/:id", wrapper(TodoController.destroy));

export default router;
