import { Router, Request, Response } from "express";
import { TodoController } from "../controllers/todos.controllers";

export const wrapper =
  (fn: Function) =>
  (...args: any) =>
    fn(...args).catch(args[2]);

// New Router instance
const router = Router();

// Home routes

router.get("/", wrapper(TodoController.index));
router.get("/:id", wrapper(TodoController.todoById));
router.patch("/:id", wrapper(TodoController.updateTodoById));
router.delete("/", wrapper(TodoController.destroy));

export default router;
