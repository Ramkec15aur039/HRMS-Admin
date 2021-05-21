const environmentList = [
  "http://localhost:5040/",
  "https://paradigm.herokuapp.com/", // develop    = 1
  "https://hrms-admin.staging.pacificmedicalgroup.org/api/", // staging    = 2 // local      = 0
];

const env = 0; // Place your environment number here

export const hostConfig = {
  WEB_URL: process.env.url,
  API_URL: `${environmentList[env]}v1/`,
};


