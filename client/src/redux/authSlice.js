/* eslint-disable no-unreachable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { requestServer } from "../utils/requestServer";
const base_url = "http://localhost:4000/api/admin";

export const signin = createAsyncThunk("signin", async (payload) => {
  try {
    const res = await requestServer("post", "/api/auth/signin", payload);
    return res.data;
  } catch (e) {
    if (e.response) {
      return { ...e.response };
    }
    return { error: true, message: "Server is not running correctly." };
  }
});

export const updateAvatar = createAsyncThunk(
  "updateAvatar",
  async (payload) => {
    const formData = new FormData();
    formData.append("avatar", payload.avatar);
    try {
      const res = await requestServer(
        "put",
        "/api/admin/user/avatar/" + payload.id,
        formData
      );
      return res.data;
    } catch (e) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: "Server is not running correctly." };
    }
  }
);

export const changeInfo = createAsyncThunk("changeInfo", async (payload) => {
  const res = await requestServer(
    "put",
    `/api/admin/user/${payload.params}`,
    payload.payload
  );
  return res.data;
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data) => {
    try {
      const res = await requestServer(
        "put",
        `/api/admin/user/${data.params}`,
        data.payload
      );
      return res.data;
    } catch (e) {
      if (e.response) {
        return { ...e.response.data, error: true };
      }
      return { error: true, message: e.message };
    }
  }
);

export const getUser = createAsyncThunk("getUser", async (params) => {
  const res = await axios.get(base_url + `/user/${params}`);
  return res.data;
});

export const addFollower = createAsyncThunk("addFollow", async (payload) => {
  try {
    const res = await requestServer(
      "put",
      "/api/admin/user/follow/" + payload.id,
      { from: payload.from }
    );
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
    selectUser: {},
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
    [getUser.fulfilled]: (state, action) => {
      state.selectUser = action.payload.user;
    },
    [addFollower.fulfilled]: (state, { payload }) => {
      if (payload.user !== undefined) {
        state.user = payload.user;
        state.selectUser = payload.selectUser;
      }
    },
    [signin.fulfilled]: (state, { payload }) => {
      if (payload.token) {
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
    [updateAvatar.fulfilled]: (state, { payload }) => {
      if (payload.user.avatar)
        localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
      state.isLoading = false;
    },
    [updateAvatar.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
  },
});

export const { resetError, setAuth, signout } = userSlice.actions;
export default userSlice.reducer;
