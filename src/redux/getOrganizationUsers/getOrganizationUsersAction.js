/** **************************** Import Types ****************************** */
import {
  GET_ORGANIZATION_USERS_REQUEST,
  GET_ORGANIZATION_USERS_SUCCESS,
  GET_ORGANIZATION_USERS_FAILURE,
} from "./getOrganizationUsersTypes";

/** **************************** Import API ****************************** */
import { getOrganizationUsers } from "../../api/list";

export const GetOrganizationUsersRequest = () => ({
  type: GET_ORGANIZATION_USERS_REQUEST,
});
export const GetOrganizationUsersSuccess = (users) => ({
  type: GET_ORGANIZATION_USERS_SUCCESS,
  payload: users,
});
export const GetOrganizationUsersFailure = (error) => ({
  type: GET_ORGANIZATION_USERS_FAILURE,
  payload: error,
});

export const GetOrganizationUsers = (params) => async function (dispatch) {
  console.log("Current page parms:", params);
  const page = 0;
  const rowsPerPage = 5;
  const currentPage = page + 1;
  const sortBy = "createdAt:desc";
  dispatch(GetOrganizationUsersRequest());
  return getOrganizationUsers({ currentPage, rowsPerPage, sortBy })
    .then((res) => {
      if (res.results) {
        dispatch(GetOrganizationUsersSuccess(res));
        return res;
      }

      dispatch(GetOrganizationUsersFailure(res.message));
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};
