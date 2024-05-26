/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";

export const getAllArticles = createAsyncThunk("getAllArticle", async () => {
  const res = await requestServer("get", "/api/article/home");
  return res.data;
});
export const getAArticles = createAsyncThunk("getAArticle", async (data) => {
  const res = await requestServer("get", `/api/article/${data}`);
  return res.data;
});
export const createArticle = createAsyncThunk("createArticle", async (data) => {
  const res = await requestServer("post", "/api/article/create", data);
  return res.data;
});
export const updateArticle = createAsyncThunk("updateArticle", async (payload) => {
  console.log(payload);
  const res = await requestServer("put", `/api/article/${payload.id}`, payload.data);
  return res.data;
});
export const deleteArticle = createAsyncThunk("deleteArticle", async (data) => {
  const res = await requestServer("delete", `/api/article/${data}`);
  return res.data;
});

export const articleSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    article: [],
    selected: { from: "", title: "", category: "express", content: "", tags: [] },
    error: "",
    isAuthenicated: false,
    message: "",
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [getAllArticles.fulfilled]: (state, { payload }) => {
      state.article = payload.article;
      // state.message = "";
      state.isLoading = false;
    },
    [getAllArticles.pending]: (state) => {
      state.isLoading = false;
    },
    [getAArticles.fulfilled]: (state, { payload }) => {
      state.selected = payload.article;
      state.isLoading = true;
    },
    [createArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
    },
    [updateArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
    },
    [deleteArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
    },
  },
});

export const { setIsLoading, setAuth, signout } = articleSlice.actions;
export default articleSlice.reducer;
