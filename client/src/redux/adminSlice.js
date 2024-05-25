import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = "http://localhost:4000/api/admin";

// export const getAllCategory = async () => {
//   const res = await axios.get(base_url + '/category/all');
//   return res.data;
// };

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    category: [],
  },
  reducers: {
    // setPageTitle: (state, action) => {
    //     state.pageTitle = action.payload.title
    // },
  },
  // extraReducers: builder => {
  //   builder.addCase(getAllCategory.fulfilled, (state, action) => {
  //     state.category = action.payload.result
  //     console.log(state.category);
  //   })
  // }
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  adminSlice.actions;

export default adminSlice.reducer;
