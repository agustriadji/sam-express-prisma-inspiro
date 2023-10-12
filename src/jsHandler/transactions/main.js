"use strict";

require("dotenv").config();

import {getTransactions_Service, addTransactions_Service} from "./transactions.service";

/**
 * @function getTransactions_Main  function for get transactions list
 * @method GET
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function getTransactions_Main(request, response, next) {
  const result = await getTransactions_Service();
  return response.json(result);
}

/**
 * @function addTransactions_Main  function for add transactions
 * @method POST
 * @param {object} request Request data express
 * @param {object} response Response data express
 * @param {object} next Callback data express
 * @returns {Promise<*>} API Response { message, error, data }
 */
async function addTransactions_Main(request, response, next) {
  const body = request.body;
  const result = await addTransactions_Service(body);
  return response.status(result.error ? 400 : 200).json(result);
}

export default {
  getTransactions_Main,
  addTransactions_Main,
};
