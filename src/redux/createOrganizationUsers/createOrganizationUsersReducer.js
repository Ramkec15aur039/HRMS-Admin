/** **************************** Import Types ****************************** */
import {
  CREATE_ORGANIZATION_USERS_REQUEST,
  CREATE_ORGANIZATION_USERS_SUCCESS,
  CREATE_ORGANIZATION_USERS_FAILURE,
  CLEAR_CREATE_ORGANIZATION_USERS_STATE,
} from "./createOrganizationUsersTypes";

const initialState = {
  loading: false,
  storeCreateOrganizationUsersResponse: "",
  error: "",
};

const createOrganizationUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeCreateOrganizationUsersResponse: "",
      };
    case CREATE_ORGANIZATION_USERS_SUCCESS:
      return {
        loading: false,
        storeCreateOrganizationUsersResponse: action.payload.responseStatus,
        error: "",
      };
    case CREATE_ORGANIZATION_USERS_FAILURE:
      return {
        loading: false,
        storeCreateOrganizationUsersResponse: "error",
        error: action.payload,
      };
    case CLEAR_CREATE_ORGANIZATION_USERS_STATE:
      return {
        loading: false,
        storeCreateOrganizationUsersResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default createOrganizationUsersReducer;
