import { Response, Request, NextFunction } from "express";
import Joi from "joi";

class SchemaMiddleware {
  public static async handle(
    req: Request,
    res: Response,
    next: NextFunction,
    Validator: Joi.Schema
  ) {
    try {
      if (Validator) {
        await Validator.validateAsync(req.body);
      }
      return next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return res.status(400).send({
          success: false,
          data: { message: error.details[0].message },
        });
      }
    }
  }
}

export default SchemaMiddleware;
