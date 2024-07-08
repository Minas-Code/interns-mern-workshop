import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import { wrapper } from "../helpers/exception_wrapper";
import authValidator from "../validations/auth.validator";
import Schema from "../middleware/validator";
import isAuthorized from "../middleware/isAuthorized";

const authRouter = Router();

authRouter.post(
  "/register",
  (req, res, next) => {
    Schema.handle(req, res, next, authValidator.registerSchema());
  },
  wrapper(AuthController.registerUser)
);

authRouter.post(
  "/login",
  (req, res, next) => {
    Schema.handle(req, res, next, authValidator.loginSchema());
  },
  wrapper(AuthController.loginUser)
);

authRouter.get("/me", isAuthorized, wrapper(AuthController.loggedInUser));

export default authRouter;
