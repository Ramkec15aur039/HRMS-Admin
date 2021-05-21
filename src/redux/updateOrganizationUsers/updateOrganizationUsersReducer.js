/** **************************** Import Types ****************************** */
import {
  UPDATE_ORGANIZATION_USERS_REQUEST,
  UPDATE_ORGANIZATION_USERS_SUCCESS,
  UPDATE_ORGANIZATION_USERS_FAILURE,
  CLEAR_UPDATE_ORGANIZATION_USERS_STATE,
} from "./updateOrganizationUsersTypes";

const initialState = {
  loading: false,
  storeUpdateOrganizationUsersResponse: "",
  error: "",
};

const updateOrganizationUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORGANIZATION_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeUpdateOrganizationUsersResponse: "",
      };
    case UPDATE_ORGANIZATION_USERS_SUCCESS:
      return {
        loading: false,
        storeUpdateOrganizationUsersResponse: action.payload.responseStatus,
        error: "",
      };
    case UPDATE_ORGANIZATION_USERS_FAILURE:
      return {
        loading: false,
        storeUpdateOrganizationUsersResponse: "error",
        error: action.payload,
      };
    case CLEAR_UPDATE_ORGANIZATION_USERS_STATE:
      return {
        loading: false,
        storeUpdateOrganizationUsersResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default updateOrganizationUsersReducer;
