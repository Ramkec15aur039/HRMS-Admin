/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  UPDATE_SYSTEM_USERS_REQUEST,
  UPDATE_SYSTEM_USERS_SUCCESS,
  UPDATE_SYSTEM_USERS_FAILURE,
  CLEAR_UPDATE_SYSTEM_USERS_STATE,
} from "./updateSystemUserTypes";
import { updateUserData } from "../../api/updates";
import "react-toastify/dist/ReactToastify.css";

export const UpdateSystemUsersRequest = () => ({
  type: UPDATE_SYSTEM_USERS_REQUEST,
});
export const UpdateSystemUsersSuccess = (users) => ({
  type: UPDATE_SYSTEM_USERS_SUCCESS,
  payload: users,
});
export const UpdateSystemUsersFailure = (error) => ({
  type: UPDATE_SYSTEM_USERS_FAILURE,
  payload: error,
});
export const ClearUpdateSystemUsersStateSuccess = () => ({
  type: CLEAR_UPDATE_SYSTEM_USERS_STATE,
});

export const UpdateSystemUser = (data, userId) => async function (dispatch) {
  dispatch(UpdateSystemUsersRequest());
  return updateUserData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(UpdateSystemUsersSuccess({ responseStatus: "success" }));
        toast.success("User Updated Successfully");
        return "success";
      }
      dispatch(UpdateSystemUsersFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    }).catch((err) => console.log("Catch Error:", err));
};

export const ClearUpdateSystemUsersState = (data, userId) => async function (dispatch) {
  dispatch(ClearUpdateSystemUsersStateSuccess());
};
