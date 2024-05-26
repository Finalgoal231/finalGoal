import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const base_url = "http://localhost:4000/api/admin";

export const getAllCategory = createAsyncThunk("getAllCategory", async () => {
  const res = await axios.get(base_url + "/category/all");
  return res.data;
});
export const createCategory = createAsyncThunk("addCategory", async (data) => {
  const res = await axios.post(base_url + "/category/", data);
  return res.data;
});
export const updateCategory = createAsyncThunk("editCategory", async (data) => {
  const res = await axios.put(base_url + `/category/${data._id}`, data);
  return res.data;
});
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (data) => {
    const res = await axios.delete(base_url + `/category/${data._id}`);
    return res.data;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    categories: [],
    category: {
      title: "",
      _id: "",
    },
    msg: "",
    flag: false,
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },
    getCategory: (state, action) => {
      state.category.title = action.payload.val.title;
      state.category._id = action.payload.val._id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload.result;
      state.flag = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.msg = action.payload.msg;
      state.flag = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.msg = action.payload.msg;
      state.category.title = "";
      state.flag = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.msg = action.payload.msg;
      state.flag = false;
    });
  },
});

export const { getCategory, setFlag } = adminSlice.actions;

export default adminSlice.reducer;
