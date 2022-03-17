import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {shaderListReducer} from "./shaderListSlice";
import {loadingReducer} from "./loadingSlice";
import {settingsReducer} from "./settingsSlice";
import {developerReducer} from "./developerSlice";
import {tagsReducer} from "./tagsSlice";

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        shaderList: shaderListReducer,
        settings: settingsReducer,
        developer: developerReducer,
        tags: tagsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;