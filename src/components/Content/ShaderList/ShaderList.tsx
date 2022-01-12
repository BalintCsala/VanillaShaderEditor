import React, {useRef} from "react";
import "./ShaderList.css";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderListItem from "./ShaderListItem/ShaderListItem";
import {setShaders} from "../../../redux/shaderListSlice";
import {ShaderData} from "../../../data/types";

function ShaderList() {
    const dispatch = useAppDispatch();
    const shaders = useAppSelector(state => state.shaderList);
    const developer = useAppSelector(state => state.developer);
    const fileRef = useRef<HTMLInputElement>(null);

    const onLoadShaders = () => {
        fileRef.current?.click();
    };

    const onJSONSelected = () => {
        if (!fileRef.current || !fileRef.current.files || fileRef.current.files.length === 0)
            return;

        const file = fileRef.current.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", e => {
            const shaderData = (e.target ? JSON.parse(e.target.result as string) : []);
            dispatch(setShaders(shaderData as ShaderData[]));
        });
        reader.readAsText(file);
    };

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