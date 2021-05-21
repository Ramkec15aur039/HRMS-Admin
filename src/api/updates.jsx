/** ****************************** Import libs *********************************** */
import { putDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const updateUserData = (params, id) => putDataApi(URL_CONSTANTS.users, params, id);

export const updateOrganizationData = (params, id) => putDataApi(URL_CONSTANTS.organizations, params, id);

export const updateOrganizationUsersData = (params, id) => putDataApi(URL_CONSTANTS.organizationUser, params, id);
