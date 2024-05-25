/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestServer } from "../../utils/requestServer";
import Logo from "../../components/Logo";
import ErrorText from "../../components/Typography/ErrorText";
import { Input } from "../Component/Input";
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
        alert("Password and confirm password must be equal!!!");
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
            <h1 className="text-3xl text-center font-semibold mb-10 head">
              Sign Up
            </h1>
            {loading === true ? (
              <>Loading</>
            ) : (
              <div className="mb-3">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
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
                  <select className="w-full h-[52px] px-[12px] mb-4 text-gray-700 border border-gray-300 hover:border-gray-500 rounded-[3px] outline-none focus:border-2 focus:border-gray-700">
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
                  {/* <ErrorText Style="mt-8">{errorMessage}</ErrorText> */}
                  <button type="submit" className="btn btn-primary w-full">
                    Sign Up
                  </button>
                  <div className="text-center mt-4">
                    Already Have An Account?
                    <Link to="/signin">
                      <span className="inline-block hover:text-primary underline hover:cursor-pointer mx-10">
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
