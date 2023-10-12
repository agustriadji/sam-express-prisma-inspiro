"use strict";

import {genSaltSync, hashSync} from "bcrypt-ts";
const PrismaClient = require("@prisma/client");
import {
  CreateUsersDTO,
  EditUsersDTO,
  UpdateStatusUsersDTO,
  ByIdUsersDTO,
  DetailUsersDTO,
} from "./dto/users.dto";
const prisma = new PrismaClient.PrismaClient();

const IResponse = {
  message: String,
  error: Boolean,
  data: [],
};

let response = {
  message: "ok",
  error: false,
  data: [],
};

/**
 * getUsers_Module
 * @function getUsers_Module module for get usersId
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function getUsers_Module() {
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
    console.error(e.meta, "::getusersId_Module");
    response.error = true;
    response.message = "failed get data";
  }
  return {...response};
}

/**
 * detailUsers_Module
 * @function detailUsers_Module module for get detail usersId
 * @param {number} usersId id required
 * @returns {Promise<{error: boolean,message:'ok|success', data:any }>}
 */
export async function detailUsers_Module(usersId = number) {
  try {
    let result = []; // result for prisma
    result = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: usersId,
          },
          {
            "status": "active",
          },
        ],
      },
    });

    response.data = result; // store to response data
  } catch (e) {
    console.error(e.meta, "::detailusersId_Module");
    response.error = true;
    response.message = "failed get detail data";
  }

  return {...response};
}

/**
 * addUsers_Module
 * @function addUsers_Module module for add usersId
 * @param {object} payload
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @param {string} payload.password is required
 * @param {string} payload.status optional default active
 * @example * var payload = { fullname:"admin", email:"admin@email.com", password: "admin123" }; *
 * @returns {Promise<{message: string, error: boolean, data: any[]}>}
 */
export async function addUsers_Module(payload = CreateUsersDTO) {
  let result = response;
  try {
    const lada = genSaltSync(10);
    const hash = hashSync(payload.password, lada);

    result.data = await prisma.user.create({
      data: {
        fullname: payload.fullname,
        email: payload.email,
        password: hash,
      },
    });
  } catch (e) {
    console.error(e, "::addusersId_Module");
    response.error = true;
    response.message = "failed add data";
  }
  return {...response};
}

/**
 * editUsers_Module
 * @function editUsers_Module module for edit usersId
 * @param {object} payload
 * @param {string} payload.usersId is required
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @example * var payload = { usersId:123, fullname:"admin", email:"admin@email.com" }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function editUsers_Module(payload) {
  let result = [];
  try {
    const ID = payload.usersId;
    delete payload.usersId;

    console.log(payload, "EDIT");
    result = await prisma.user.update({
      data: payload,
      where: {
        id: ID,
      },
    });
    response.data = result;
  } catch (e) {
    console.error(e, "::editusersId_Module");
    response.error = true;
    response.message = "Data not found";
  }
  return {...response};
}

/**
 * updateStatusUsers_Module
 * @function updateStatusUsers_Module module for update status usersId
 * @param {object} payload
 * @param {string} payload.usersId is required
 * @param {"active"|"inactive"} payload.status optional default active
 * @example * var payload = { usersId: "1234", status:'active|inactive' }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export const updateStatusUsers_Module = async function (
  payload = {
    usersId: Number,
    status: "active" | "inactive",
  }
) {
  try {
    let result = [];

    result = await prisma.user.update({
      data: {
        status: payload.status,
      },
      where: {id: payload.usersId},
    });
    response.data = result;
  } catch (e) {
    console.error(e.meta, "::updateStatususersId_Module");
    response.error = true;
    response.message = "data not found";
  }
  return {...response};
};
