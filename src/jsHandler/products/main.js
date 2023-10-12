"use strict";

require("dotenv").config();

import {
  getProducts_Service,
  detailProducts_Service,
  addProducts_Service,
  editProducts_Service,
  updateStatusProducts_Service,
  removeProducts_Service,
} from "./products.service";

/**
 * @function getProducts_Main  function for get list
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function getProducts_Main(request, response, next) {
  const result = await getProducts_Service();
  return response.json(result);
}

/**
 * @function detailProducts_Main  function for get detail by id
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function detailProducts_Main(request, response, next) {
  const result = await detailProducts_Service({productsId: request.params.productsId});
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function addProducts_Main  function for add movies
 * @method POST
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function addProducts_Main(request, response, next) {
  const body = {...request.body, author_id: request.token.id};
  const result = await addProducts_Service(body);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function editProducts_Main  function for edit by id
 * @method PUT
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function editProducts_Main(request, response, next) {
  let data = {...request.params, ...request.body};
  const result = await editProducts_Service(data);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function upateStatusProducts_Main  function for update status
 * @method PUT
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function upateStatusProducts_Main(request, response, next) {
  let data = {...request.params, ...request.body};
  const result = await updateStatusProducts_Service(data);
  return response.status(result.error ? 400 : 200).json(result);
}

/**
 * @function removeProducts_Main  function for remove
 * @method DELETE
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function removeProducts_Main(request, response, next) {
  const result = await removeProducts_Service({productsId: request.params.productsId});
  return response.status(result.error ? 400 : 200).json(result);
}

export default {
  getProducts_Main,
  detailProducts_Main,
  addProducts_Main,
  editProducts_Main,
  upateStatusProducts_Main,
  removeProducts_Main,
};
