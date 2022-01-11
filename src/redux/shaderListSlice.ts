import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ShaderData} from "../data/types";

interface State {
    selected: string,
    shaders: ShaderData[]
}

const initialState: State = {
    selected: "",
    shaders: [],
};

export const shaderListSlice = createSlice({
    name: "shaderList",
    initialState,
    reducers: {
        setShaders: (state, action: PayloadAction<ShaderData[]>) => {
            state.shaders = action.payload;
        },
        setSelected: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        },
    },
});

export const {setShaders, setSelected} = shaderListSlice.actions;

export const shaderListReducer = shaderListSlice.reducer;