import { get } from "lodash";
import { verify } from "../helpers/jwt";
import { Response, NextFunction } from "express";
import { customRequest } from "../types/cutomDefinition";

const deserializeUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = get(req, "headers.authorization");
  let bToken = bearerToken;
  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    bToken = bearerToken.substring(7);
  }
  if (!bToken) return next();

  const { decoded, expired, valid, msg: errorMsg } = verify(bToken);

  if (valid && !expired) {
    req.user = decoded;
    return next();
  } else {
    return res.status(403).json({
      success: false,
      data: { message: errorMsg },
    });
  }
};

export default deserializeUser;
