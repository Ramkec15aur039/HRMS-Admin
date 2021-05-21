/** **************************** Import Types ****************************** */
import {
  GET_ALL_ORGANIZATION_REQUEST,
  GET_ALL_ORGANIZATION_SUCCESS,
  GET_ALL_ORGANIZATION_FAILURE,
} from "./getAllOrganizationsTypes";

const initialState = {
  loading: false,
  storeGetAllOrganizationResponse: "",
  error: "",
};

const getAllOrganizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORGANIZATION_REQUEST:
      return {
        ...state,
        loading: true,
        storeGetAllOrganizationResponse: "",
      };
    case GET_ALL_ORGANIZATION_SUCCESS:
      return {
        loading: false,
        storeGetAllOrganizationResponse: action.payload,
        error: "",
      };
    case GET_ALL_ORGANIZATION_FAILURE:
      return {
        loading: false,
        storeGetAllOrganizationResponse: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getAllOrganizationsReducer;
