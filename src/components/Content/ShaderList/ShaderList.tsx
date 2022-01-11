import React from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderListItem from "./ShaderListItem/ShaderListItem";
import {endLoading, startLoading} from "../../../redux/loadingSlice";
import {setShaders} from "../../../redux/shaderListSlice";
import {ShaderData} from "../../../data/ShaderData";

const SHADERS_JSON_URL = "https://raw.githubusercontent.com/BalintCsala/ConfigurableVanillaShaders/main/shaders.json";

function ShaderList() {
    const dispatch = useAppDispatch();
    const shaders = useAppSelector(state => state.shaderList.shaders);

    if (shaders.length === 0) {
        dispatch(startLoading("Loading shaders"));
        fetch(SHADERS_JSON_URL)
            .then(res => res.json())
            .then(shaderData => {
                dispatch(setShaders(shaderData as ShaderData[]));
                dispatch(endLoading());
            });
    }

    return (
        <div className="shader-list">
            {shaders.map((shader, i) => (
                <ShaderListItem key={i} data={shader} />
            ))}
        </div>
    );
}

export default ShaderList;