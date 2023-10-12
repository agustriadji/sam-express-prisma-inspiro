import Joi from "joi";
import {CreateProductsDTO, EditProductsDTO, DetailProductsDTO} from "./dto/products.dto";

// id Int @id @default(autoincrement())
// title String @db.VarChar(150) @unique
// description String @db.VarChar(250) @default("This Description")
// author User? @relation(fields: [author_id], references: [id])
// author_id Int
// price Int @default(0)
// quantity Int @default(0)
// status Status @default(active)

const item = {
  productsId: Joi.number().positive().required(),
  title: Joi.string().invalid("", null).required(),
  description: Joi.string().allow(null),
  price: Joi.number().default(0).min(0).required(),
  quantity: Joi.number().default(0).min(0).required(),
  author_id: Joi.number().positive().required(),
  status: Joi.string().allow("active", "inactive").default("active"),
};
const schemaCreate = Joi.object()
  .keys({
    title: item.title,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
    author_id: item.author_id,
    status: item.status,
  })
  .required();

const schemaEdit = Joi.object()
  .keys({
    productsId: item.productsId,
    title: item.title,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
  })
  .required();

const schemaStatusItem = Joi.object().keys({productsId: item.productsId, status: item.status});

const schemaID = Joi.object().keys({productsId: item.productsId});

/**
 * addProducts_Spec
 * add
 * @param {object} payload
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{message: string ,error: boolean, data: object}>}
 */
export async function addProducts_Spec(payload = CreateProductsDTO) {
  let {value, error} = schemaCreate.validate(payload);

  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * editProducts_Spec
 * @param {object} payload
 * @param {number} payload.productsId
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { productsId:1, title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{message: string ,error: boolean, data: object}>}
 */
export async function editProducts_Spec(payload = EditProductsDTO) {
  let {value, error} = schemaEdit.validate(payload);

  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * updateStatusProducts_Spec
 * update Status by id
 * @param {object} payload
 * @param {string} payload.productsId is required
 * @param {string} payload.status is required
 * @example * var payload = { productsId: 1234, status: 'active|inactive' }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function updateStatusProducts_Spec(payload) {
  let {value, error} = schemaStatusItem.validate(payload);

  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * detailProducts_Spec
 * get all or by id
 * @param {object} payload
 * @param {string} payload.productsId optional
 * @returns {Promise<{message: string, error: boolean, data: object}>}
 */
export async function detailProducts_Spec(payload = DetailProductsDTO) {
  let {value, error} = schemaID.validate(payload);
  value = {
    productsId: Number(value.productsId),
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}

/**
 * removeProducts_Spec
 * get all movies or by id
 * @param {object} payload is required
 * @param {string} payload.productsId is required
 * @returns {Promise<{message: string, error: boolean, data: object}>}
 */
export async function removeProducts_Spec(payload) {
  let {value, error} = schemaID.validate(payload);
  value = {
    productsId: Number(value.productsId),
    status: "inactive",
  };
  return {
    message: error ? error.details[0].message : "ok",
    error: error ? true : false,
    data: value,
  };
}
