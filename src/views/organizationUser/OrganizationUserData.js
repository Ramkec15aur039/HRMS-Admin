/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import OrganizationUsers from "./OrganizationUsers";

/** **************************** Import API ****************************** */
import { getOrganizationUsers } from "../../api/list";

/** ***************************** Import Action ******************************** */
import { GetOrganizationUsers, GetAllOrganization } from "../../redux";

/** ***************************** Import Preloader ******************************** */
import Preloader from "../../assets/images/Preloader.gif";


const organizationUserData = (props) => {
  console.log("Map state to props from userDataResult:", props);
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [rowsPerPage] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPage, setApiPage] = useState(1);
  const [preloader, setPreLoader] = useState(false);

  const initialUserData = async () => {
    await props.GetOrganizationUsers().then((res) => {
      console.log("getUserResponse--->", res);
      if (res) {
        res.results.forEach((item) => {
          item.name = `${item.firstName}${item.middleName} ${item.lastName}`;
        });
        setOrganizationUsers(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
      } else {
        console.log("Response from dispatched get user action:", res);
      }
    });
  };
  useEffect(() => {
    initialUserData();
    props.GetAllOrganization();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPreLoader(props.preLoader);
  }, [props.preLoader]);
  /** *********************************Response Handler*************************************** */
  const responseHandler = (res) => {
    if (res) {
      if (res.code) {
        if (res.code === 400) {
          return false;
        }
        return false;
      }
      if (res.error) {
        return false;
      }
      return res;
    }
    return false;
  };

  // Pagination
  const nextPage = (currentPage) => {
    const sortBy = "createdAt:desc";
    setPreLoader(true);
    getOrganizationUsers({ currentPage, rowsPerPage, sortBy }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          item.name = `${item.firstName}${item.middleName} ${item.lastName}`;
          item.isActive = item.isActive === true ? "active" : "Not Active";
        });
        setOrganizationUsers(res.results);
        setTotalResults(res.totalResults);
        setCurrentPage(currentPage);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
      }
    });
  };

  // Get users for after delete request
  const getUsersAfterDelete = (currentPage) => {
    const sortBy = "createdAt:desc";
    currentPage = totalResults % rowsPerPage === 1 ? currentPage - 1 : currentPage;
    currentPage = currentPage === 0 ? currentPage + 1 : currentPage;
    setPreLoader(true);
    getOrganizationUsers({ currentPage, rowsPerPage, sortBy }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          item.name = `${item.firstName}${item.middleName} ${item.lastName}`;
          item.isActive = item.isActive === true ? "active" : "Not Active";
        });
        setOrganizationUsers(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };

  // Get users for after add user request
  const getUsersAfterAdd = async (currentPage) => {
    await props.GetOrganizationUsers().then((res) => {
      console.log("getUserResponse--->", res);
      if (res) {
        res.results.forEach((item) => {
          item.name = `${item.firstName}${item.middleName} ${item.lastName}`;
        });
        setOrganizationUsers(res.results);
        setTotalResults(res.totalResults);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
        setApiPage(res.page);
      } else {
        console.log("Response from dispatched get user action:", res);
      }
    });
  };

  // Get users for after update request
  const getUsersAfterUpdate = (currentPage) => {
    console.log("Current Page from update API:", currentPage);
    const sortBy = "createdAt:desc";
    setPreLoader(true);
    getOrganizationUsers({ currentPage, rowsPerPage, sortBy }).then((res) => {
      if (responseHandler(res)) {
        setPreLoader(false);
        res.results.forEach((item, index) => {
          item.name = `${item.firstName}${item.middleName} ${item.lastName}`;
          item.isActive = item.isActive === true ? "active" : "Not Active";
        });
        setOrganizationUsers(res.results);
        setTotalResults(res.totalResults);
        setApiPage(res.page);
        setTotalPages(res.totalPages);
        setCurrentPage(currentPage);
      }
    });
  };

  return (
    <div style={ { position: "relative" } }>
      {preloader ? (
        <div className="d-flex justify-content-center">
          <div
            style={ {
              position: "absolute",
              top: "50%",
              left: "45%",
              zIndex: "2",
            } }
          >
            <img
              src={ Preloader }
              alt="Preloader"
              className="img-fluid"
              width="80px"
              height="80px"
            />
          </div>
        </div>
      ) : null}
      <OrganizationUsers
        organizationUserData={ organizationUsers }
        totalResult={ totalResults }
        getUsersAfterDelete={ getUsersAfterDelete }
        getUsersAfterAdd={ getUsersAfterAdd }
        apiPage={ apiPage }
        pages={ totalPages }
        nextPage={ nextPage }
        currentPage={ currentPage }
        getApiUpdated={ getUsersAfterUpdate }
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  getOrganizationUsersResponse:
    state.getOrganizationUsers.storeGetOrganizationUsersResponse,
  getOrganizationUsersError: state.getOrganizationUsers.error,
  preLoader: state.getOrganizationUsers.loading,
});
const mapDispatchToProps = (dispatch) => ({
  GetOrganizationUsers: () => dispatch(GetOrganizationUsers()),
  GetAllOrganization: () => dispatch(GetAllOrganization()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(organizationUserData);
