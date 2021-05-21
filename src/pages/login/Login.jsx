/** **************************** Import Packages ****************************** */
import React from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

/** ********************************* CSS ************************************* */
import "./login.css";

/** ***************************** Import Action ******************************** */
import { LoginUser } from "../../redux";

/** ***************************** Import Images ******************************** */
import LoginLogo from "../../assets/images/login_logo.png";


const Login = (props) => {
  const formiq = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .strict()
        .email("Enter valid email")
        .lowercase("Email must be lowercase"),
      password: yup
        .string()
        .required("Password is required")
        .min(5, "Minimum 5 characters is required"),
    }),
    onSubmit: (userInputDate) => {
      props.LoginUser(userInputDate);
      formiq.values.email = "";
      formiq.values.password = "";
    },
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-main">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4" className="jumbotron login">
                    <div className="row w-26">
                      <div className="col-12 mb-4 text-center">
                        <img src={ LoginLogo } className="img-fluid" width="300px" height="100px" alt="loginLogo" />
                      <h1 className="h1" style={ { color: "#4ab7c3", marginTop: "0.5rem" } }>Paradigm</h1>
                      </div>
                    </div>
                  <CForm autoComplete="off">
                    <CInputGroup>
                      <CInput
                        type="text"
                        placeholder="Enter your email"
                        className="aa"
                        name="email"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.email }
                      />
                    </CInputGroup>
                    {formiq.errors.email ? (
                      <div className="text-danger">{formiq.errors.email}</div>
                    ) : null}
                    <CInputGroup className="mt-4">
                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ formiq.handleChange }
                        value={ formiq.values.password }
                      />
                    </CInputGroup>
                    {formiq.errors.password ? (
                      <div className="text-danger">
                        {formiq.errors.password}
                      </div>
                    ) : null}
                    <CRow>
                      <CCol xs="12">
                        <CButton
                          color="primary"
                          onClick={ formiq.handleSubmit }
                          className="px-4"
                          className="login-button mt-4"
                        >
                          {props.preLoader ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm ml-2"
                                role="status"
                                aria-hidden="false"
                              />
                              <span className="sr-only">Loading...</span>
                            </>
                          ) : (
                            "Login"
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loginResponse: state.login.storeLoginResponse,
  loginError: state.login.error,
  preLoader: state.login.loading,
});
const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data) => dispatch(LoginUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
