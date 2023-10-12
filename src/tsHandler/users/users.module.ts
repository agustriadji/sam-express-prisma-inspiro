"use strict";

import {genSaltSync, hashSync} from "bcrypt-ts";
const PrismaClient = require("@prisma/client");
import {CreateUsersDTO, EditUsersDTO, UpdateStatusUsersDTO} from "./dto/users.dto";
const prisma = new PrismaClient.PrismaClient();

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
 * getUsers_Module
 * @function getUsers_Module module for get UserId
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function getUsers_Module(): Promise<IResponse> {
  try {
    let result = []; // result for prisma
    result = await prisma.user.findMany({
      where: {
        AND: [
          {
            "status": "active",
          },
        ],
      },
      select: {
        id: true,
        fullname: true,
        email: true,
      },
    });
    response.data = result; // store to response data
  } catch (e) {
    console.error(e.meta, "::getUserId_Module");
    response.error = true;
    response.message = "failed get data";
  }
  return {...response};
}

/**
 * detailUsers_Module
 * @function detailUsers_Module module for get detail UserId
 * @param {number} userId id required
 * @returns {Promise<{error: boolean,message:'ok|success', data:any }>}
 */
export async function detailUsers_Module(userId: number): Promise<IResponse> {
  try {
    let result = []; // result for prisma
    result = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            "status": "active",
          },
        ],
      },
    });

    response.data = result; // store to response data
  } catch (e) {
    console.error(e.meta, "::detailUserId_Module");
    response.error = true;
    response.message = "failed get detail data";
  }

  return {...response};
}

/**
 * addUsers_Module
 * @function addUsers_Module module for add UserId
 * @param {object} payload
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @param {string} payload.password is required
 * @param {string} payload.status optional default active
 * @example * var payload = { fullname:"admin", email:"admin@email.com", password: "admin123" }; *
 * @returns {Promise<{message: string, error: boolean, data: any[]}>}
 */
export async function addUsers_Module(payload: CreateUsersDTO): Promise<IResponse> {
  let result: any = [];
  try {
    const lada = genSaltSync(10);
    const hash = hashSync(payload.password, lada);

    result = await prisma.user.create({
      data: {
        fullname: payload.fullname,
        email: payload.email,
        password: hash,
      },
    });
    response.data = result;
  } catch (e) {
    console.error(e, "::addUserId_Module");
    response.error = true;
    response.message = "failed add data";
  }

  return {...response};
}

/**
 * editUsers_Module
 * @function editUsers_Module module for edit UserId
 * @param {object} payload
 * @param {string} payload.userId is required
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @example * var payload = { userId:123, fullname:"admin", email:"admin@email.com" }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function editUsers_Module(payload: EditUsersDTO): Promise<IResponse> {
  let result: any = [];
  try {
    const ID = payload.userId;
    result = await prisma.movie.update({
      data: {
        fullname: payload.fullname,
        email: payload.email,
      },
      where: {
        id: ID,
      },
    });
    response.data = result;
  } catch (e) {
    console.error(e.meta, "::editUserId_Module");
    response.error = true;
    response.message = "Data not found";
  }
  return {...response};
}

/**
 * updateStatusUsers_Module
 * @function updateStatusUsers_Module module for update status UserId
 * @param {object} payload
 * @param {string} payload.userId is required
 * @param {string} payload.status optional default active
 * @example * var payload = { userId: "1234", status:'active|inactive' }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export const updateStatusUsers_Module = async function (payload: {
  userId: number;
  status: "active" | "inactive";
}): Promise<IResponse> {
  try {
    let result: any = [];
    const id = payload.userId;

    result = await prisma.movie.update({
      data: {
        status: payload.status,
      },
      where: {id},
    });
    response.data = result;
  } catch (e) {
    console.error(e.meta, "::updateStatusUserId_Module");
    response.error = true;
    response.message = "data not found";
  }
  return {...response};
};
