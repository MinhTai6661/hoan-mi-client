import { configureStore } from "@reduxjs/toolkit";
import manageUser from "./ManageUserSlice";
import manageDoctor from "./doctorSlice";
import auth from "./authSlice";
const rootReducer = {
    reducer: {
        manageUser: manageUser,
        manageDoctor: manageDoctor,
        auth: auth,
    },
};
export const store = configureStore(rootReducer);
