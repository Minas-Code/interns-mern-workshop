import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = get(req, "user");
    if (!user) {
      throw new Error("Auth access_token not found");
    }
    const prisma = new PrismaClient();
    const checkUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (!checkUser) {
      throw new Error("User not found");
    }
    req.user = checkUser;
    return next();
  } catch (e) {
    const error = e as Error;
    let msg = "Internal Server Error";
    if (error instanceof Error) {
      msg = error.message;
    }
    return res.status(400).json({
      success: false,
      data: { message: msg },
    });
  }
};
export default isAuthorized;
