import axios from "axios";
import { BASE_API_URL } from "../constants";

const instance = axios.create({
  baseURL: BASE_API_URL,
});
instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.post["Content-Type"] = "application/json";

export const get = async (api, config) => {
  return await instance.get(api, config);
};

export const post = async (api, data, config) => {
  return await instance.post(api, data, config);
};

export const patch = async (api, data, config) => {
  return await instance.patch(api, data, config);
};

export const remove = async (api, data, config) => {
  return await instance.delete(api, config);
};
