/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";

export const signin = createAsyncThunk("/api/auth/signin", async (payload) => {
    try {
        const res = await requestServer("post", "/api/auth/signin", payload);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response};
        }
        return { error: true, message: "Server is not running correctly." };
    }
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (payload) => {
    const formData = new FormData();
    formData.append("avatar", payload.avatar);
    try {
        const res = await requestServer("put", "/api/admin/user/avatar/" + payload.id, formData);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: "Server is not running correctly." };
    }
});

export const changeInfo = createAsyncThunk();
export const changePassword = createAsyncThunk();

export const createPassword = createAsyncThunk("createPassword", async (data) => {
    try {
        const res = await requestServer("post", "/api/password/create", data);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: e.message };
    }
});
export const createProfile = createAsyncThunk("createProfile", async (data) => {
    try {
        const res = await requestServer("post", "/api/profile/create", data);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: e.message };
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        user: null,
        error: "",
        password: {
            current: "",
            new: "",
        },
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
        [signin.fulfilled]: (state, { payload }) => {
            if (payload.token) {
                console.log(payload);
                axios.defaults.headers.common["Authorization"] = payload.token;
                localStorage.setItem("token", payload.token);
                localStorage.setItem("user", JSON.stringify(payload.user));
                state.user = payload.user;
                state.isAuthenicated = true;
                state.isLoading = false;
            } else {
                state.isAuthenicated = false;
            }
        },
        // [signin.rejected]: (state, { payload }) => {
        //     state.error = payload.message;
        //     state.isLoading = false;
        // },

        [createPassword.fulfilled]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = false;
        },
        [createPassword.pending]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = true;
        },
        [createProfile.fulfilled]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = false;
        },
        [createProfile.pending]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = true;
        },
        [updateAvatar.fulfilled]: (state, {payload}) => {
            localStorage.setItem("user", JSON.stringify(payload.user))
            state.user = payload.user;
            state.isLoading = false;
        },
        [updateAvatar.pending]: (state, {payload}) => {
            state.isLoading = true;
        },
    },
});

export const { resetError, setAuth, signout } = userSlice.actions;
export default userSlice.reducer;
