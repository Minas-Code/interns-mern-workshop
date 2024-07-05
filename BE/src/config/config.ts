import { Secret } from "jsonwebtoken";


export const jwtConfig = {
    secret: process.env.SECRET as Secret,
    expiry: process.env.TOKEN_EXPIRY_HOUR,
    saltRound: 10,
  };