import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initial } from "lodash";
import userService from "../service/userService";

const manageUserSlice = createSlice({
    name: "manageUser",
    initialState: {
        genderList: [],
        positionList: [],
        roleList: [],
        userList: [],
        allUserLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllGender.pending, (state, action) => {
            state.allUserLoading = true;
        });
        builder.addCase(fetchAllGender.fulfilled, (state, action) => {
            state.allUserLoading = false;
            state.genderList = action.payload;
        });
        builder.addCase(fetchAllPosition.fulfilled, (state, action) => {
            state.positionList = action.payload;
        });
        builder.addCase(fetchAllRole.fulfilled, (state, action) => {
            state.roleList = action.payload;
            // console.log(object);
        });
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.userList = action.payload;
            // console.log(object);
        });
    },
});

export const fetchAllGender = createAsyncThunk("mageUser/fetchAllGender", async () => {
    const res = await userService.getAllCodeService("gender");
    return res.data.data;
});
export const fetchAllPosition = createAsyncThunk("mageUser/fetchAllPosition", async () => {
    const res = await userService.getAllCodeService("position");
    return res.data.data;
});
export const fetchAllRole = createAsyncThunk("mageUser/fetchAllRole", async () => {
    const res = await userService.getAllCodeService("role");
    return res.data.data;
});
export const fetchAllUser = createAsyncThunk("mageUser/fetchAllUser", async () => {
    const res = await userService.getUser("all");
    return res.data.users;
});
export const addNewUser = createAsyncThunk("mageUser/addNewUser", async (user) => {
    const res = await userService.addUser(user);
    return res.data.data;
});

const { action, reducer } = manageUserSlice;

export default reducer;
