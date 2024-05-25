/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";

export const signin = createAsyncThunk("/api/auth/signin", async (payload) => {
    console.log(payload);
    try {
        const res = await requestServer("post", "/api/auth/signin", payload);
        console.log(res);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: "Server is not running correctly." };
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        user: null,
        error: "",
        isAuthenicated: false,
    },
    reducers: {
        resetError: (state) => {
            state.error = "";
        },
        setAuth: (state, { payload }) => {
            state.user = payload.user;
            state.isAuthenicated = true;
        },
        signout: (state, { payload }) => {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.isAuthenicated = payload;
            state.user = null;
        },
    },
    extraReducers: {
        [signin.pending]: (state) => {
            state.isLoading = true;
        },
        [signin.fulfilled]: (state, { payload }) => {
            // console.log(payload);
            if (payload.token) {
                axios.defaults.headers.common["Authorization"] = payload.token;
                localStorage.setItem("token", payload.token);
                localStorage.setItem("user", JSON.stringify(payload.user));
                state.user = payload.user;
                state.isAuthenicated = true;
                state.isLoading = false;
            } else {
                state.error = payload.message;
                state.isLoading = false;
            }
        },
        [signin.rejected]: (state, { payload }) => {
            state.error = payload.message;
            state.isLoading = false;
        },
    },
});

export const { resetError, setAuth, signout } = userSlice.actions;
export default userSlice.reducer;
