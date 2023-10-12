"use strict";

import {NextFunction, Request, Response} from "express";

import {authLogin_Service} from "./auth.service";

/**
 * @function authLogin_Service
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
export async function authLogin_Main(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> {
  const result = await authLogin_Service({...request.body});
  return response.json(result);
}
