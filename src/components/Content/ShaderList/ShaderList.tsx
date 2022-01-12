import React, {useRef} from "react";
import "./ShaderList.css";
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
    const developer = useAppSelector(state => state.developer);
    const fileRef = useRef<HTMLInputElement>(null);

    const onLoadShaders = () => {
        fileRef.current?.click();
    };

    const parseRawShaderData = (raw: any[]) => {
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
    };

    const onJSONSelected = () => {
        if (!fileRef.current || !fileRef.current.files || fileRef.current.files.length === 0)
            return;

        const file = fileRef.current.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", e => {
            const content = (e.target ? JSON.parse(e.target.result as string) : []);
            parseRawShaderData(content);
        });
        reader.readAsText(file);
    };

    if (shaders.length === 0) {
        dispatch(startLoading("Loading shaders"));
        fetch(SHADERS_JSON_URL)
            .then(res => res.json())
            .then(raw => {
                parseRawShaderData(raw);
                dispatch(endLoading());
            });
    }

    return (
        <div className="shader-list">
            {shaders.map((shader, i) => (
                <ShaderListItem key={i} data={shader} />
            ))}
            {developer ? <div className="sideloader">
                <span className="sideloader-description">Load shaders.json</span>
                <button onClick={onLoadShaders} className="load-json">
                    <i className="fas fa-plus-circle" />
                </button>
                <input ref={fileRef} type="file" className="file" accept=".json" onChange={onJSONSelected}/>
            </div> : null}
        </div>
    );
}

export default ShaderList;