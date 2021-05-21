/** ****************************** Import libs *********************************** */
import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/home/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Settings",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Organization",
        to: "/home/organizations",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Organization Users",
        to: "/home/organizationUsers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "System Users",
        to: "/home/users",
      },
    ],
  },
];

export default _nav;
