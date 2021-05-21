/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  UPDATE_ORGANIZATION_USERS_REQUEST,
  UPDATE_ORGANIZATION_USERS_SUCCESS,
  UPDATE_ORGANIZATION_USERS_FAILURE,
  CLEAR_UPDATE_ORGANIZATION_USERS_STATE,
} from "./updateOrganizationUsersTypes";
import { updateOrganizationUsersData } from "../../api/updates";
import "react-toastify/dist/ReactToastify.css";

export const UpdateOrganizationUsersRequest = () => ({
  type: UPDATE_ORGANIZATION_USERS_REQUEST,
});
export const UpdateOrganizationUsersSuccess = (users) => ({
  type: UPDATE_ORGANIZATION_USERS_SUCCESS,
  payload: users,
});
export const UpdateOrganizationUsersFailure = (error) => ({
  type: UPDATE_ORGANIZATION_USERS_FAILURE,
  payload: error,
});
export const ClearUpdateOrganizationUsersStateSuccess = () => ({
  type: CLEAR_UPDATE_ORGANIZATION_USERS_STATE,
});

export const UpdateOrganizationUsers = (data, userId) => async function (dispatch) {
  dispatch(UpdateOrganizationUsersRequest());
  return updateOrganizationUsersData(data, userId)
    .then((res) => {
      console.log("Update Organization Users Response:", res);
      if (res) {
        dispatch(UpdateOrganizationUsersSuccess({ responseStatus: "success" }));
        toast.success("Organization Users Updated Successfully");
        return "success";
      }
      dispatch(UpdateOrganizationUsersFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const ClearUpdateOrganizationUsersState = (data, userId) => async function (dispatch) {
  dispatch(ClearUpdateOrganizationUsersStateSuccess());
};
