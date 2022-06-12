const HOST_PROTOCOL = "https";
const API_SUFFIX = "api/v1";
const API_HOST = "frershr-dev.herokuapp.com";
// const API_HOST_PORT = "3000";

export const BASE_API_URL = `${HOST_PROTOCOL}://${API_HOST}/${API_SUFFIX}`;
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
