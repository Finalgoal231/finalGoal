/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ErrorText from "../components/Typography/ErrorText";
import Logo from "../components/Logo";
import { resetError, signin } from "../redux/authSlice";

// import use

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenicated, error, isLoading, user } = useSelector((state) => state.auth);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenicated) {
            NotificationManager.success(`Welcome ${user.name}!`, "success");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [isAuthenicated]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(resetError());
        }, 3000);
    }, [error]);

    const handleChange = useCallback(
        (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        },
        [form],
    );
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(signin(form));
        },
        [form],
    );
    return (
        <div className="min-h-screen bg-pic flex items-center">
            <NotificationContainer />
            <div className="card mx-auto w-[70%] opacity-90 shadow-xl">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-base-100 rounded-xl">
                    <Logo />
                    <div className="py-24 px-10 w-full">
                        <h1 className="text-3xl text-center font-semibold mb-2">Signin</h1>
                        <div className="mb-3">
                            {isLoading === true ? (
                                <div>Loading</div>
                            ) : (
                                <form
                                    onSubmitCapture={(e) => {
                                        handleSubmit(e);
                                    }}
                                >
                                    <div className="mb-4">
                                        <input
                                            placeholder="E-mail"
                                            name="username"
                                            value={form.username}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={form.password}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            required
                                        />
                                    </div>
                                    <ErrorText Style="mt-8">{error}</ErrorText>
                                    <button type="submit" className={"btn btn-primary w-full"}>
                                        Signin
                                    </button>
                                    <div className="text-center mt-4">
                                        Are you new here?{"  "}
                                        <Link to="/signup">
                                            <span className="inline-block hover:text-primary underline hover:cursor-pointer transition duration-200">
                                                Signup
                                            </span>
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
