/** **************************** Import Libs ****************************** */
import React, { useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import * as BoxIcon from "react-icons/bi";
import * as RemixIcon from "react-icons/ri";
import { connect } from "react-redux";

/** **************************** Import Utls ****************************** */
import Pagination from "../pagination/Pagination";
import User from "./User";
import EditUserForms from "./EditUser";
import AddUsers from "./AddUsers";

/** **************************** Import API ****************************** */
import { deleteUser } from "../../api/delete";

/** **************************** Import CSS ****************************** */
import "./Users.css";

/** **************************** Import actions ****************************** */
import { ClearUpdateSystemUsersState, ClearCreateSystemUsersState } from "../../redux";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const Users = (props) => {
  const [onClickRow, setOnClickRow] = useState(true);
  const data = props.userData;
  const [warning, setWarning] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [modelStateDelete, setModelStateDelete] = useState("");
  const [userId, setUserId] = useState("");
  const [clickId, setClickId] = useState(false);
  const [large, setLarge] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [addUserModel, setAddUserModel] = useState(false);

  /** *********************************Response Handler*************************************** */
  const responseHandler = (res) => {
    if (res) {
      if (res.code) {
        if (res.code === 400) {
          return false;
        }
        return false;
      } if (res.error) {
        return false;
      }
      return res;
    }
    return false;
  };


  const getApiForAdd = () => {
    props.getUsersAfterAdd(props.apiPage);
    setAddUserModel(false);
  };

  const getApiForEdit = () => {
    props.getApiUpdated(props.apiPage);
    setLarge(false);
  };

  const getApiDelete = () => {
    props.getUsersAfterDelete(props.apiPage);
    setWarning(false);
  };

  return (
    <>
      <CRow>
        <CCol xl={ 12 } className="users-main">
          <CCard>
            <CCardHeader>
              Users
              <CButton
                color="success"
                className="buttonPosition"
                onClick={ () => setAddUserModel(!addUserModel) }
              >
                Add User
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={ data }
                fields={ [
                  { key: "name", _classes: "font-weight-bold" },
                  "role",
                  "workEmail",
                  "personalEmail",
                  "createdAt",
                  { key: "Actions", _classes: "action-Padding" },
                ] }
                hover
                striped
                itemsPerPage={ 5 }
                onRowClick={ (items) => (onClickRow ? (setUserId(items.id), setClickId(true)) : null) }
                clickableRows
                scopedSlots={ {
                  status: (item) => (
                    <td>
                      <CBadge color={ getBadge(item.status) }>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  Actions: (item, index) => (
                    <td>
                      <CButton
                        color="success"
                        onClick={ () => {
                          setSelectedUserData(item);
                          setLarge(!large);
                        } }
                        onMouseEnter={ () => setOnClickRow(false) }
                        onMouseLeave={ () => setOnClickRow(true) }
                        className="customPadding"
                      >
                        <BoxIcon.BiEdit size={ 20 } />
                      </CButton>

                      <CButton
                        onClick={ () => {
                          setModelStateDelete(
                            "Are you sure want to delete!!!",
                          );
                          setWarning(true);
                          setDeleteId(item.id);
                        } }
                        onMouseEnter={ () => setOnClickRow(false) }
                        onMouseLeave={ () => setOnClickRow(true) }
                        color="danger"
                      >
                        <RemixIcon.RiDeleteBin6Line size={ 20 } />
                      </CButton>
                    </td>
                  ),
                } }
              />
              {props.totalResult > 5 ? (
                <Pagination
                  pages={ props.pages }
                  nextPage={ props.nextPage }
                  currentPage={ props.currentPage }
                />
              ) : (
                ""
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/** ***************** Model Add User ********************* */}
      {addUserModel ? (
        <CModal
          show={ addUserModel }
          onClose={ () => setAddUserModel(!addUserModel) }
          size="lg"
        >
          <CModalHeader closeButton style={ { backgroundColor: "#12ADBE", color: "white" } }>
            <CModalTitle>Add User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <AddUsers
              getAddedData={ getApiForAdd }
            />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}

      {/** ***************** Model Edit User ********************* */}
      {large ? (
        <CModal
          show={ large }
          onClose={ () => setLarge(!large) }
          size="lg"
        >
          <CModalHeader style={ { backgroundColor: "#12ADBE", color: "white" } } closeButton>
            <CModalTitle>Update User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <EditUserForms
              userData={ selectedUserData }
              getUpdatedData={ getApiForEdit }
            />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}

      {/** ********************* Model Delete User ************************ */}
      {warning ? (
        <CModal
          show={ warning }
          color="danger"
          onClose={ () => setWarning(!warning) }
          size="md"
        >
          <CModalHeader closeButton>
            <CModalTitle>Delete User</CModalTitle>
          </CModalHeader>
          <CModalBody>{modelStateDelete}</CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={ () => {
                setWarning(!warning);
                deleteUser(deleteId).then((res) => {
                  if (responseHandler(res)) {
                    getApiDelete();
                  }
                });
                setDeleteId("");
              } }
            >
              Yes
            </CButton>
            <CButton
              color="secondary"
              onClick={ () => {
                setWarning(!warning);
                setDeleteId("");
              } }
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      ) : null}

      {/** ***************** Model User on Row-Click ********************* */}
      {clickId ? (
        <CModal
          show={ clickId }
          onClose={ () => setClickId(!clickId) }
          size="lg"
        >
          <CModalHeader style={ { backgroundColor: "#12ADBE", color: "white" } } closeButton>
            <CModalTitle>
              User Id:
              {userId}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <User userId={ userId } />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  updateSystemUserResponse: state.updateSystemUser.storeUpdateSystemUserResponse,
  updateSystemUserError: state.updateSystemUser.error,
  updateSystemUserPreLoader: state.updateSystemUser.loading,
  createSystemUserResponse: state.createSystemUser.storeCreateSystemUserResponse,
  createSystemUserError: state.createSystemUser.error,
  createSystemUserPreLoader: state.createSystemUser.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ClearCreateSystemUsersState: () => dispatch(ClearCreateSystemUsersState()),
  ClearUpdateSystemUsersState: () => dispatch(ClearUpdateSystemUsersState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
