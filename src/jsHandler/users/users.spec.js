import Joi from "joi";
import {
  CreateUsersDTO,
  EditUsersDTO,
  UpdateStatusUsersDTO,
  DetailUsersDTO,
  ByIdUsersDTO,
} from "./dto/users.dto";

const item = {
  usersId: Joi.number().positive().required(),
  fullname: Joi.string().invalid("", null).required(),
  email: Joi.string().email().invalid("", null).required(),
  password: Joi.string().invalid("", null).required(),
  status: Joi.string().allow("active", "inactive").default("active"),
};

const schemaCreate = Joi.object()
  .keys({
    fullname: item.fullname,
    email: item.email,
    password: item.password,
  })
  .required();

const schemaEdit = Joi.object()
  .keys({
    usersId: item.usersId,
    fullname: item.fullname,
    email: item.email,
  })
  .required();

const schemaStatusItem = Joi.object().keys({usersId: item.usersId, status: item.status});

const schemaID = Joi.object().keys({usersId: item.usersId});

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
export async function addUsers_Spec(payload = CreateUsersDTO) {
  let {value, error} = schemaCreate.validate(payload);
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * editUsers_Spec
 * @param {object} payload
 * @param {number} payload.usersId is required
 * @param {string} payload.fullname is required
 * @param {string} payload.email is required
 * @example * var payload = { usersId:123, fullname:"admin", email:"admin@email.com" }; *
 * @returns {Promise<{message: string ,error: boolean, data: any}>}
 */
export async function editUsers_Spec(payload = EditUsersDTO) {
  let {value, error} = schemaEdit.validate(payload);
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
 * @param {string} payload.usersId is required
 * @param {string} payload.status is required
 * @example * var payload = { usersId: 1234, status: 'active|inactive' }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function updateStatusUsers_Spec(payload = UpdateStatusUsersDTO) {
  let {value, error} = schemaStatusItem.validate(payload);
  value = {
    ...value,
    usersId: Number(value.usersId),
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
 * @param {string} payload.usersId optional
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function detailUsers_Spec(payload = DetailUsersDTO) {
  let {value, error} = schemaID.validate(payload);
  value = {
    usersId: Number(value.usersId),
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
 * @param {string} payload.usersId is required
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function removeUsers_Spec(payload = ByIdUsersDTO) {
  let {value, error} = schemaID.validate(payload);
  value = {
    usersId: Number(value.usersId),
    status: "inactive",
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}
