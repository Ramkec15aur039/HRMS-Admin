/** ****************************** Import libs *********************************** */
import { deleteDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const deleteUser = (id) => deleteDataApi(URL_CONSTANTS.users, id);

export const deleteOrganization = (id) => deleteDataApi(URL_CONSTANTS.organizations, id);

export const deleteOrganizationUsers = (id) => deleteDataApi(URL_CONSTANTS.organizationUser, id);

