/** **************************** Import Types ****************************** */
import {
  GET_ORGANIZATION_USERS_REQUEST,
  GET_ORGANIZATION_USERS_SUCCESS,
  GET_ORGANIZATION_USERS_FAILURE,
} from "./getOrganizationUsersTypes";

const initialState = {
  loading: false,
  storeGetOrganizationUsersResponse: "",
  error: "",
};

const getOrganizationUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATION_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeGetOrganizationUsersResponse: "",
      };
    case GET_ORGANIZATION_USERS_SUCCESS:
      return {
        loading: false,
        storeGetOrganizationUsersResponse: action.payload,
        error: "",
      };
    case GET_ORGANIZATION_USERS_FAILURE:
      return {
        loading: false,
        storeGetOrganizationUsersResponse: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getOrganizationUsersReducer;
