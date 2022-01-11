import React from "react";
import "./ShaderSetting.css";
import {Setting} from "../../../../data/ShaderData";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import Control from "./Control/Control";
import {setValue} from "../../../../redux/settingsSlice";

interface Props {
    data: Setting;
}

function ShaderSetting({data}: Props) {
    const dispatch = useAppDispatch();
    const value = useAppSelector(state => state.settings[data.name]);

    return (
        <div className="shader-setting">
            <span className="name">{data.displayName ?? data.name}</span>
            <span className="description">{data.description}</span>
            <Control setting={data} value={value} onChange={value => dispatch(setValue([data.name, value]))} />
        </div>
    );
}

export default ShaderSetting;