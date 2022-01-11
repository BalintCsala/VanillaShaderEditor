import React from "react";
import "./Control.css";
import {Format, Setting} from "../../../../../data/ShaderData";

interface Props {
    setting: Setting;
    value: any;
    onChange: (value: any) => void;
}

function Control({setting, value, onChange}: Props) {
    let inner;
    switch (setting.format) {
        default:
        case Format.FLOAT:
            let num = value as number;
            inner = (
                <>
                    <label htmlFor={setting.name}>Value:</label>
                    <input id={`${setting.name}`} type="number" value={num}
                           onChange={e => onChange(parseFloat(e.target.value))}/>
                </>
            );
            break;
        case Format.VEC2:
            let vec2 = value as number[];
            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={vec2[0]}
                           onChange={e => onChange([parseFloat(e.target.value), vec2[1]])}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={vec2[1]}
                           onChange={e => onChange([vec2[0], parseFloat(e.target.value)])}/>
                </>
            );
            break;
        case Format.VEC3:
            let vec3 = value as number[];
            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={vec3[0]}
                           onChange={e => onChange([parseFloat(e.target.value), vec3[1], vec3[2]])}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={vec3[1]}
                           onChange={e => onChange([vec3[0], parseFloat(e.target.value), vec3[2]])}/>
                    <label htmlFor={`${setting.name}-z`}>z:</label>
                    <input id={`${setting.name}-z`} type="number" value={vec3[2]}
                           onChange={e => onChange([vec3[0], vec3[1], parseFloat(e.target.value)])}/>
                </>
            );
            break;
        case Format.VEC4:
            let vec4 = value as number[];
            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={vec4[0]}
                           onChange={e => onChange([parseFloat(e.target.value), vec4[1], vec4[2], vec4[3]])}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={vec4[1]}
                           onChange={e => onChange([vec4[0], parseFloat(e.target.value), vec4[2], vec4[3]])}/>
                    <label htmlFor={`${setting.name}-z`}>z:</label>
                    <input id={`${setting.name}-z`} type="number" value={vec4[2]}
                           onChange={e => onChange([vec4[0], vec4[1], parseFloat(e.target.value), vec4[3]])}/>
                    <label htmlFor={`${setting.name}-w`}>w:</label>
                    <input id={`${setting.name}-w`} type="number" value={vec4[3]}
                           onChange={e => onChange([vec4[0], vec4[1], vec4[2], parseFloat(e.target.value)])}/>
                </>
            );
            break;
        case Format.INTEGER:
            let int = value as number;
            inner = (
                <>
                    <input type="number" value={int} step={1} onChange={e => onChange(parseInt(e.target.value))}/>
                </>
            );
            break;
        case Format.BOOLEAN:
            let bool = value as boolean;
            let id = Math.random() + "";
            inner = (
                <>
                    <label htmlFor={id}>Value: </label><input type="checkbox" checked={bool} id={id}
                                                              onChange={e => onChange(e.target.checked)}/>
                </>
            );
            break;
        case Format.ENUM:
            let selected = value as number;
            inner = (
                <>
                    <select value={selected} onChange={e => onChange(parseFloat(e.target.value))}>
                        {setting.enumValues?.map((enumValue, i) => (
                            <option key={i} value={enumValue.value}>{enumValue.name ?? enumValue.value}</option>
                        ))}
                    </select>
                </>
            );
            break;
    }
    return (
        <div className="control">
            {inner}
        </div>
    );
}

export default Control;