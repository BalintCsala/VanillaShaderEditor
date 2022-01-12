import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const developerSlice = createSlice({
    name: "developer",
    initialState: false,
    reducers: {
        setDeveloper: (state, action: PayloadAction<boolean>) => action.payload,
    },
});

export const {setDeveloper} = developerSlice.actions;

export const developerReducer = developerSlice.reducer;