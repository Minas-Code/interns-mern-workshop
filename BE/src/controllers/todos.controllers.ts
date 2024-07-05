import { NextFunction, Response } from "express";
import { customRequest } from "../types/cutomDefinition";
import { ResponseWrapper } from "../helpers/response_wrapper";
import { TodoService } from "../services/todo.services";

export class TodoController {
  public static async index(
    req: customRequest,
    res: Response,
    next: NextFunction
  ) {
    const todoService = new TodoService();
    const respons = new ResponseWrapper(res);
    return respons.ok(await todoService.getTodosByUserId(req.params.userId));
  }

  public static async todoById(
    req: customRequest,
    res: Response,
    next: NextFunction
  ) {
    const todoService = new TodoService();
    const respons = new ResponseWrapper(res);
    return respons.ok(await todoService.deleteTodoById(req.params.id));
  }

  public static async updateTodoById(
    req: customRequest,
    res: Response,
    next: NextFunction
  ) {
    const id = parseInt(req.params.id);
    const respons = new ResponseWrapper(res);
    const todoService = new TodoService();
    const updated = await todoService.updateTodoById(req.params.id, req.body);
    return respons.ok(updated);
  }

  public static async destroy(
    req: customRequest,
    res: Response,
    // next: NextFunction
  ) {
    const todoService = new TodoService();
    const respons = new ResponseWrapper(res);
    return respons.ok(await todoService.deleteTodoById(req.params.id));
  }
}