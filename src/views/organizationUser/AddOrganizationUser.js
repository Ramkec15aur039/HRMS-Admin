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
import MultiSelect from "../multiSelectInput/MultiSelect";

/** *************** API import ******************** */
import { getUserList } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { CreateOrganizationUsers } from "../../redux";

const AddOrganizationUser = (props) => {
  const [page] = React.useState(0);
  const options = props.getAllOrganizationsResponse.results.map((val) => (
    { value: val.id, label: val.organizationName }
  ));


  const formiq = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      orgIds: [],
      workEmail: "",
      employmentStatus: "",
      password: "",
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
      middleName: yup
        .string()
        .matches(/^[A-Za-z]*$/, "Please enter valid name"),
      lastName: yup
        .string()
        .matches(/^[A-Za-z]*$/, "Please enter valid name")
        .required("Field should not be empty"),
      orgIds: yup
        .array()
        .required("Field should not be empty"),
      workEmail: yup
        .string()
        .required("Field should not be empty")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      employmentStatus: yup
        .string()
        .required("Field should not be empty"),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ),
      mobileNumber: yup
        .string()
        .required("Please Enter your password")
        .matches("^(?=.*[0-9]).{10}$", "Enter Valid Mobile Number"),
      street: yup.string().required("Field should not be empty"),
      city: yup.string().required("Field should not be empty"),
      state: yup.string().required("Field should not be empty"),
      role: yup.string().required("Field should not be empty"),
    }),
    onSubmit: async (userInputData) => {
      await props.CreateOrganizationUsers(userInputData).then((res) => {
        if (res === "success") {
          const currentPage = page + 1;
          getUserList(currentPage);
          props.getAddedData();
        } else {
          props.getAddedData();
        }
      });
      formiq.values.firstName = "";
      formiq.values.middleName = "";
      formiq.values.lastName = "";
      formiq.values.orgIds = "";
      formiq.values.workEmail = "";
      formiq.values.employmentStatus = "";
      formiq.values.password = "";
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
                      <CLabel htmlFor="vat">Middle Name</CLabel>
                      <CInput
                        id="middleName"
                        className="inputFocus"
                        placeholder="Enter Middle Name"
                        name="middleName"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.middleName }
                      />
                      {formiq.errors.middleName ? (
                        <div className="text-danger">
                          {formiq.errors.middleName}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
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
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Organization Id</CLabel>
                      <MultiSelect
                        className="input"
                        onChange={ (val) => {
                          const data = [];
                          console.log("MultiSelect values:", val);
                          val.forEach((e) => data.push(e.value));
                          return formiq.setFieldValue("orgIds", data);
                        } }
                        value={ formiq.values.orgIds }
                        options={ options }
                      />
                      {formiq.errors.orgIds ? (
                        <div className="text-danger">
                          {formiq.errors.orgIds}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
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
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="street">Employment Status</CLabel>
                      <CSelect
                        id="employmentStatus"
                        className="inputFocus"
                        placeholder="Enter Employment Status"
                        name="employmentStatus"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.employmentStatus }
                      >
                        <option value="">Choose</option>
                        <option>active</option>
                        <option>inactive</option>
                      </CSelect>
                      {formiq.errors.employmentStatus ? (
                        <div className="text-danger">
                          {formiq.errors.employmentStatus}
                        </div>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0">
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
                        <option>organizationUser</option>
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
  createOrganizationUsersResponse: state.createOrganizationUsers.storeCreateOrganizationUsersResponse,
  createOrganizationUsersError: state.createOrganizationUsers.error,
  createOrganizationUsersPreLoader: state.createOrganizationUsers.loading,
  getAllOrganizationsResponse: state.getAllOrganizations.storeGetAllOrganizationResponse,
  getAllOrganizationsError: state.getAllOrganizations.error,
  getAllOrganizationsPreLoader: state.getAllOrganizations.loading,
});

const mapDispatchToProps = (dispatch) => ({
  CreateOrganizationUsers: (data) => dispatch(CreateOrganizationUsers(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddOrganizationUser);
