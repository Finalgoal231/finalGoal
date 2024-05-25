import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:4000/api/admin";

// export const getAllCategory = createAsyncThunk("getAllCategory", async () => {
//   const res = await axios.get(base_url + "/category/all");
//   return res.data;
// });
// export const createCategory = createAsyncThunk("createCategory", async () => {
//   const res = await axios.post(base_url + "/category/");
//   return res.data;
// });
// export const updateCategory = createAsyncThunk("editCategory", async () => {
//   const res = await axios.put(base_url + "/category/");
//   return res.data;
// });
// export const deleteCategory = createAsyncThunk("editCategory", async () => {
//   const res = await axios.delete(base_url + "/category/");
//   return res.data;
// });

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    categories: [],
    category: ''
  },
  reducers: {
    // setPageTitle: (state, action) => {
    //     state.pageTitle = action.payload.title
    // },
    // getCategory: (state, action) => {
    //     state.category = action.payload.val
    // },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getAllCategory.fulfilled, (state, action) => {
  //     state.categories = action.payload.result;
  //     console.log(state.category);
  //   });
  //   builder.addCase(createCategory.fulfilled, (state, action) => {
  //   });
  //   builder.addCase(updateCategory.fulfilled, (state, action) => {
  //   });
  //   builder.addCase(deleteCategory.fulfilled, (state, action) => {
  //   });
  // },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
