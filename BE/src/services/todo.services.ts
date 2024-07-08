// todo.service.ts
import { Todo } from "@prisma/client";
import { ObjectId } from "mongodb";
import { prisma } from "../clients/prisma.client";

// types.d.ts

type TodoInputType = Omit<Todo, "id" | "createdAt" | "updatedAt">;

export interface TodoServiceResponse {
  success: boolean;
  data: {
    message: string;
    result?: Todo | Todo[];
  };
}

export class TodoService {
  public async getTodosByUserId(userId: string): Promise<TodoServiceResponse> {
    try {
      if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid ID");
      }
      const todos: Todo[] = await prisma.todo.findMany({
        where: { userId },
      });
      return {
        success: true,
        data: {
          message: "Todos retrieved successfully",
          result: todos,
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        data: { message: error.message },
      };
    }
  }
  public async getTodosById(id: string): Promise<TodoServiceResponse> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }
      const todo = await prisma.todo.findUnique({
        where: { id },
      });
      if (!todo) {
        throw new Error("Todo not found");
      }
      return {
        success: true,
        data: {
          message: "Todos retrieved successfully",
          result: todo,
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        data: { message: error.message },
      };
    }
  }

  public async createTodo(
    userId: string,
    payload: TodoInputType
  ): Promise<TodoServiceResponse> {
    try {
      const todo: Todo = await prisma.todo.create({
        data: {
          title: payload.title,
          description: payload.description,
          status: payload.status,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return {
        success: true,
        data: {
          message: "Todo created successfully",
          result: todo,
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        data: { message: error.message },
      };
    }
  }

  public async updateTodoById(
    id: string,
    payload: Partial<TodoInputType>
  ): Promise<TodoServiceResponse> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }
      const existingTodo = await prisma.todo.findUnique({
        where: { id },
      });
      if (!existingTodo) {
        throw new Error("Todo not found");
      }
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: payload,
      });
      return {
        success: true,
        data: {
          message: "Todo updated successfully",
          result: updatedTodo,
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        data: { message: error.message },
      };
    }
  }

  public async deleteTodoById(id: string): Promise<TodoServiceResponse> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
      }
      const existingTodo = await prisma.todo.findUnique({
        where: { id },
      });
      if (!existingTodo) {
        throw new Error("Todo not found");
      }
      await prisma.todo.delete({
        where: { id },
      });
      return {
        success: true,
        data: {
          message: "Todo deleted successfully",
        },
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        data: { message: error.message },
      };
    }
  }
}
