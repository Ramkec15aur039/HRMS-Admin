/** **************************** Import Libs ****************************** */
import React, { useState, useEffect } from "react";
import {
  CCard, CCardBody, CCol, CRow,
} from "@coreui/react";

/** **************************** Import API ****************************** */
import { getOrganizationById } from "../../api/list";

const Organization = (props) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    getOrganizationById(props.userId).then((res) => {
      res.forEach((item) => {
        item.isActive = item.isActive === true ? "active" : "Not Active";
      });
      setUsersData(res);
    });
    // eslint-disable-next-line
  }, [props.userId]);
  const user = usersData.find((user) => user.id.toString() === props.userId);
  const userDetails = user
    ? Object.entries(user)
    : [
      [
        "id",
          <span>
            No Records Found
          </span>,
      ],
    ];

  return (
    <CRow>
      <CCol lg={ 12 }>
        <CCard>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {userDetails.map(([key, value], index) => (key !== "id"
                    && key !== "isAdmin"
                    && key !== "isActive"
                    && key !== "createdBy"
                    && key !== "updatedBy"
                    && key !== "location" ? ( // Conditional mapping
                    <tr key={ index.toString() }>
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  ) : null))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Organization;
