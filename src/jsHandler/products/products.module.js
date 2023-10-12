"use strict";

const PrismaClient = require("@prisma/client");
import {
  CreateProductsDTO,
  EditProductsDTO,
  UpdateStatusProductsDTO,
  ByIdProductsDTO,
} from "./dto/products.dto";
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
 * getProducts_Module
 * @function getProducts_Module module for get
 * @returns {Promise<{error: boolean,message:string, data:any }>}
 */
export async function getProducts_Module() {
  try {
    let result = []; // result for prisma
    result = await prisma.product.findMany({
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
        price: true,
        quantity: true,
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
    console.error(e.meta, "::getProducts_Module");
    response.error = true;
    response.message = "failed get data";
  }
  return {...response};
}

/**
 * detailProducts_Module
 * @function detailProducts_Module module for get detail
 * @param {number} productsId required
 * @returns {Promise<{error: boolean,message:'ok|success', data:any }>}
 */
export async function detailProducts_Module(productsId = Number) {
  try {
    let result = []; // result for prisma
    result = await prisma.product.findMany({
      where: {
        AND: [
          {
            id: productsId,
          },
          {
            "status": "active",
          },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        quantity: true,
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
    console.error(e.meta, "::detailProducts_Module");
    response.error = true;
    response.message = "failed get detail data";
  }

  return {...response};
}

/**
 * addProducts_Module
 * @function addProducts_Module module for add
 * @param {object} payload
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{message: string, error: boolean, data: any[]}>}
 */
export async function addProducts_Module(payload = CreateProductsDTO) {
  let result = [];
  try {
    result = await prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        quantity: payload.quantity,
        author_id: payload.author_id,
      },
    });
    response.data = result;
  } catch (e) {
    console.error(e, "::addProducts_Module");
    response.error = true;
    response.message = "failed add data";
  }
  return {...response};
}

/**
 * editProducts_Module
 * @function editProducts_Module module for edit
 * @param {object} payload
 * @param {number} payload.productsId
 * @param {string} payload.title
 * @param {string} payload.description allow null
 * @param {number} payload.price default 0
 * @param {number} payload.quantity
 * @param {string} payload.status optional default active
 * @example * var payload = { productsId:1, title: "Biscuits", description: "This description", price:6000, quantity:5 }; *
 * @returns {Promise<{message: string, error: boolean, data: any}>}
 */
export async function editProducts_Module(payload = EditProductsDTO) {
  let result = response;
  try {
    const ID = payload.productsId;
    result.data = await prisma.product.update({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        quantity: payload.quantity,
      },
      where: {
        id: ID,
      },
    });
  } catch (e) {
    console.error(e.meta, "::editProducts_Module");
    result.error = true;
    result.message = "Data not found";
  }
  return {...result};
}

/**
 * updateStatusProducts_Module
 * @function updateStatusProducts_Module module for update status
 * @param {object} payload
 * @param {string} payload.productsId is required
 * @param {"active"|"inactive"} payload.status optional default active
 * @example * var payload = { productsId: "1234", status:'active|inactive' }; *
 * @returns {Promise<{error: boolean,message:'ok|success', data:object }>}
 */
export const updateStatusProducts_Module = async function (payload = UpdateStatusProductsDTO) {
  try {
    let result = [];
    const id = payload.productsId;

    result = await prisma.product.update({
      data: {
        status: payload.status,
      },
      where: {id},
    });
    response.data = result;
  } catch (e) {
    console.error(e.meta, "::updateStatusProducts_Module");
    response.error = true;
    response.message = "data not found";
  }
  return {...response};
};
