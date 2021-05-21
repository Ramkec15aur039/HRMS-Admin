/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILURE,
  CLEAR_UPDATE_ORGANIZATION_STATE,
} from "./updateOrganizationTypes";
import { updateOrganizationData } from "../../api/updates";

import "react-toastify/dist/ReactToastify.css";

export const UpdateOrganizationRequest = () => ({
  type: UPDATE_ORGANIZATION_REQUEST,
});
export const UpdateOrganizationSuccess = (users) => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
  payload: users,
});
export const UpdateOrganizationFailure = (error) => ({
  type: UPDATE_ORGANIZATION_FAILURE,
  payload: error,
});
export const ClearUpdateOrganizationStateSuccess = () => ({
  type: CLEAR_UPDATE_ORGANIZATION_STATE,
});

export const UpdateOrganization = (data, userId) => async function (dispatch) {
  dispatch(UpdateOrganizationRequest());
  return updateOrganizationData(data, userId)
    .then((res) => {
      if (!res.code && !res.error) {
        dispatch(UpdateOrganizationSuccess({ responseStatus: "success" }));
        toast.success("Organization Updated Successfully");
        return "success";
      }
      dispatch(UpdateOrganizationFailure(res.error));
      toast.error(res.message || res.error);
      return res.message || res.error;
    })
    .catch((err) => console.log("Catch Error:", err));
};

export const ClearUpdateOrganizationState = (data, userId) => async function (dispatch) {
  dispatch(ClearUpdateOrganizationStateSuccess());
};
