"use strict";

import {addTransactions_Spec} from "./transactions.spec";
import {getTransactions_Module, addTransactions_Module} from "./transactions.module";
import {detailProducts_Module, editProducts_Module} from "../products/products.module";
import {CreateTransactionDTO} from "./dto/transactions.dto";

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
 * getTransactions_Service
 * @function getTransactions_Service services get
 * @returns {Promise<{error: boolean,message:string, data:object }>}
 */
export async function getTransactions_Service() {
  let res = response;
  try {
    res = await getTransactions_Module();
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
  }
  console.log(res);
  return res;
}

/**
 * addTransactions_Service
 * @function addTransactions_Service services add item to movies
 * @param {object} payload
 * @param {2000|5000|10000|20000|50000} payload.currency_denom
 * @param {number} payload.product_id
 * @example * var payload = { currency_denom: 10000, product_id: 1 }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function addTransactions_Service(payload = CreateTransactionDTO) {
  let res = response;
  try {
    res = await addTransactions_Spec(payload);
    if (!res.error) {
      const detail = await detailProducts_Module(res.data.product_id);
      if (!detail.error) {
        detail.data = detail.data[0];
        if (detail.data.quantity > 0) {
          const change = payload.cash - detail.data.price;
          if (change > -1) {
            res.data.total = detail.data.price;
            res.data.change = change;
            res.data.code = `code-${new Date().getUTCMilliseconds()}`;
            res = await addTransactions_Module(res.data);

            if (!res.error) {
              const computeQty = detail.data.quantity - 1;
              editProducts_Module({
                productsId: payload.product_id,
                quantity: computeQty < 0 ? 0 : computeQty,
              });
            }
          } else {
            res.error = true;
            res.message = "Sorry, your balance is insufficient";
          }
        } else {
          res.error = true;
          res.message = "Empty Stock";
        }
      } else {
        res.error = true;
        res.message = "Empty Stock";
      }
    }
    return res;
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
    return res;
  }
}
