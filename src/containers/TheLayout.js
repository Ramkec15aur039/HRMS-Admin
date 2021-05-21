/** ****************************** Import libs *********************************** */
import React from "react";
import {
  TheSidebar,
  TheHeader,
  TheContent,
} from "./index";

const TheLayout = () => (
  <div className="c-app c-default-layout">
    <TheSidebar />
    <div className="c-wrapper">
      <TheHeader />
      <div className="c-body">
          <TheContent />
        </div>
    </div>
  </div>
);

export default TheLayout;
