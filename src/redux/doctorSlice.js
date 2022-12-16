import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initial } from "lodash";
import userService from "../service/userService";

const doctorSlice = createSlice({
    name: "manageUser",
    initialState: {
        topDoctorList: [],
        allDoctor: [],
        allSchedules: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTopDoctor.fulfilled, (state, action) => {
            state.topDoctorList = action.payload;
            // console.log(object);
        });
        builder.addCase(fetchAllDoctor.fulfilled, (state, action) => {
            state.allDoctor = action.payload;
            // console.log(object);
        });
        builder.addCase(fetchAllSchedules.fulfilled, (state, action) => {
            state.allSchedules = action.payload;
            // console.log(object);
        });
    },
});

export const fetchTopDoctor = createAsyncThunk("mageUser/fetchTopDoctor", async (limit) => {
    const res = await userService.getTopDoctor(limit);
    return res.data.data;
});
export const fetchAllDoctor = createAsyncThunk("mageUser/fetchAllDoctor", async () => {
    const res = await userService.getAllDoctors();
    return res.data.data;
});

export const fetchAllSchedules = createAsyncThunk("mageUser/fetchAllSchedules", async (user) => {
    const res = await userService.getAllCodeService("TIME");
    return res.data.data;
});

const { action, reducer } = doctorSlice;

export default reducer;
