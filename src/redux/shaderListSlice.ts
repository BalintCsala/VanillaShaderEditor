import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShaderData, ShaderDataLink} from "../data/types";

export const shaderListSlice = createSlice({
    name: "shaderList",
    initialState: [] as (ShaderData | ShaderDataLink)[],
    reducers: {
        setShaders: (state, action: PayloadAction<(ShaderData | ShaderDataLink)[]>) => {
            return action.payload;
        },
        setShader: (state, action: PayloadAction<ShaderData>) => {
            state.splice(state.findIndex(shader => shader.name === action.payload.name), 1, action.payload);
        },
    },
});

export const {setShaders, setShader} = shaderListSlice.actions;

export const shaderListReducer = shaderListSlice.reducer;