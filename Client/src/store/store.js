import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import AdminPropertySlice from "./admin/property-slice/index.js";
import shopPropertySlice from "./shop/property-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProperty: AdminPropertySlice,
    shopProperty: shopPropertySlice,
  },
});

export default store;
