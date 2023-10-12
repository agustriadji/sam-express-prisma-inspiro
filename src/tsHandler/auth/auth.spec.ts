import Joi from "joi";
import {AuthLogin} from "./dto/auth.dto";

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().invalid("", "1").required(),
});

interface IResponse {
  message: string;
  error: boolean;
  data: any;
}

let response: IResponse = {
  message: "ok",
  error: false,
  data: [],
};

/**
 * @function authLogin_Spec
 * @param {object} payload
 * @param {string} payload.email is required
 * @param {string} payload.password is required
 * @returns {Promise.<{message:string, error:boolean, data:any}>}
 */
export async function authLogin_Spec(payload: AuthLogin): Promise<IResponse> {
  const {value, error} = schema.validate(payload);
  response.message = error ? error.details[0].message : "ok";
  response.error = error ? true : false;
  response.data = value || [];

  return response;
}
