/** **************************** Import Types ****************************** */
import {
  GET_ALL_ORGANIZATION_REQUEST,
  GET_ALL_ORGANIZATION_SUCCESS,
  GET_ALL_ORGANIZATION_FAILURE,
} from "./getAllOrganizationsTypes";

/** **************************** Import API ****************************** */
import { getAllOrganizations } from "../../api/list";

export const GetAllOrganizationRequest = () => ({
  type: GET_ALL_ORGANIZATION_REQUEST,
});
export const GetAllOrganizationSuccess = (users) => ({
  type: GET_ALL_ORGANIZATION_SUCCESS,
  payload: users,
});
export const GetAllOrganizationFailure = (error) => ({
  type: GET_ALL_ORGANIZATION_FAILURE,
  payload: error,
});

export const GetAllOrganization = (params) => async function (dispatch) {
  console.log("Current page parms:", params);
  const page = 0;
  const rowsPerPage = 5;
  const currentPage = page + 1;
  const sortBy = "createdAt:desc";
  dispatch(GetAllOrganizationRequest());
  return getAllOrganizations({ currentPage, rowsPerPage, sortBy })
    .then((res) => {
      if (res.results) {
        dispatch(GetAllOrganizationSuccess(res));
        return res;
      }

      dispatch(GetAllOrganizationFailure(res.message));
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};
