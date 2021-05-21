/** **************************** Import Types ****************************** */
import {
  GET_SYSTEM_USERS_REQUEST,
  GET_SYSTEM_USERS_SUCCESS,
  GET_SYSTEM_USERS_FAILURE,
} from "./getSystemUserTypes";

const initialState = {
  loading: false,
  storeGetSystemUserResponse: "",
  error: "",
};

const getSystemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SYSTEM_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeGetSystemUserResponse: "",
      };
    case GET_SYSTEM_USERS_SUCCESS:
      return {
        loading: false,
        storeGetSystemUserResponse: action.payload,
        error: "",
      };
    case GET_SYSTEM_USERS_FAILURE:
      return {
        loading: false,
        storeGetSystemUserResponse: "error",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getSystemUserReducer;
