/** **************************** Import Types ****************************** */
import { toast } from "react-toastify";
import {
  CREATE_ORGANIZATION_USERS_REQUEST,
  CREATE_ORGANIZATION_USERS_SUCCESS,
  CREATE_ORGANIZATION_USERS_FAILURE,
  CLEAR_CREATE_ORGANIZATION_USERS_STATE,
} from "./createOrganizationUsersTypes";
import { postOrganizationUserData } from "../../api/create";
import "react-toastify/dist/ReactToastify.css";

export const CreateOrganizationUsersRequest = () => ({
  type: CREATE_ORGANIZATION_USERS_REQUEST,
});
export const CreateOrganizationUsersSuccess = (users) => ({
  type: CREATE_ORGANIZATION_USERS_SUCCESS,
  payload: users,
});
export const CreateOrganizationUsersFailure = (error) => ({
  type: CREATE_ORGANIZATION_USERS_FAILURE,
  payload: error,
});

export const ClearCreateOrganizationUsersStateSuccess = () => ({
  type: CLEAR_CREATE_ORGANIZATION_USERS_STATE,
});

export const CreateOrganizationUsers = (data) => async function (dispatch) {
  dispatch(CreateOrganizationUsersRequest());
  return postOrganizationUserData(data)
    .then((res) => {
      if (res) {
        dispatch(CreateOrganizationUsersSuccess({ responseStatus: "success" }));
        toast.success("Organization Users Created Successfully");
        return "success";
      }
      dispatch(CreateOrganizationUsersFailure(res.message));
      toast.error(res.message);
      return res.message;
    }).catch((err) => console.log("Catch Error:", err));
};

export const ClearCreateOrganizationUsersState = (data, userId) => async function (dispatch) {
  dispatch(ClearCreateOrganizationUsersStateSuccess());
};

