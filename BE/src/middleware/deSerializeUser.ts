import { get } from "lodash";
import { verify } from "../helpers/jwt";
import { Response, NextFunction, RequestHandler, Request } from "express";
import { User } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

const deserializeUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = get(req, "headers.authorization");
  let bToken = bearerToken;
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    bToken = bearerToken.substring(7);
  }
  if (!bToken) return next();

  const { decoded, expired, valid, msg: errorMsg } = verify(bToken || "");

  if (valid && !expired && decoded) {
    req.user = decoded as User; 
    return next();
  } else {
    res.status(403).json({
      success: false,
      data: { message: errorMsg },
    });
  }
};

export default deserializeUser;
