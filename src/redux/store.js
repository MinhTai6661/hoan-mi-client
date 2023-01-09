import { configureStore } from "@reduxjs/toolkit";
import manageUser from "./ManageUserSlice";
import manageDoctor from "./doctorSlice";
import auth from "./authSlice";
import manageSpecialty from "./manageSpecialtySlice";
const rootReducer = {
    reducer: {
        manageUser: manageUser,
        manageDoctor: manageDoctor,
        auth: auth,
        manageSpecialty: manageSpecialty,
    },
};
export const store = configureStore(rootReducer);
