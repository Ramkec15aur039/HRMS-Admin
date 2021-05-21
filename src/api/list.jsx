/** ****************************** Import libs *********************************** */
import { getListByApi, viewDataByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const getUserList = (params) => getListByApi(URL_CONSTANTS.users, params);

export const getUserById = (dataId) => viewDataByApi(URL_CONSTANTS.users, dataId);

export const getAllOrganizations = (params) => getListByApi(URL_CONSTANTS.organizations, params);

export const getOrganizationById = (dataId) => viewDataByApi(URL_CONSTANTS.organizations, dataId);

export const getOrganizationUsers = (params) => getListByApi(URL_CONSTANTS.organizationUser, params);

export const getOrganizationUsersById = (dataId) => viewDataByApi(URL_CONSTANTS.organizationUser, dataId);
