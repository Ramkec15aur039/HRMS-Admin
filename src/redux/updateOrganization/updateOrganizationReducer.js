/** **************************** Import Types ****************************** */
import {
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILURE,
  CLEAR_UPDATE_ORGANIZATION_STATE,
} from "./updateOrganizationTypes";

const initialState = {
  loading: false,
  storeUpdateOrganizationResponse: "",
  error: "",
};

const updateOrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
        storeUpdateOrganizationResponse: "",
      };
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        loading: false,
        storeUpdateOrganizationResponse: action.payload.responseStatus,
        error: "",
      };
    case UPDATE_ORGANIZATION_FAILURE:
      return {
        loading: false,
        storeUpdateOrganizationResponse: "error",
        error: action.payload,
      };
    case CLEAR_UPDATE_ORGANIZATION_STATE:
      return {
        loading: false,
        storeUpdateOrganizationResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default updateOrganizationReducer;
