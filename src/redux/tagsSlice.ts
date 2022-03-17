import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tag} from "../data/types";

export const tagsSlice = createSlice({
    name: "tags",
    initialState: [] as Tag[],
    reducers: {
        setTags: (state, action: PayloadAction<Tag[]>) => {
            return action.payload;
        },
    },
});

export const {setTags} = tagsSlice.actions;

export const tagsReducer = tagsSlice.reducer;