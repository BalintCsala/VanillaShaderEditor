import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Setting} from "../data/types";

interface State {
    [key: string]: any;
}

const initialState: State = {};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        resetSettings: (state, action: PayloadAction<Setting[]>) => {
            const res: State = {};
            for (let setting of action.payload) {
                res[setting.name] = setting.defaultValue;
            }
            return res;
        },
        setValue: (state, action: PayloadAction<[string, any]>) => {
            state[action.payload[0]] = action.payload[1];
        },
        loadSettings: (state, action: PayloadAction<{[key:string]: any}>) => {
            return action.payload;
        }
    }
})

export const {resetSettings, setValue, loadSettings} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;