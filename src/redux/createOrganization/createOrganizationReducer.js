/** **************************** Import Types ****************************** */
import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  CLEAR_CREATE_ORGANIZATION_STATE,
} from "./createOrganizationTypes";

const initialState = {
  loading: false,
  storeCreateOrganizationResponse: "",
  error: "",
};

const createOrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
        storeCreateOrganizationResponse: "",
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        loading: false,
        storeCreateOrganizationResponse: action.payload.responseStatus,
        error: "",
      };
    case CREATE_ORGANIZATION_FAILURE:
      return {
        loading: false,
        storeCreateOrganizationResponse: "error",
        error: action.payload,
      };
    case CLEAR_CREATE_ORGANIZATION_STATE:
      return {
        loading: false,
        storeCreateOrganizationResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default createOrganizationReducer;
