import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initial } from "lodash";
import { localService } from "../service/localService";
import userService from "../service/userService";

const authSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    },
});

export const fetchCurrentUser = createAsyncThunk("mageUser/fetchCurrentUser", async () => {
    const res = await localService.user.get();
    if (res) {
        return res;
    }
    return {};
});

const { action, reducer } = authSlice;

export default reducer;
