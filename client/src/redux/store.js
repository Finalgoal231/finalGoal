import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
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
