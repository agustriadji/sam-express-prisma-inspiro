import Joi from "joi";
import {CreateTransactionDTO} from "./dto/transactions.dto";

const item = {
  cash: Joi.number().positive().valid(2000, 5000, 10000, 20000, 50000).required(),
  product_id: Joi.number().positive().required(),
  status: Joi.string().allow("active", "inactive").default("active"),
};
const schemaCreate = Joi.object()
  .keys({
    cash: item.cash,
    product_id: item.product_id,
    status: item.status,
  })
  .required();

/**
 * addTransactions_Spec
 * add transactions
 * @param {object} payload
 * @param {2000|5000|10000|20000|50000} payload.cash
 * @param {number} payload.product_id
 * @example * var payload = { cash: 10000, product_id: 1 }; *
 * @returns {Promise<{message: string ,error: boolean, data: object}>}
 */
export async function addTransactions_Spec(payload = CreateTransactionDTO) {
  let {value, error} = schemaCreate.validate(payload);

  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}
