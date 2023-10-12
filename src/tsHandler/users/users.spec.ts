import Joi from "joi";
import {CreateUsersDTO, EditUsersDTO, UpdateStatusUsersDTO} from "./dto/users.dto";

const item = {
  userId: Joi.number().positive().allow(null),
  fullname: Joi.string().invalid("", null).required(),
  email: Joi.string().email().invalid("", null).required(),
  password: Joi.string().invalid("", null).required(),
  status: Joi.string().allow("active", "inactive").default("active"),
};
const schemaItem = Joi.object().keys(item).required();

const schemaStatusItem = Joi.object().keys({userId: item.userId, status: item.status});

const schemaID = Joi.object().keys({userId: item.userId});

/**
 * addUsers_Spec
 * add Users
 * @param {object} payload
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @param {number} payload.password is required
 * @param {string} payload.status optional default active
 * @example * var payload = { fullname:"admin", email:"admin@email.com", password: "admin123" }; *
 * @returns {Promise<{message: string ,error: boolean, data: any}>}
 */
export async function addUsers_Spec(
  payload: CreateUsersDTO
): Promise<{message: string; error: boolean; data: any}> {
  let {value, error} = schemaItem.validate(payload);
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * editUsers_Spec
 * @param {object} payload
 * @param {number} payload.userId is required
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @example * var payload = { userId:123, fullname:"admin", email:"admin@email.com" }; *
 * @returns {Promise<{message: string ,error: boolean, data: any}>}
 */
export async function editUsers_Spec(
  payload: EditUsersDTO
): Promise<{message: string; error: boolean; data: any}> {
  let {value, error} = schemaItem.validate(payload);
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * updateStatusUsers_Spec
 * update Status Users by id
 * @param {object} payload
 * @param {string} payload.userId is required
 * @param {string} payload.status is required
 * @example * var payload = { userId: 1234, status: 'active|inactive' }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function updateStatusUsers_Spec(
  payload: UpdateStatusUsersDTO
): Promise<{message: string; error: boolean; data: any}> {
  let {value, error} = schemaStatusItem.validate(payload);
  value = {
    ...value,
    userId: Number(value.userId),
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * detailUsers_Spec
 * get all Users or by id
 * @param {object} payload
 * @param {string} payload.userId optional
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function detailUsers_Spec(
  payload: any
): Promise<{message: string; error: boolean; data: any}> {
  let {value, error} = schemaID.validate(payload);
  value = {
    userId: Number(value.userId),
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * removeUsers_Spec
 * get all Users or by id
 * @param {object} payload is required
 * @param {string} payload.userId is required
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function removeUsers_Spec(payload: any): Promise<{
  message: string;
  error: boolean;
  data: any;
}> {
  let {value, error} = schemaID.validate(payload);
  value = {
    userId: Number(value.userId),
    status: "inactive",
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}
