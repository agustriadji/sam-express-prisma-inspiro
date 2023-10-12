"use strict";

import {
  addUsers_Spec,
  editUsers_Spec,
  detailUsers_Spec,
  updateStatusUsers_Spec,
  removeUsers_Spec,
} from "./users.spec";
import {
  getUsers_Module,
  detailUsers_Module,
  addUsers_Module,
  editUsers_Module,
  updateStatusUsers_Module,
} from "./users.module";

import {
  CreateUsersDTO,
  EditUsersDTO,
  UpdateStatusUsersDTO,
  ByIdUsersDTO,
  DetailUsersDTO,
} from "./dto/users.dto";

let response = {
  message: "ok",
  error: false,
  data: [],
};

/**
 * getUsers_Service
 * @function getUsers_Service services get movies
 * @returns {Promise<{error: boolean,message:string, data:object }>}
 */
export async function getUsers_Service() {
  try {
    let res = null;
    res = await getUsers_Module();
    return {...res};
  } catch (error) {
    return {error: true, message: error, data: []};
  }
}

/**
 * detailUsers_Service
 * @function detailUsers_Service
 * @param {object} payload required
 * @param {number} payload.usersId required
 * @return {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export async function detailUsers_Service(payload = DetailUsersDTO) {
  try {
    let res = await detailUsers_Spec(payload);
    if (!res.error) {
      res = await detailUsers_Module({...res.data.usersId});
      if (res.data.length) {
        res.data = res.data[0];
      } else {
        res.message = "Data not found";
      }
    }

    return {...res};
  } catch (error) {
    return {error: true, message: error, data: []};
  }
}

/**
 * addUsers_Service
 * @function addUsers_Service services add item to users
 * @param {object} payload
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @param {string} payload.password is required
 * @param {string} payload.status optional default active
 * @example * var payload = { fullname:"admin", email:"admin@email.com", password: "admin123" }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function addUsers_Service(payload = CreateUsersDTO) {
  try {
    let res = await addUsers_Spec(payload);
    if (!res.error) {
      res = await addUsers_Module(payload);
    }
    return {...res};
  } catch (error) {
    return {error: true, message: error, data: []};
  }
}

/**
 * editUsers_Service
 * @function editUsers_Service services edit course
 * @param {object} payload
 * @param {string} payload.usersId is required
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @example * var payload = { usersId: 123, fullname:"admin", email:"admin@email.com" }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function editUsers_Service(payload) {
  try {
    let res = await editUsers_Spec(payload);
    if (!res.error) {
      res = await editUsers_Module(res.data);
    }
    return {...res};
  } catch (error) {
    return {error: true, message: error, data: []};
  }
}

/**
 * updateStatusUsers_Service
 * @function updateStatusUsers_Service services udpate status course
 * @param {object} payload
 * @param {string} payload.usersId is required
 * @param {string} payload.status optional default active
 * @example * var payload = { usersId:213123,, status:"inactive" }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function updateStatusUsers_Service(payload = UpdateStatusUsersDTO) {
  try {
    let res = await updateStatusUsers_Spec(payload);

    if (!res.error) {
      res = await updateStatusUsers_Module(res.data);
    }
    return {...res};
  } catch (error) {
    return {error: true, message: error, data: []};
  }
}

/**
 * removeUsers_Service
 * @function removeUsers_Service services remove movies
 * @param {object} payload
 * @param {string} payload.usersId is required
 * @example * var payload = { usersId:213123 }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function removeUsers_Service(payload = ByIdUsersDTO) {
  try {
    let res = await removeUsers_Spec(payload);
    if (!res.error) {
      res = await updateStatusUsers_Module(res.data);
    }
    return {...res};
  } catch (error) {
    console.log(error);
    return {error: true, message: error, data: []};
  }
}
