import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let err = error;

  // Check if error is an instance of Error, if not wrap it in a standard Error
  if (!(error instanceof Error)) {
    err = new Error("Internal server error");
  }

  const statusCode = 500;
  const message = err.message || "Internal server error";

  res.locals.errorMessage = message;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).json(response);
};


