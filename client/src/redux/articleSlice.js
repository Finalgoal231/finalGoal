/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";

export const getAllArticles = createAsyncThunk("getAllArticle", async () => {
    try {
        const res = await requestServer("get", "/api/article/home");
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: e.message };
    }
});
export const createArticle = createAsyncThunk("createArticle", async (data) => {
    try {
        const res = await requestServer("post", "/api/article/create", data);
        return res.data;
    } catch (e) {
        if (e.response) {
            return { ...e.response.data, error: true };
        }
        return { error: true, message: e.message };
    }
});

export const articleSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        article: [],
        error: "",
        isAuthenicated: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // setAuth: (state, { payload }) => {
        //     state.user = payload.user;
        //     state.isAuthenicated = true;
        // },
        // signout: (state, { payload }) => {
        //     delete axios.defaults.headers.common["Authorization"];
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("user");
        //     state.isAuthenicated = payload;
        //     state.user = null;
        // },
    },
    extraReducers: {
        [getAllArticles.fulfilled]: (state, { payload }) => {
            state.article = payload.article;
            state.isLoading = false;
        },
        [getAllArticles.pending]: (state) => {
            state.isLoading = false;
        },
        [getAllArticles.rejected]: (state, { payload }) => {
            state.error = payload.message;
            state.isLoading = false;
        },
        [createArticle.fulfilled]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = false;
        },
        [createArticle.fulfilled]: (state, { payload }) => {
            alert(payload.msg);
            state.isLoading = true;
        },
    },
});

export const { setIsLoading, setAuth, signout } = articleSlice.actions;
export default articleSlice.reducer;
