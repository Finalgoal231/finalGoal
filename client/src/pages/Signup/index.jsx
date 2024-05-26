import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { Input } from "../Component/Input";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    bio: "Blockchain",
  });
  const base_url = process.env.REACT_APP_BASE_URL + "/api/auth";
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = useCallback(
    (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );

  const onChangeConfirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmit = () => {
    if (form.password === confirmPass) {
      axios
        .post(base_url + "/signup", form)
        .then(() => {
          NotificationManager.success(
            "Congratulations! Registered!",
            "Success"
          );
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch(() =>
          NotificationManager.error("Already Registered User!", "Error")
        );
    } else {
      NotificationManager.warning(
        "Password and confirm password must be equal!!!",
        "Warning"
      );
    }
  };
  return (
    <div className="min-h-screen bg-pic flex items-center">
      <NotificationContainer />
      <div className="card mx-auto w-[70%] opacity-90 shadow-xl">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-base-100 rounded-xl">
          <Logo />
          <div className="py-24 px-10 w-full">
            <h1 className="text-3xl text-center font-semibold mb-10 head">
              Sign Up
            </h1>
            <div className="mb-3">
              <Input
                type={"text"}
                name={"name"}
                value={form.name}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                name={"username"}
                value={form.username}
                onChange={handleChange}
              />
              <select
                value={form.bio}
                name="bio"
                className="w-full h-[52px] px-[12px] mb-4 text-gray-700 border border-gray-300 hover:border-gray-500 rounded-[3px] outline-none focus:border-2 focus:border-gray-700"
                onChange={handleChange}
              >
                <option value="Blockchain">Blockchain</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Designer">Designer</option>
              </select>
              <Input
                type={"password"}
                name={"password"}
                value={form.password}
                onChange={handleChange}
              />
              <Input
                type={"password"}
                name={"con_password"}
                value={confirmPass}
                onChange={onChangeConfirmPassword}
              />
              <div
                onClick={() => handleSubmit()}
                className="btn btn-primary w-full"
              >
                Sign Up
              </div>
              <div className="text-center mt-4">
                Already Registered?
                <Link to="/signin">
                  <span className="inline-block hover:text-primary underline hover:cursor-pointer mx-10">
                    Signin
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
