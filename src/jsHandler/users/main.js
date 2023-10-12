"use strict";

import {
  getUsers_Service,
  detailUsers_Service,
  addUsers_Service,
  editUsers_Service,
  updateStatusUsers_Service,
  removeUsers_Service,
} from "./users.service";

/**
 * @function getUsers_Service  function for get movies list
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function getUsers_Main(request, response, next) {
  console.log("JS::getUsers_Main");
  const result = await getUsers_Service();
  return response.json(result);
}

/**
 * @function detailUsers_Service  function for get detail movies by id
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function detailUsers_Main(request, response, next) {
  console.log("JS::detailUsers_Main");
  const result = await detailUsers_Service({usersId: request.params.usersId});
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function addUsers_Main  function for add movies
 * @method POST
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function addUsers_Main(request, response, next) {
  console.log("JS::addUsers_Main");
  const result = await addUsers_Service(request.body);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function editUsers_Main  function for edit movies by id
 * @method PUT
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function editUsers_Main(request, response, next) {
  console.log("JS::editUsers_Main");
  let data = {...request.params, ...request.body};
  const result = await editUsers_Service(data);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function upateStatusUsers_Main  function for update status movies
 * @method PUT
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function upateStatusUsers_Main(request, response, next) {
  console.log("JS::upateStatusUsers_Main");
  let data = {...request.params, ...request.body};
  const result = await updateStatusUsers_Service(data);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function removeUsers_Main  function for remove movies
 * @method DELETE
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function removeUsers_Main(request, response, next) {
  console.log("JS::removeUsers_Main");
  const result = await removeUsers_Service({usersId: request.params.usersId});
  return response.status(result.error ? 400 : 200).json(result);
}

export default {
  getUsers_Main,
  detailUsers_Main,
  addUsers_Main,
  editUsers_Main,
  upateStatusUsers_Main,
  removeUsers_Main,
};
