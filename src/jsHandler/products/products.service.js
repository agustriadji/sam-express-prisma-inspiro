"use strict";

import {
  addProducts_Spec,
  editProducts_Spec,
  detailProducts_Spec,
  updateStatusProducts_Spec,
  removeProducts_Spec,
} from "./products.spec";
import {
  getProducts_Module,
  detailProducts_Module,
  addProducts_Module,
  editProducts_Module,
  updateStatusProducts_Module,
} from "./products.module";

import {
  DetailProductsDTO,
  CreateProductsDTO,
  EditProductsDTO,
  UpdateStatusProductsDTO,
  ByIdProductsDTO,
} from "./dto/products.dto";

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
 * getProducts_Service
 * @function getProducts_Service services get
 * @returns {Promise<{error: boolean,message:string, data:object }>}
 */
export async function getProducts_Service() {
  let res = response;
  try {
    res = await getProducts_Module();
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
  }
  return res;
}

/**
 * detailProducts_Service
 * @function detailProducts_Service services detail
 * @param {string} productId required
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export async function detailProducts_Service(payload = DetailProductsDTO) {
  let res = response;
  try {
    res = await detailProducts_Spec(payload);
    if (!res.error) {
      res = await detailProducts_Module({...res.data.productId});
      if (res.data.length) {
        res.data = res.data[0];
      } else {
        res.message = "Data not found";
      }
    }
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
  }
  return res;
}

/**
 * addProducts_Service
 * @function addProducts_Service services add item to
 * @param {object} payload
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function addProducts_Service(payload = CreateProductsDTO) {
  let res = response;
  try {
    res = await addProducts_Spec(payload);
    if (!res.error) {
      res = await addProducts_Module(payload);
    }
    return res;
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
    return res;
  }
}

/**
 * editProducts_Service
 * @function editProducts_Service services edi
 * @param {object} payload
 * @param {number} payload.productsId
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { productsId:1, title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export async function editProducts_Service(payload = EditProductsDTO) {
  let res = response;
  try {
    let res = await editProducts_Spec(payload);
    if (!res.error) {
      console.log(13);
      res = await editProducts_Module(res.data);
    }
    return res;
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
    return res;
  }
}

/**
 * updateStatusProducts_Service
 * @function updateStatusProducts_Service services udpate status
 * @param {object} payload
 * @param {string} payload.productId is required
 * @param {string} payload.status optional default active
 * @example * var payload = { productId:213123,, status:"inactive" }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export async function updateStatusProducts_Service(payload = UpdateStatusProductsDTO) {
  let res = response;
  try {
    res = await updateStatusProducts_Spec(payload);

    if (!res.error) {
      res = await updateStatusProducts_Module(res.data);
    }
    return res;
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
    return res;
  }
}

/**
 * removeProducts_Service
 * @function removeProducts_Service services remove
 * @param {object} payload
 * @param {string} payload.productId is required
 * @example * var payload = { productId:213123 }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:any }>}
 */
export async function removeProducts_Service(payload = ByIdProductsDTO) {
  let res = response;
  try {
    let res = await removeProducts_Spec(payload);
    if (!res.error) {
      res = await updateStatusProducts_Module(res.data);
    }
    return res;
  } catch (error) {
    res.message = "Bad request";
    res.error = true;
    return res;
  }
}
