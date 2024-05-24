/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { requestServer } from "../utils/requestServer";

import Logo from "../components/Logo";
import ErrorText from "../components/Typography/ErrorText";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    bio: "Frontend Engineer",
  });
  const [confirmPass, setConfirmPass] = useState("");
  // console.log(confirmPass);
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (form.password !== confirmPass) {
        alert("Incorrect password");
      } else {
        setLoading(true);
        const res = await requestServer("post", "/api/auth/signup", form);
        if (res.status === 200) {
          alert(res.data.msg);
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
          setLoading(false);
        } else {
          alert("Can not signup.");
          setLoading(false);
        }
      }
    },
    [form, confirmPass]
  );

  return (
    <div className="min-h-screen bg-pic flex items-center">
      <div className="card mx-auto w-[70%] opacity-90 shadow-xl">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-base-100 rounded-xl">
          <Logo />
          <div className="py-24 px-10 w-full">
            <h1 className="text-3xl text-center font-semibold mb-2">Sign Up</h1>
            {loading === true ? (
              <>Loading</>
            ) : (
              <div className="mb-3">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Your Name is here"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Your Username is here"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <select name="bio" value={form.bio} onChange={handleChange}>
                      <option value="Frontend Engineer">
                        Frontend Engineer
                      </option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="Full Stack Engineer">
                        Full Stack Engineer
                      </option>
                      <option value="Designer">Designer</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password here"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Please confirm password here"
                      name="confirmPass"
                      value={confirmPass}
                      onChange={onChangeConfirmPassword}
                      required
                    />
                  </div>

                  <ErrorText Style="mt-8">{errorMessage}</ErrorText>
                  <button type="submit" className="btn btn-primary w-full">
                    Sign Up
                  </button>

                  <div className="text-center mt-4">
                    Already Have An Account?{" "}
                    <Link to="/signin">
                      <span className="inline-block hover:text-primary underline hover:cursor-pointer transition duration-200">
                        Signin
                      </span>
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
