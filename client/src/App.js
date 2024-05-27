import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./redux/auth";
import initializeApp from "./redux/init";
import { useDispatch } from "react-redux";
import { setAuth } from "./redux/authSlice";
const Layout = lazy(() => import("./containers/Layout"));
const Singin = lazy(() => import("./pages/Signin"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Signup = lazy(() => import("./pages/Signup"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = checkAuth();

function App() {
  const dispatch = useDispatch();
  if (token) {
    const payload = {
      isAuthenicated: true,
      user: JSON.parse(localStorage.user),
    };
    dispatch(setAuth(payload));
  }
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Singin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Layout />} />
          {/* <Route path="*" element={<Navigate to={token ? "/" : "/signin"} replace />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
