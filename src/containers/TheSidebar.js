/** ****************************** Import libs *********************************** */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarBrand,
} from "@coreui/react";

/** ****************************** Import sidebar nav config *********************************** */
import navigation from "./_nav";

/** ****************************** Import Images *********************************** */
import sidebarLogo from "../assets/images/paradigam-sidebar-logo.png";
import sidebarLogoMinimized from "../assets/images/paradigam-sidebar-minimized.png";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.changeStateReducer.sidebarShow);

  return (
    <CSidebar
      show={ show }
      onShowChange={ (val) => dispatch({ type: "set", sidebarShow: val }) }
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={ sidebarLogo } alt="sidebarLog" className="c-sidebar-brand-full img-fluid" />
        <img src={ sidebarLogoMinimized } alt="sidebarLogoMinimized" className="c-sidebar-brand-minimized img-fluid" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={ navigation }
          components={ {
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          } }
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
