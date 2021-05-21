/** **************************** Import Libs ****************************** */
import { combineReducers } from "redux";

/** **************************** Import Reducers ****************************** */
import { changeStateReducer } from "./sidebar/changeStateReducer";
import loginReducer from "./login/loginReducer";
import createSystemUserReducer from "./createSystemUser/createSystemUserReducer";
import updateSystemUserReducer from "./updateSystemUser/updateSystemUserReducer";
import getSystemUserReducer from "./getSystemUsers/getSystemUserReducer";
import createOrganizationReducer from "./createOrganization/createOrganizationReducer";
import getAllOrganizationsReducer from "./getAllOrganizations/getAllOrganizationsReducer";
import updateOrganizationReducer from "./updateOrganization/updateOrganizationReducer";
import getOrganizationUsersReducer from "./getOrganizationUsers/getOrganizationUsersReducer";
import createOrganizationUsersReducer from "./createOrganizationUsers/createOrganizationUsersReducer";
import updateOrganizationUsersReducer from "./updateOrganizationUsers/updateOrganizationUsersReducer";

const rootReducer = combineReducers({
  changeStateReducer,
  login: loginReducer,
  createSystemUser: createSystemUserReducer,
  updateSystemUser: updateSystemUserReducer,
  getSystemUser: getSystemUserReducer,
  createOrganization: createOrganizationReducer,
  getAllOrganizations: getAllOrganizationsReducer,
  updateOrganization: updateOrganizationReducer,
  createOrganizationUsers: createOrganizationUsersReducer,
  getOrganizationUsers: getOrganizationUsersReducer,
  updateOrganizationUsers: updateOrganizationUsersReducer,
});

export default rootReducer;
