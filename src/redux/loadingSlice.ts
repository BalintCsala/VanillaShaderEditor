import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        value: false,
        message: "",
    },
    reducers: {
        startLoading: (state, action: PayloadAction<string>) => {
            state.value = true;
            state.message = action.payload;
        },
        endLoading: state => {
            state.value = false;
        },
    },
});

export const {startLoading, endLoading} = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;