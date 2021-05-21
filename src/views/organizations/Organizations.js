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
import "react-toastify/dist/ReactToastify.css";

/** **************************** Import Utls ****************************** */
import Pagination from "../pagination/Pagination";
import Organization from "./Organization";
import EditOrganization from "./EditOrganization";
import AddOrganization from "./AddOrganization";

/** **************************** Import API ****************************** */
import { deleteOrganization } from "../../api/delete";

/** **************************** Import CSS ****************************** */
import "./organization.css";

/** **************************** Import actions ****************************** */
import { ClearUpdateOrganizationState, ClearCreateOrganizationState } from "../../redux";

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

const Organizations = (props) => {
  const [onClickRow, setOnClickRow] = useState(true);
  const data = props.organizationData;
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
        <CCol xl={ 12 }>
          <CCard>
            <CCardHeader>
              Organization
              <CButton
                color="success"
                className="buttonPosition"
                onClick={ () => setAddUserModel(!addUserModel) }
              >
                Add Organization
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={ data }
                fields={ [
                  { key: "organizationName", _classes: "font-weight-bold" },
                  "taxIdentificationNumber",
                  "contactNumber",
                  "organizationMail",
                  "organizationKeyPerson",
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

      {/** ***************** Model Add Organization ********************* */}
      {addUserModel ? (
        <CModal
          show={ addUserModel }
          onClose={ () => setAddUserModel(!addUserModel) }
          size="lg"
        >
          <CModalHeader closeButton style={ { backgroundColor: "#12ADBE", color: "white" } }>
            <CModalTitle>Add organization</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <AddOrganization
              getAddedData={ getApiForAdd }
            />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}

      {/** ***************** Model Edit Organization ********************* */}
      {large ? (
        <CModal
          show={ large }
          onClose={ () => setLarge(!large) }
          size="lg"
        >
          <CModalHeader style={ { backgroundColor: "#12ADBE", color: "white" } } closeButton>
            <CModalTitle>Update Organization</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <EditOrganization
              userData={ selectedUserData }
              getUpdatedData={ getApiForEdit }
            />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}

      {/** ********************* Model Delete Organization ************************ */}
      {warning ? (
        <CModal
          show={ warning }
          color="danger"
          onClose={ () => setWarning(!warning) }
          size="md"
        >
          <CModalHeader closeButton>
            <CModalTitle>Delete Organization</CModalTitle>
          </CModalHeader>
          <CModalBody>{modelStateDelete}</CModalBody>
          <CModalFooter>
            <CButton
              color="primary"
              onClick={ () => {
                setWarning(!warning);
                deleteOrganization(deleteId).then((res) => {
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

      {/** ***************** Model Organization on Row-Click ********************* */}
      {clickId ? (
        <CModal
          show={ clickId }
          onClose={ () => setClickId(!clickId) }
          size="lg"
        >
          <CModalHeader style={ { backgroundColor: "#12ADBE", color: "white" } } closeButton>
            <CModalTitle>
            Organization Id:
              {userId}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <Organization userId={ userId } />
          </CModalBody>
          <CModalFooter />
        </CModal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  updateOrganizationResponse: state.updateOrganization.storeUpdateOrganizationResponse,
  updateOrganizationError: state.updateOrganization.error,
  updateOrganizationPreLoader: state.updateOrganization.loading,
  createOrganizationResponse: state.createOrganization.storeCreateOrganizationResponse,
  createOrganizationError: state.createOrganization.error,
  createOrganizationPreLoader: state.createOrganization.loading,
});

const mapDispatchToProps = (dispatch) => ({
  ClearCreateOrganizationState: () => dispatch(ClearCreateOrganizationState()),
  ClearUpdateOrganizationState: () => dispatch(ClearUpdateOrganizationState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
