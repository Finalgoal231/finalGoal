import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../components/features/common/headerSlice.js";
import modalSlice from "../components/features/common/modalSlice.js/index.js";
import rightDrawerSlice from "../components/features/common/rightDrawerSlice";
import leadsSlice from "../components/features/leads/leadSlice";
import authSlice from "./authSlice";
import adminSlice from "./adminSlice";
import articleSlice from "./articleSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  auth: authSlice,
  admin: adminSlice,
  article: articleSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
