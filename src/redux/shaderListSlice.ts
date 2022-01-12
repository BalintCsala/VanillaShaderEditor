import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShaderData} from "../data/types";

export const shaderListSlice = createSlice({
    name: "shaderList",
    initialState: [] as ShaderData[],
    reducers: {
        setShaders: (state, action: PayloadAction<ShaderData[]>) => {
            return action.payload;
        },
    },
});

export const {setShaders} = shaderListSlice.actions;

export const shaderListReducer = shaderListSlice.reducer;