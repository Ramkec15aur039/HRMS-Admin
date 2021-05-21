/** **************************** Import Types ****************************** */
import {
  UPDATE_SYSTEM_USERS_REQUEST,
  UPDATE_SYSTEM_USERS_SUCCESS,
  UPDATE_SYSTEM_USERS_FAILURE,
  CLEAR_UPDATE_SYSTEM_USERS_STATE,
} from "./updateSystemUserTypes";

const initialState = {
  loading: false,
  storeUpdateSystemUserResponse: "",
  error: "",
};

const updateSystemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SYSTEM_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        storeUpdateSystemUserResponse: "",
      };
    case UPDATE_SYSTEM_USERS_SUCCESS:
      return {
        loading: false,
        storeUpdateSystemUserResponse: action.payload.responseStatus,
        error: "",
      };
    case UPDATE_SYSTEM_USERS_FAILURE:
      return {
        loading: false,
        storeUpdateSystemUserResponse: "error",
        error: action.payload,
      };
    case CLEAR_UPDATE_SYSTEM_USERS_STATE:
      return {
        loading: false,
        storeUpdateSystemUserResponse: "",
        error: "",
      };
    default:
      return state;
  }
};

export default updateSystemUserReducer;
