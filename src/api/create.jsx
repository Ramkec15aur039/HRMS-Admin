/** ****************************** Import libs *********************************** */
import { postDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const postLoginRequestData = (params) => postDataApi(URL_CONSTANTS.login, params);
export const postUserData = (params) => postDataApi(URL_CONSTANTS.users, params);
export const postOrganizationData = (params) => postDataApi(URL_CONSTANTS.organizations, params);
export const postOrganizationUserData = (params) => postDataApi(URL_CONSTANTS.organizationUser, params);
