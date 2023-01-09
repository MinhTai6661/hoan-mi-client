import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../service/userService";

const manageSpecialtySlice = createSlice({
    name: "manageSpecialty",
    initialState: {
        specialtiesList: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllSpecialties.fulfilled, (state, action) => {
            state.specialtiesList = action.payload;
        });
    },
});

export const fetchAllSpecialties = createAsyncThunk(
    "manageSpecialty/fetchAllSpecialties",
    async () => {
        const res = await userService.getSpecialties();
        return res.data.data;
    }
);

const { actions, reducer } = manageSpecialtySlice;

export default reducer;
