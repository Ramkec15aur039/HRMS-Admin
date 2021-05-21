/** **************************** Import Libs ****************************** */
import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

/** *************** API import ******************** */
import { getUserList } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateOrganization } from "../../redux";

const AddOrganization = (props) => {
  const [page] = React.useState(0);

  const formiq = useFormik({
    initialValues: {
      organizationName: "",
      taxIdentificationNumber: "",
      organizationKeyPerson: "",
      organizationAddress: "",
      contactNumber: "",
      remittanceAddress: "",
      mailingAddress: "",
      organizationMail: "",
    },
    validationSchema: yup.object({
      organizationName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      taxIdentificationNumber: yup
        .string()
        .required("Please Enter tax Identification Number")
        .matches("^(?=.*[0-9]).{8,}$", "Enter Valid tax Identification Number"),
      organizationKeyPerson: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      organizationAddress: yup
        .string()
        .required("Field should not be empty"),
      contactNumber: yup
        .string()
        .required("Please Enter Contact Number")
        .matches("^(?=.*[0-9]).{10}$", "Enter Valid tax Contact Number"),
      remittanceAddress: yup.string().required("Field should not be empty"),
      mailingAddress: yup.string().required("Field should not be empty"),
      organizationMail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
    }),
    onSubmit: async (userInputDate) => {
      await props.createOrganization(userInputDate).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.organizationName = "";
    },
  });

  return (
    <>
      <CRow>
        <CCol lg="12" xs="12" sm="6">
          <CCard>
            <CCardBody>
              <CForm autoComplete="off">
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Organization Name</CLabel>
                      <CInput
                        id="organizationName"
                        className="inputFocus"
                        placeholder="Enter Organization Name"
                        name="organizationName"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.organizationName }
                      />
                      {formiq.errors.organizationName ? (
                        <div className="text-danger">
                          {formiq.errors.organizationName}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Tax Identification Number</CLabel>
                      <CInput
                        id="taxIdentificationNumber"
                        className="inputFocus"
                        placeholder="Enter Tax Identification Number"
                        name="taxIdentificationNumber"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.taxIdentificationNumber }
                      />
                      {formiq.errors.taxIdentificationNumber ? (
                        <div className="text-danger">
                          {formiq.errors.taxIdentificationNumber}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Organization Key Person</CLabel>
                      <CInput
                        id="organizationKeyPerson"
                        className="inputFocus"
                        placeholder="Enter Organization Key Person Name"
                        name="organizationKeyPerson"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.organizationKeyPerson }
                      />
                      {formiq.errors.organizationKeyPerson ? (
                        <div className="text-danger">
                          {formiq.errors.organizationKeyPerson}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Organization Address</CLabel>
                      <CInput
                        id="organizationAddress"
                        className="inputFocus"
                        placeholder="Enter Organization Address"
                        name="organizationAddress"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.organizationAddress }
                      />
                      {formiq.errors.organizationAddress ? (
                        <div className="text-danger">
                          {formiq.errors.organizationAddress}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Contact Number</CLabel>
                      <CInput
                        id="contactNumber"
                        className="inputFocus"
                        placeholder="Enter Contact Number"
                        name="contactNumber"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.contactNumber }
                      />
                      {formiq.errors.contactNumber ? (
                        <div className="text-danger">
                          {formiq.errors.contactNumber}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Remittance Address</CLabel>
                      <CInput
                        id="remittanceAddress"
                        className="inputFocus"
                        placeholder="Enter Remittance Address"
                        name="remittanceAddress"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.remittanceAddress }
                      />
                      {formiq.errors.remittanceAddress ? (
                        <div className="text-danger">
                          {formiq.errors.remittanceAddress}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Mailing Address</CLabel>
                      <CInput
                        id="mailingAddress"
                        className="inputFocus"
                        placeholder="Enter Mailing Address"
                        name="mailingAddress"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.mailingAddress }
                      />
                      {formiq.errors.mailingAddress ? (
                        <div className="text-danger">
                          {formiq.errors.mailingAddress}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="company">Organization Mail</CLabel>
                      <CInput
                        id="organizationMail"
                        className="inputFocus"
                        placeholder="Enter Organization Mail"
                        name="organizationMail"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.organizationMail }
                      />
                      {formiq.errors.organizationMail ? (
                        <div className="text-danger">
                          {formiq.errors.organizationMail}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CButton
                  onClick={ formiq.handleSubmit }
                  type="submit"
                  style={ { backgroundColor: "#12ADBE", color: "white" } }
                >
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = (state) => ({
  createOrganizationResponse: state.createOrganization.storeCreateOrganizationResponse,
  createOrganizationError: state.createOrganization.error,
  preLoader: state.createOrganization.loading,
});
const mapDispatchToProps = (dispatch) => ({
  createOrganization: (data) => dispatch(CreateOrganization(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
