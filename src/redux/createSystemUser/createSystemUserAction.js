/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  CREATE_SYSTEM_USERS_REQUEST,
  CREATE_SYSTEM_USERS_SUCCESS,
  CREATE_SYSTEM_USERS_FAILURE,
  CLEAR_CREATE_SYSTEM_USERS_STATE,
} from "./createSystemUserTypes";
import { postUserData } from "../../api/create";
import "react-toastify/dist/ReactToastify.css";

export const CreateSystemUsersRequest = () => ({
  type: CREATE_SYSTEM_USERS_REQUEST,
});
export const CreateSystemUsersSuccess = (users) => ({
  type: CREATE_SYSTEM_USERS_SUCCESS,
  payload: users,
});
export const CreateSystemUsersFailure = (error) => ({
  type: CREATE_SYSTEM_USERS_FAILURE,
  payload: error,
});
export const ClearCreateSystemUsersStateSuccess = () => ({
  type: CLEAR_CREATE_SYSTEM_USERS_STATE,
});

export const CreateSystemUser = (data) => async function (dispatch) {
  dispatch(CreateSystemUsersRequest());
  return postUserData(data)
    .then((res) => {
      if (!res.code) {
        dispatch(CreateSystemUsersSuccess({ responseStatus: "success" }));
        toast.success("User Created Successfully");
        return "success";
      }
      dispatch(CreateSystemUsersFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const ClearCreateSystemUsersState = (data, userId) => async function (dispatch) {
  dispatch(ClearCreateSystemUsersStateSuccess());
};

