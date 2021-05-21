/** **************************** Import Types ****************************** */
import {
  GET_SYSTEM_USERS_REQUEST,
  GET_SYSTEM_USERS_SUCCESS,
  GET_SYSTEM_USERS_FAILURE,
} from "./getSystemUserTypes";

/** **************************** Import API ****************************** */
import { getUserList } from "../../api/list";

export const GetSystemUsersRequest = () => ({
  type: GET_SYSTEM_USERS_REQUEST,
});
export const GetSystemUsersSuccess = (users) => ({
  type: GET_SYSTEM_USERS_SUCCESS,
  payload: users,
});
export const GetSystemUsersFailure = (error) => ({
  type: GET_SYSTEM_USERS_FAILURE,
  payload: error,
});

export const GetSystemUser = (params) => async function (dispatch) {
  console.log("Current page parms:", params);
  const page = 0;
  const rowsPerPage = 5;
  const currentPage = page + 1;
  const sortBy = "createdAt:desc";
  dispatch(GetSystemUsersRequest());
  return getUserList({ currentPage, rowsPerPage, sortBy })
    .then((res) => {
      if (res.results) {
        dispatch(GetSystemUsersSuccess(res));
        return res;
      }

      dispatch(GetSystemUsersFailure(res.message));
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};
