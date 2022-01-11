import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {shaderListReducer} from "./shaderListSlice";
import {loadingReducer} from "./loadingSlice";
import {settingsReducer} from "./settingsSlice";

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        shaderList: shaderListReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;