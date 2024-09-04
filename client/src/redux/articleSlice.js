/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";

export const getHomeArticles = createAsyncThunk("getHomeArticle", async (data) => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/home", { params: data.followers });
  return res.data;
});

export const getAllArticles = createAsyncThunk("getAllArticle", async (data) => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/all", { params: data });
  return res.data;
});
export const getDraftArticles = createAsyncThunk("getDraftArticles", async (payload) => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/draft", { params: payload });
  return res.data;
});
export const getMyArticles = createAsyncThunk("getMyArticles", async (payload) => {
  const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/article/my", { params: payload });
  return res.data;
});
export const getFavoriteArticles = createAsyncThunk("getFavoriteArticles", async (payload) => {
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
  const res = await requestServer("put", `/api/article/${payload.id}`, payload.data);
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
  const { id, from } = payload;
  const res = await requestServer("put", `/api/article/favorite/${id}`, {
    from,
  });
  return res.data;
});

export const articleSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    articles: [],
    article: {
      avatar: "https://avatars.githubusercontent.com/u/135434950",
      from: {},
      title: "",
      category: "",
      content: "",
      tags: [],
      favorite: [],
      comment: [],
    },
    error: "",
    isAuthenicated: false,
    message: "",
    searchVal: "",
    sortIndex: "",
    categoryIndex: "",
    flag: false,
    handleFlag: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
      state.articles = [...payload.article];
      state.isLoading = false;
    },
    [getDraftArticles.fulfilled]: (state, { payload }) => {
      state.articles = [...payload.article];
      state.isLoading = false;
    },
    [getFavoriteArticles.fulfilled]: (state, { payload }) => {
      state.articles = [...payload.article];
      state.isLoading = false;
    },
    [getHomeArticles.fulfilled]: (state, { payload }) => {
      state.articles = [...payload.article];
      state.isLoading = false;
    },
    [getAllArticles.pending]: (state) => {
      state.isLoading = false;
    },
    [getAllArticles.fulfilled]: (state, { payload }) => {
      state.articles = [...payload.article];
      state.isLoading = false;
    },
    [getAArticles.fulfilled]: (state, { payload }) => {
      state.article = payload.article;
      state.isLoading = true;
    },
    [createArticle.pending]: (state, { payload }) => {
      state.handleFlag = false;
      state.isLoading = false;
    },
    [createArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
    },
    [updateArticle.pending]: (state, {payload}) => {
      state.handleFlag = false;
      state.isLoading = false;
    },
    [updateArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
      state.handleFlag = true;
    },
    [deleteArticle.fulfilled]: (state, { payload }) => {
      state.message = payload.msg;
      state.isLoading = true;
    },
    [addComment.pending]: (state, { payload }) => {
      state.flag = false;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.flag = true;
      state.message = payload.msg;
      state.isLoading = true;
    },
    [addFavourite.pending]: (state, { payload }) => {
      state.flag = false;
    },
    [addFavourite.fulfilled]: (state, { payload }) => {
      state.flag = true;
      state.message = payload.msg;
      state.isLoading = true;
    },
  },
});

export const { setIsLoading, setSearchVal, setSortIndex, setCategoryIndex } = articleSlice.actions;
export default articleSlice.reducer;
