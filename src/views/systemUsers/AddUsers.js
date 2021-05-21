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
  CSelect,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

/** *************** API import ******************** */
import { getUserList } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateSystemUser } from "../../redux";

const AddUsers = (props) => {
  const [page] = React.useState(0);

  const formiq = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      personalEmail: "",
      workEmail: "",
      professionalTitle: "",
      password: "",
      telmediqNumber: "",
      mobileNumber: "",
      role: "",
      street: "",
      city: "",
      state: "",
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
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
      telmediqNumber: yup
        .number()
        .typeError("That doesn't look like a phone number")
        .integer("A phone number can't include a decimal point")
        .required("Field should not be empty"),
      mobileNumber: yup
        .string()
        .required("Please Enter your password")
        .matches("^(?=.*[0-9]).{10}$", "Enter Valid Mobile Number"),
      street: yup.string().required("Field should not be empty"),
      city: yup.string().required("Field should not be empty"),
      state: yup.string().required("Field should not be empty"),
      role: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (userInputDate) => {
      await props.CreateSystemUser(userInputDate).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
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
                        <div className="text-danger">
                          {formiq.errors.personalEmail}
                        </div>
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
                        <div className="text-danger">
                          {formiq.errors.workEmail}
                        </div>
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
                        <option value="">Choose</option>
                        <option>MD</option>
                        <option>DO</option>
                        <option>NP</option>
                        <option>PA</option>
                      </CSelect>
                      {formiq.errors.professionalTitle ? (
                        <div className="text-danger">
                          {formiq.errors.professionalTitle}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Password</CLabel>
                      <CInput
                        id="password"
                        className="inputFocus"
                        placeholder="Enter password"
                        name="password"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.password }
                      />
                      {formiq.errors.password ? (
                        <div className="text-danger">
                          {formiq.errors.password}
                        </div>
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
                        <option value="">Choose</option>
                        <option>admin</option>
                        <option>user</option>
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
                        <div className="text-danger">
                          {formiq.errors.street}
                        </div>
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
  createSystemUserResponse: state.createSystemUser.storeCreateSystemUserResponse,
  createUserError: state.createSystemUser.error,
  preLoader: state.createSystemUser.loading,
});
const mapDispatchToProps = (dispatch) => ({
  CreateSystemUser: (data) => dispatch(CreateSystemUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
