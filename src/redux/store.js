import { configureStore } from "@reduxjs/toolkit";
import manageUser from "./ManageUserSlice";
const rootReducer = {
    reducer: {
        manageUser: manageUser,
    },
};
export const store = configureStore(rootReducer);
