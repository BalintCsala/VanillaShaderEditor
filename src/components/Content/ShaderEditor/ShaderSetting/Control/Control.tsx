import React, {useState} from "react";
import "./Control.css";
import {EnumSetting, FloatSetting, Format, IntegerSetting, Setting, VecSetting} from "../../../../../data/types";

interface Props {
    setting: Setting;
    value: any;
    onChange: (value: any) => void;
}

function rgbToHex(color: number[]) {
    return "#" + color.map(channel => Math.min(Math.max(Math.floor(channel * 255), 0), 255).toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex: string) {
    console.log(hex, [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)]);
    return [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)].map(channel => parseInt(channel, 16) / 255.0);
}

function Control({setting, value, onChange}: Props) {
    const [tempValue, setTempValue]: [any, (newVal: any) => void] = useState(null);

    if (typeof value === "undefined") {
        value = setting.defaultValue;
    }

    const handleVecChange = () => {
        const val = (tempValue?.map((x: string) => parseFloat(x)) ?? value) as number[];
        const vecSetting = setting as VecSetting;
        const realMin = vecSetting.min ?? new Array(val.length).fill(-Infinity);
        const realMax = vecSetting.max ?? new Array(val.length).fill(Infinity);
        let finalVal = val.map((x, i) => Math.max(Math.min(isNaN(x) ? 0 : x, realMax[i]), realMin[i]));

        onChange(finalVal);
        setTempValue(null);
    };

    let inner;
    switch (setting.format) {
        case Format.ENUM:
            const enumSetting = setting as EnumSetting;
            let selected = value as number;
            inner = (
                <>
                    <select value={selected} onChange={e => onChange(parseFloat(e.target.value))}>
                        {enumSetting.enumValues.map((enumValue, i) => (
                            <option key={i} value={enumValue.value}>{enumValue.name ?? enumValue.value}</option>
                        ))}
                    </select>
                </>
            );
            break;
        case Format.FLOAT:
            const floatSetting = setting as FloatSetting;
            let float = (tempValue !== null ? parseFloat(tempValue) : value) as number;
            if (isNaN(float))
                float = floatSetting.min ?? 0;
            inner = (
                <>
                    <label htmlFor={floatSetting.name}>Value:</label>
                    <input id={`${floatSetting.name}`} type="number" value={tempValue ?? value}
                           step={floatSetting.step}
                           onChange={e => setTempValue(e.target.value)}
                           onBlur={() => {
                               float = Math.min(Math.max(float, floatSetting.min ?? -Infinity), floatSetting.max ?? Infinity);
                               if (floatSetting.step) {
                                   const anchor = floatSetting.min ?? 0;
                                   float = Math.round((float - anchor) / floatSetting.step) * floatSetting.step + anchor;
                               }
                               float = Math.round(float * 1000) / 1000;
                               onChange(float);
                               setTempValue(null);
                           }}/>
                </>
            );
            break;
        case Format.VEC2:
            let vec2 = (tempValue !== null ? tempValue.map((x: string) => parseFloat(x)) : value) as number[];
            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={(tempValue ?? vec2)[0]}
                           onChange={e => setTempValue([e.target.value, vec2[1]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={(tempValue ?? vec2)[1]}
                           onChange={e => setTempValue([vec2[0], e.target.value])}
                           onBlur={handleVecChange}/>
                </>
            );
            break;
        case Format.VEC3:
            let vec3 = (tempValue !== null ? tempValue.map((x: string) => parseFloat(x)) : value) as number[];
            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={(tempValue ?? vec3)[0]}
                           onChange={e => setTempValue([e.target.value, vec3[1], vec3[2]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={(tempValue ?? vec3)[1]}
                           onChange={e => setTempValue([vec3[0], e.target.value, vec3[2]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-z`}>z:</label>
                    <input id={`${setting.name}-z`} type="number" value={(tempValue ?? vec3)[2]}
                           onChange={e => setTempValue([vec3[0], vec3[1], e.target.value])}
                           onBlur={handleVecChange}/>
                </>
            );
            break;
        case Format.VEC4:
            let vec4 = (tempValue !== null ? tempValue.map((x: string) => parseFloat(x)) : value) as number[];

            inner = (
                <>
                    <label htmlFor={`${setting.name}-x`}>x:</label>
                    <input id={`${setting.name}-x`} type="number" value={(tempValue ?? vec4)[0]}
                           onChange={e => setTempValue([e.target.value, vec4[1], vec4[2], vec4[3]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-y`}>y:</label>
                    <input id={`${setting.name}-y`} type="number" value={(tempValue ?? vec4)[1]}
                           onChange={e => setTempValue([vec4[0], e.target.value, vec4[2], vec4[3]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-z`}>z:</label>
                    <input id={`${setting.name}-z`} type="number" value={(tempValue ?? vec4)[2]}
                           onChange={e => setTempValue([vec4[0], vec4[1], e.target.value, vec4[3]])}
                           onBlur={handleVecChange}/>
                    <label htmlFor={`${setting.name}-w`}>w:</label>
                    <input id={`${setting.name}-w`} type="number" value={(tempValue ?? vec4)[3]}
                           onChange={e => setTempValue([vec4[0], vec4[1], vec4[2], e.target.value])}
                           onBlur={handleVecChange}/>
                </>
            );
            break;
        case Format.INTEGER:
            const intSetting = setting as IntegerSetting;
            let int = (tempValue !== null ? Math.round(parseInt(tempValue)) : value) as number;
            inner = (
                <>
                    <input type="number" value={int} step={1}
                           onChange={e => setTempValue(e.target.value)}
                           onBlur={() => {
                               int = Math.min(Math.max(int, intSetting.min ?? -Infinity), intSetting.max ?? Infinity);
                               onChange(int);
                               setTempValue(null);
                           }}/>
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
        case Format.COLOR:
            let color = (tempValue !== null ? tempValue.map((x: string) => parseFloat(x)) : value) as number[];
            inner = (
                <>
                    <input type="color" value={rgbToHex(color)} onChange={e => onChange(hexToRgb(e.target.value))} />
                </>
            )
            break;

    }
    return (
        <div className="control">
            {inner}
        </div>
    );
}

export default Control;