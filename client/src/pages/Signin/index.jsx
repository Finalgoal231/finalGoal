/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Logo from "../../components/Logo";
import { signin } from "../../redux/authSlice";
import { Input } from "../Component/Input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = useCallback(
    (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signin(form))
        .then((result) => {
          console.log(result);
          if (result.payload.status === 401) {
            NotificationManager.warning("Password incorrectly", "WARNING");
          } else if (result.payload.status === 404) {
            NotificationManager.info("Not Registered User", "WARNING");
          } else {
            NotificationManager.success(`Welcome !!!`, "SUCCESS");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1500);
          }
        })
        .catch(() => {
          NotificationManager.error("Network Error", "ERROR");
        });
    },
    [form]
  );
  return (
    <div className="min-h-screen bg-pic flex items-center">
      <NotificationContainer />
      <div className="card mx-auto w-[70%] opacity-90 shadow-xl">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-base-100 rounded-xl">
          <Logo />
          <div className="py-24 px-10 w-full">
            <h1 className="text-3xl text-center font-semibold mb-10 head">
              Sign In
            </h1>
            <div className="mb-3">
              <form
                onSubmitCapture={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-4">
                  <Input
                    type={"text"}
                    name={"username"}
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type={"password"}
                    name={"password"}
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className={"btn btn-primary w-full"}>
                  Signin
                </button>
                <div className="text-center mt-4">
                  Are you new here?
                  <Link to="/signup">
                    <span className="inline-block hover:text-primary underline hover:cursor-pointer transition duration-200 mx-10">
                      Signup
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
