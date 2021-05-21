/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  CLEAR_CREATE_ORGANIZATION_STATE,
} from "./createOrganizationTypes";
import { postOrganizationData } from "../../api/create";

import { ClearUpdateOrganizationState } from "..";

import "react-toastify/dist/ReactToastify.css";

export const CreateOrganizationRequest = () => ({
  type: CREATE_ORGANIZATION_REQUEST,
});
export const CreateOrganizationSuccess = (users) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  payload: users,
});
export const CreateOrganizationFailure = (error) => ({
  type: CREATE_ORGANIZATION_FAILURE,
  payload: error,
});
export const ClearCreateOrganizationStateSuccess = () => ({
  type: CLEAR_CREATE_ORGANIZATION_STATE,
});

export const CreateOrganization = (data) => async function (dispatch) {
  dispatch(CreateOrganizationRequest());
  return postOrganizationData(data)
    .then((res) => {
      if (!res.code) {
        dispatch(CreateOrganizationSuccess({ responseStatus: "success" }));
        dispatch(ClearUpdateOrganizationState());
        toast.success("Organization Created Successfully");
        return "success";
      }
      dispatch(CreateOrganizationFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const ClearCreateOrganizationState = (data, userId) => async function (dispatch) {
  dispatch(ClearCreateOrganizationStateSuccess());
};

