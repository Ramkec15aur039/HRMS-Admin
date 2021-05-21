/** **************************** Import Libs ****************************** */
import React from "react";

/** **************************** Import CSS ****************************** */
import "./Pagination.css";

export default function Pagination(props) {
  const pageLinks = [];
  for (let i = 1; i <= props.pages; i++) {
    const active = props.currentPage === i ? "active" : "";
    pageLinks.push(
      <li key={ i } className={ `pagination ${active}` } onClick={ () => props.nextPage(i) }>
        <span>{i}</span>
      </li>,
    );
  }

  return (

      <div className="text-right">
        <ul>
          {props.currentPage > 1 ? (
            <li
              className="pagination"
              onClick={ () => props.nextPage(props.currentPage - 1) }
            >
              <span className="customSpan">&laquo;</span>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages ? (
            <li
              className="pagination"
              onClick={ () => props.nextPage(props.currentPage + 1) }
            >
              <span className="customSpan">&raquo;</span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>

  );
}
