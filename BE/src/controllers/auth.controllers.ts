import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.services";
import { ResponseWrapper } from "../helpers/response_wrapper";

export class AuthController {
  public static async registerUser(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const authService = new AuthService();
    const response = new ResponseWrapper(res);
    return response.created(await authService.register(req.body));
  }

  public static async loginUser(req: Request, res: Response, _: NextFunction) {
    const { email, password } = req.body;
    const authService = new AuthService();
    const response = new ResponseWrapper(res);
    return response.ok(await authService.login({ email, password }));
  }

  public static async loggedInUser(
    req: Request,
    res: Response,
    _: NextFunction
  ) {
    const authService = new AuthService();
    const response = new ResponseWrapper(res);
    return response.ok(await authService.loggedInUser(req.user.id));
  }
}

export default AuthController;
