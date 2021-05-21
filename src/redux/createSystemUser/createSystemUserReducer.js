/** **************************** Import Types ****************************** */
import {
  CREATE_SYSTEM_USERS_REQUEST,
  CREATE_SYSTEM_USERS_SUCCESS,
  CREATE_SYSTEM_USERS_FAILURE,
  CLEAR_CREATE_SYSTEM_USERS_STATE,
} from "./createSystemUserTypes";

const initialState = {
  loading: false,
  storeCreateSystemUserResponse: "",
  error: "",
};

const createSystemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SYSTEM_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeCreateSystemUserResponse: "",
      };
    case CREATE_SYSTEM_USERS_SUCCESS:
      return {
        loading: false,
        storeCreateSystemUserResponse: action.payload.responseStatus,
        error: "",
      };
    case CREATE_SYSTEM_USERS_FAILURE:
      return {
        loading: false,
        storeCreateSystemUserResponse: "error",
        error: action.payload,
      };
    case CLEAR_CREATE_SYSTEM_USERS_STATE:
      return {
        loading: false,
        storeCreateSystemUserResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default createSystemUserReducer;
