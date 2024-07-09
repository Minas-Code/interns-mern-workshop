import { NextFunction, Response ,Request} from "express";
import { ResponseWrapper } from "../helpers/response_wrapper";
import { TodoService } from "../services/todo.services";

export class TodoController {
  public static async index(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const todoService = new TodoService();
    const response = new ResponseWrapper(res);
    return response.ok(await todoService.getTodosByUserId(req.user.id));
  }

  public static async todoById(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const todoService = new TodoService();
    const response = new ResponseWrapper(res);
    return response.ok(await todoService.getTodosById(req.params.id));
  }

  public static async updateTodoById(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const id = parseInt(req.params.id);
    const response = new ResponseWrapper(res);
    const todoService = new TodoService();
    const updated = await todoService.updateTodoById(req.params.id, {
      ...req.body,
      userId: req.user.id,
    });
    return response.ok(updated);
  }

  public static async create(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const response = new ResponseWrapper(res);
    const todoService = new TodoService();
    const updated = await todoService.createTodo(req.user.id, req.body);
    return response.created(updated);
  }

  public static async destroy(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const todoService = new TodoService();
    const response = new ResponseWrapper(res);
    return response.ok(await todoService.deleteTodoById(req.params.id));
  }
}
