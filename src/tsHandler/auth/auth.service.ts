import {authLogin_Spec} from "./auth.spec";
import {authLogin_Module} from "./auth.module";
import {AuthLogin} from "./dto/auth.dto";

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
 * @function authLogin_Service
 * @param {object} payload
 * @param {string} payload.email is required
 * @param {string} payload.password is required
 * @returns {Promise.<{message:string, error:boolean, data:any}>}
 */
export async function authLogin_Service(payload: AuthLogin): Promise<IResponse> {
  let res = await authLogin_Spec(payload);
  if (!res.error) {
    res = await authLogin_Module({...res.data});
    if (typeof res === "string") {
      res = {
        message: res,
        error: true,
        data: [],
      };
    } else {
      res = {
        message: "ok",
        error: false,
        data: res,
      };
    }
  }
  return res;
}
