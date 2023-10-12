import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import {config} from "dotenv";
import {authVerify_Module} from "../auth/auth.module";

config();

export const SECRET_KEY: Secret = process.env.JWTSECRET;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export async function authMiddle(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decoded = await authVerify_Module({token});
    if (typeof decoded === "string") {
      return response.status(401).send("Token Unauthorized");
    } else {
      (request as CustomRequest).token = decoded;
      next();
    }
  } catch (error) {
    return response.status(401).send("Token Unauthorized");
  }
}
