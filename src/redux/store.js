import { configureStore } from "@reduxjs/toolkit";
import manageUser from "./ManageUserSlice";
import manageDoctor from "./doctorSlice";
const rootReducer = {
    reducer: {
        manageUser: manageUser,
        manageDoctor: manageDoctor,
    },
};
export const store = configureStore(rootReducer);
