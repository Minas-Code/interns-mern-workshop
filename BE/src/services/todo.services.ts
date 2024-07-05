// todo.service.ts
import { PrismaClient } from "@prisma/client";
// import { TodoInput, TodoOutput, TodoResponse } from './types';

// types.d.ts
export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
  userId: string;
}

export interface TodoOutput extends TodoInput {
  id: string;
}

export interface TodoServiceResponse {
  success: boolean;
  data: {
    message: string;
    result?: TodoOutput | TodoOutput[];
  };
}

const prisma = new PrismaClient();

export class TodoService {
  public async getTodosByUserId(userId: string): Promise<TodoServiceResponse> {
    try {
      const todos: TodoOutput[] = await prisma.todo.findMany({
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

  public async createTodo(
    userId: string,
    payload: TodoInput
  ): Promise<TodoServiceResponse> {
    try {
      const todo: TodoOutput = await prisma.todo.create({
        data: payload,
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
    payload: Partial<TodoInput>
  ): Promise<TodoServiceResponse> {
    try {
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
