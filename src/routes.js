/** **************************** Import Libs ****************************** */
import React from "react";

/** **************************** Import Components ****************************** */
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Users = React.lazy(() => import("./views/systemUsers/UserData"));
const User = React.lazy(() => import("./views/systemUsers/User"));
const Organizations = React.lazy(() => import("./views/organizations/OrganizationData"));
const Organization = React.lazy(() => import("./views/organizations/Organization"));
const OrganizationUsers = React.lazy(() => import("./views/organizationUser/OrganizationUserData"));
const OrganizationUser = React.lazy(() => import("./views/organizationUser/OrganizationUser"));


const routes = [
  { path: "/home", exact: true, name: "Home" },
  { path: "/home/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/home/users", exact: true, name: "System Users", component: Users,
  },
  {
    path: "/home/users/:id", exact: true, name: "User Details", component: User,
  },
  {
    path: "/home/organizations", exact: true, name: "Organizations", component: Organizations,
  },
  {
    path: "/home/organizations/:id", exact: true, name: "Organization Details", component: Organization,
  },
  {
    path: "/home/organizationUsers", exact: true, name: "Organization Users", component: OrganizationUsers,
  },
  {
    path: "/home/organizationUsers/:id", exact: true, name: "Organization Users Details", component: OrganizationUser,
  },
];

export default routes;
