import axios from "axios";
import { setAuth } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const checkAuth = (dispatch) => {
  // const dispatch = useDispatch();
  /*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "signin",
    "forgot-password",
    "signup",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/signin";
    return;
  } else {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TOKEN}`;
    axios.interceptors.request.use(
      function (config) {
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add("loading-indicator");
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      function (response) {
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
      }
    );
    return TOKEN;
  }
};

export default checkAuth;
