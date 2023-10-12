"use strict";

const PrismaClient = require("@prisma/client");
import {CreateTransactionDTO} from "./dto/transactions.dto";
const prisma = new PrismaClient.PrismaClient();

let IResponse = {
  message: String,
  error: Boolean,
  data: Array,
};

let response = (IResponse = {
  message: "ok",
  error: false,
  data: [],
});

/**
 * getTransaactions_Module
 * @function getTransaactions_Module module for get movies
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function getTransactions_Module() {
  try {
    let result = []; // result for prisma
    result = await prisma.transactions.findMany({
      where: {
        AND: [
          {
            "status": "active",
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        rating: true,
        author: {
          select: {
            id: true,
            fullname: true,
          },
        },
      },
    });
    response.data = result; // store to response data
  } catch (e) {
    response.error = false;
    response.message = "empty data";
  }
  return {...response};
}

/**
 * addTransactions_Module
 * @function addTransactions_Module module for add movies
 * @param {object} payload
 * @param {2000|5000|10000|20000|50000} payload.currency_denom
 * @param {number} payload.product_id
 * @param {number} payload.change
 * @example * var payload = { currency_denom:10000, product_id:1, change:12000, change_detail:[{ currency_denom_value: 10000, quantity: 1 },currency_denom_value: 2000, quantity: 1] }; *
 * @returns {Promise<{message: string, error: boolean, data: any[]}>}
 */
export async function addTransactions_Module(payload = CreateTransactionDTO) {
  let result = [];
  try {
    result = await prisma.transactions.create({
      data: {
        cash: payload.cash,
        product_id: payload.product_id,
        total: payload.total,
        change: payload.change,
        code: payload.code,
      },
    });
    response.data = result;
  } catch (e) {
    console.error(e, "::addTransaactions_Module");
    response.error = false;
    response.message = "failed add data";
  }
  return {...response};
}
