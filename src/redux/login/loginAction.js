/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  LOGIN_USERS_REQUEST,
  LOGIN_USERS_SUCCESS,
  LOGIN_USERS_FAILURE,
} from "./loginTypes";
import { postLoginRequestData } from "../../api/create";
import "react-toastify/dist/ReactToastify.css";

export const LoginUsersRequest = () => ({
  type: LOGIN_USERS_REQUEST,
});
export const LoginUsersSuccess = (users) => ({
  type: LOGIN_USERS_SUCCESS,
  payload: users,
});
export const LoginUsersFailure = (error) => ({
  type: LOGIN_USERS_FAILURE,
  payload: error,
});

export const LoginUser = (data) => async function (dispatch) {
  dispatch(LoginUsersRequest());
  await postLoginRequestData(data)
    .then((res) => {
      if (!res.error) {
        dispatch(LoginUsersSuccess({ responseStatus: "success" }));
        toast.success("Logged in Successfully");
        setTimeout(() => { window.location.href = "/home/dashboard"; }, 3000);
      } else {
        dispatch(LoginUsersFailure(res.error));
        toast.error(res.error);
      }
    }).catch((err) => console.log("Catch Error:", err));
};
