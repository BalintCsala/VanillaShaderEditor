import React from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderListItem from "./ShaderListItem/ShaderListItem";
import {endLoading, startLoading} from "../../../redux/loadingSlice";
import {setSelected, setShaders} from "../../../redux/shaderListSlice";
import {resetSettings} from "../../../redux/settingsSlice";
import {ShaderData} from "../../../data/types";

const SHADERS_JSON_URL = "https://raw.githubusercontent.com/BalintCsala/ConfigurableVanillaShaders/main/shaders.json";

function ShaderList() {
    const dispatch = useAppDispatch();
    const shaders = useAppSelector(state => state.shaderList.shaders);

    if (shaders.length === 0) {
        dispatch(startLoading("Loading shaders"));
        fetch(SHADERS_JSON_URL)
            .then(res => res.json())
            .then(raw => {
                const shaderData = raw as ShaderData[];
                dispatch(setShaders(shaderData));
                if (window.location.pathname !== "/") {
                    const name = decodeURI(window.location.pathname.substring(1));
                    const shader = shaderData.find(shader => shader.name === name);
                    if (typeof shader !== "undefined") {
                        dispatch(resetSettings(shader.settings));
                        dispatch(setSelected(shader.name));
                    }
                }

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