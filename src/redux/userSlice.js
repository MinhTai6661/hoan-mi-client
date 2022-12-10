import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initial } from "lodash";
import userService from "../service/userService";

const manageUserSlice = createSlice({
    name: "manageUser",
    initialState: {
        currentUser: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.genderList = action.payload;
        });
    },
});

export const fetchCurrentUser = createAsyncThunk("mageUser/fetchCurrentUser", async () => {
    const res = await userService.getAllCodeService("gender");
    return res.data.data;
});

const { action, reducer } = manageUserSlice;

export default reducer;
