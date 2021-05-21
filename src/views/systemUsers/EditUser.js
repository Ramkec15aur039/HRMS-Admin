/** **************************** Import Libs ****************************** */
import React, { useState } from "react";
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
  CSelect,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

/** ***************************** Import Action ******************************** */
import { UpdateSystemUser } from "../../redux";

const EditUserForms = (props) => {
  const [values] = useState({ ...props.userData });

  /** *********************************Response Handler*************************************** */
  const responseHandler = (res) => {
    if (res) {
      if (res.code) {
        if (res.code === 400) {
          console.log(console.log(res.message));
          return false;
        }
        console.log("Bad Request");
        return false;
      } if (res.error) {
        console.log(res.error);
        return false;
      }
      return res;
    }
    return false;
  };

  const formiq = useFormik({
    initialValues: {
      firstName: values.firstName,
      lastName: values.lastName,
      personalEmail: values.personalEmail,
      workEmail: values.workEmail,
      professionalTitle: values.professionalTitle,
      password: values.password,
      telmediqNumber: values.telmediqNumber,
      mobileNumber: values.mobileNumber,
      role: values.role,
      street: values.street,
      city: values.city,
      state: values.state,
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      lastName: yup
        .string()
        .matches(/^[A-Za-z]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      personalEmail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      workEmail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      professionalTitle: yup
        .string()
        .required("Field should not be empty"),
      // password: yup
      //   .string()
      //   .required("Please Enter your password")
      //   .matches(
      //     "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
      //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
      //   ),
      telmediqNumber: yup
        .number()
        .typeError("That doesn't look like a phone number")
        .integer("A phone number can't include a decimal point")
        .required("Field should not be empty"),
      mobileNumber: yup
        .string()
        .required("Please Enter your password")
        .matches(
          "^(?=.*[0-9]).{10}$",
          "Enter Valid Mobile Number",
        ),
      street: yup.string().required("Field should not be empty"),
      city: yup.string().required("Field should not be empty"),
      state: yup.string().required("Field should not be empty"),
      role: yup
        .string()
        .required("Field should not be empty"),
    }),
    onSubmit: (userInputData) => {
      props.UpdateSystemUser(userInputData, props.userData.id).then((res) => {
        if (responseHandler(res)) {
          props.getUpdatedData();
        }
      });
      formiq.values.firstName = "";
      formiq.values.lastName = "";
      formiq.values.personalEmail = "";
      formiq.values.workEmail = "";
      formiq.values.professionalTitle = "";
      formiq.values.password = "";
      formiq.values.telmediqNumber = "";
      formiq.values.mobileNumber = "";
      formiq.values.role = "";
      formiq.values.street = "";
      formiq.values.city = "";
      formiq.values.state = "";
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
                      <CLabel htmlFor="company">First Name</CLabel>
                      <CInput
                        id="firstName"
                        className="inputFocus"
                        placeholder="Enter First Name"
                        name="firstName"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.firstName }
                      />
                      {formiq.errors.firstName ? (
                        <div className="text-danger">
                          {formiq.errors.firstName}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="vat">Last Name</CLabel>
                      <CInput
                        id="lastName"
                        className="inputFocus"
                        placeholder="Enter Last Name"
                        name="lastName"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.lastName }
                      />
                      {formiq.errors.lastName ? (
                        <div className="text-danger">
                          {formiq.errors.lastName}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Personal Email</CLabel>
                      <CInput
                        id="personalEmail"
                        className="inputFocus"
                        placeholder="Enter Personal Email"
                        name="personalEmail"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.personalEmail }
                      />
                      {formiq.errors.personalEmail ? (
                        <div className="text-danger">{formiq.errors.personalEmail}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Work Email</CLabel>
                      <CInput
                        id="workEmail"
                        className="inputFocus"
                        placeholder="Enter Work Email"
                        name="workEmail"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.workEmail }
                      />
                      {formiq.errors.workEmail ? (
                        <div className="text-danger">{formiq.errors.workEmail}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Professional Title</CLabel>
                      <CSelect
                        id="professionalTitle"
                        className="inputFocus"
                        placeholder="Enter Professional Title"
                        name="professionalTitle"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.professionalTitle }
                      >
                        <option defaultValue>{ formiq.values.professionalTitle }</option>
                        { formiq.values.professionalTitle !== "MD" ? <option>MD</option> : null }
                        { formiq.values.professionalTitle !== "DO" ? <option>DO</option> : null }
                        { formiq.values.professionalTitle !== "NP" ? <option>NP</option> : null }
                        { formiq.values.professionalTitle !== "PA" ? <option>PA</option> : null }
                      </CSelect>
                      {formiq.errors.professionalTitle ? (
                        <div className="text-danger">{formiq.errors.professionalTitle}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Password</CLabel>
                      <CInput
                        disabled
                        id="password"
                        className="inputFocus"
                        placeholder="Enter password"
                        name=""
                        onChange={ formiq.handleChange }
                        value={ formiq.values.password }
                      />
                      {formiq.errors.password ? (
                        <div className="text-danger">{formiq.errors.password}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="city">Telmedic Number</CLabel>
                      <CInput
                        id="telmediqNumber"
                        className="inputFocus"
                        placeholder="Telmediq Number"
                        name="telmediqNumber"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.telmediqNumber }
                      />
                      {formiq.errors.telmediqNumber ? (
                        <div className="text-danger">
                          {formiq.errors.telmediqNumber}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="postal-code">Mobile Number</CLabel>
                      <CInput
                        id="mobileNumber"
                        className="inputFocus"
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.mobileNumber }
                      />
                      {formiq.errors.mobileNumber ? (
                        <div className="text-danger">
                          {formiq.errors.mobileNumber}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="country">Role</CLabel>
                      <CSelect
                        id="role"
                        className="inputFocus"
                        placeholder="Role"
                        name="role"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.role }
                      >
                        { formiq.values.role !== "admin" ? <option>admin</option> : null }
                        { formiq.values.role !== "user" ? <option>user</option> : null }
                        <option defaultValue>{ formiq.values.role }</option>
                      </CSelect>
                      {formiq.errors.role ? (
                        <div className="text-danger">{formiq.errors.role}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="country">Street</CLabel>
                      <CInput
                        id="street"
                        className="inputFocus"
                        placeholder="Street"
                        name="street"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.street }
                      />
                      {formiq.errors.street ? (
                        <div className="text-danger">{formiq.errors.street}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="country">City</CLabel>
                      <CInput
                        id="city"
                        className="inputFocus"
                        placeholder="City"
                        name="city"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.city }
                      />
                      {formiq.errors.city ? (
                        <div className="text-danger">{formiq.errors.city}</div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="country">State</CLabel>
                      <CInput
                        id="state"
                        className="inputFocus"
                        placeholder="state"
                        name="state"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.state }
                      />
                      {formiq.errors.state ? (
                        <div className="text-danger">{formiq.errors.state}</div>
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
  updateSystemUserResponse: state.updateSystemUser.storeUpdateSystemUserResponse,
  updateSystemUserError: state.updateSystemUser.error,
  preLoader: state.updateSystemUser.loading,
});
const mapDispatchToProps = (dispatch) => ({
  UpdateSystemUser: (data, userId) => dispatch(UpdateSystemUser(data, userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditUserForms);
