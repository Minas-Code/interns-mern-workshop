// todo.service.ts
import { PrismaClient, User } from "@prisma/client";
import { compareSync, encryptSync } from "../helpers/encrypt";
import { omit } from "lodash";
import { sign } from "../helpers/jwt";
import { prisma } from "../clients/prisma.client";
import { ObjectId } from "mongodb";

// types.d.ts

type UserInputType = Omit<User, "id" | "createdAt" | "updatedAt">;
type UserLoginType = Pick<User, "email" | "password">;
type UserAuthResponseType = Omit<User, "password"> & { accessToken?: string };

export interface TodoServiceResponse {
  success: boolean;
  data: {
    message: string;
    result?: UserAuthResponseType | UserAuthResponseType[];
  };
}

export class AuthService {
  public async login(payload: UserLoginType): Promise<TodoServiceResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const validPassword = compareSync(payload.password, user.password);
      if (!validPassword) {
        throw new Error("Password is incorrect");
      }
      const userData = omit(user, ["password"]);
      const accessToken = sign({ ...userData });
      return {
        success: true,
        data: {
          message: "User logged in successfully",
          result: { ...userData, accessToken: accessToken },
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
  public async register(payload: UserInputType): Promise<TodoServiceResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (user) {
        throw new Error("User already registered");
      }
      const newUser = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: encryptSync(payload.password),
        },
      });
      const userData = omit(newUser, ["password"]);
      const accessToken = sign({ ...userData });
      return {
        success: true,
        data: {
          message: "User registered successfully",
          result: { ...userData, accessToken: accessToken },
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

  public async loggedInUser(userId: string): Promise<TodoServiceResponse> {
    try {
      if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid ID");
      }
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          Todo: true,
        },
      });
      const userData = omit(user, ["password"]);
      return {
        success: true,
        data: {
          message: "User logged in successfully",
          result: { ...userData },
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
