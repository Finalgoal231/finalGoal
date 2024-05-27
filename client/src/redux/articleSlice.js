/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";
import socket from "../utils/socket";

export const getAllArticles = createAsyncThunk("getAllArticle", async () => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/all");
  return res.data;
});
export const getDraftArticles = createAsyncThunk("getDraftArticles", async (payload) => {
  console.log(payload);
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/draft", { params: payload });
  return res.data;
});
export const getMyArticles = createAsyncThunk("getMyArticles", async (payload) => {
  console.log(payload);
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/my", { params: payload });
  return res.data;
});
export const getFavoriteArticles = createAsyncThunk("getFavoriteArticles", async (payload) => {
  console.log(payload);
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/favorite", { params: payload });
  return res.data;
});
export const getAArticles = createAsyncThunk("getAArticle", async (data) => {
  const res = await requestServer("get", `/api/article/${data}`);
  return res.data;
});
export const createArticle = createAsyncThunk("createArticle", async (data) => {
  const res = await requestServer("post", "/api/article/create", data);
  if (data.complete === true) return res.data;
  else return { msg: "Save to Draft!!!" };
});
export const updateArticle = createAsyncThunk("updateArticle", async (payload) => {
  const res = await requestServer("put", `/api/article/${payload._id}`, payload);
  return res.data;
});
export const deleteArticle = createAsyncThunk("deleteArticle", async (data) => {
  const res = await requestServer("delete", `/api/article/${data}`);
  return res.data;
});
export const addComment = createAsyncThunk("addComment", async (payload) => {
  const res = await requestServer("put", `/api/article/comment/${payload.id}`, payload.data);
  return res.data;
});
export const addFavourite = createAsyncThunk("addFavourite", async (payload) => {
  const { index, from } = payload;
  const res = await requestServer("put", `/api/article/favorite/${index}`, { from });
  return res.data;
});

export const articleSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    article: [],
    selected: { avatar: "default.png", from: {}, title: "", category: "", content: "", tags: [], favorite: [] },
    error: "",
    isAuthenicated: false,
    message: "",
    socketMsg: [],
    searchVal: "",
    sortIndex: "",
    categoryIndex: "",
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSocketMsg: (state, action) => {
      state.socketMsg = [...state.socketMsg, action.payload];
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
  },
  extraReducers: {
    [getMyArticles.fulfilled]: (state, { payload }) => {
      state.article = [...payload.article];
      state.isLoading = false;
    },
    [getDraftArticles.fulfilled]: (state, { payload }) => {
      state.article = [...payload.article];
      state.isLoading = false;
    },
    [getFavoriteArticles.fulfilled]: (state, { payload }) => {
      state.article = [...payload.article];
      state.isLoading = false;
    },
    [getAllArticles.fulfilled]: (state, { payload }) => {
      state.article = [...payload.article];
      state.isLoading = false;
    },
    [getAllArticles.pending]: (state) => {
      state.isLoading = false;
    },
    [getAArticles.fulfilled]: (state, { payload }) => {
      state.selected = { ...payload.article };
      state.isLoading = true;
    },
    [createArticle.fulfilled]: (state, { payload }) => {
      socket.emit("createArticle", payload.msg);
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
    [addComment.fulfilled]: (state, { payload }) => {
      state.message = "Success Comment!";
      state.isLoading = true;
    },
    [addFavourite.fulfilled]: (state, { payload }) => {
      state.isLoading = true;
    },
  },
});

export const { setIsLoading, setSocketMsg, setSearchVal, setSortIndex, setCategoryIndex } = articleSlice.actions;
export default articleSlice.reducer;
