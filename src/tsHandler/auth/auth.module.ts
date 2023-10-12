"use strict";
import {config} from "dotenv";
import {sign, verify, JwtPayload} from "jsonwebtoken";
import {compareSync} from "bcrypt-ts";
const PrismaClient = require("@prisma/client");

import {AuthLogin, AuthVerify} from "./dto/auth.dto";
const prisma = new PrismaClient.PrismaClient();

config();

interface IResponse {
  message: string;
  error: boolean;
  data: any[];
}

let response: IResponse = {
  message: "ok",
  error: false,
  data: [],
};

/**
 * authVerify_Module
 * @function authVerify_Module
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function authVerify_Module(payload: AuthVerify): Promise<string | JwtPayload> {
  try {
    const decode = verify(payload.token, process.env.JWTSECRET);
    return decode;
  } catch (e) {
    console.error(e, "::auth_Module42344324");
    return "Unauthorized";
  }
}

/**
 * authLogin_Module
 * @function authLogin_Module
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function authLogin_Module(payload: AuthLogin): Promise<IResponse> {
  try {
    let result = []; // result for prisma
    result = await prisma.user.findMany({
      where: {
        AND: [
          {
            "email": payload.email,
            "status": "active",
          },
        ],
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        password: true,
      },
    });

    if (result.length) {
      const isValid = compareSync(payload.password, result[0].password);
      if (isValid) {
        delete result[0].password;

        const token = sign(result[0], process.env.JWTSECRET, {expiresIn: "7d", algorithm: "HS384"});
        console.info(payload, isValid, "DATA");
        result = {...result[0], token};
        response.data = result; // store to response data
      } else {
        response.message = "email or password incorrect";
        response.error = true;
        response.data = [];
      }
    }
  } catch (e) {
    console.error(e, "::auth_Module42344324");
    response.error = true;
    response.message = "failed auth";
  }
  return {...response};
}
