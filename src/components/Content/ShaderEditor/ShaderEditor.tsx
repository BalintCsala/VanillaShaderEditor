import React, {useCallback, useEffect} from "react";
import "./ShaderEditor.css";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderSetting from "./ShaderSetting/ShaderSetting";
import {collectZip} from "../../../data/collectZip";
import {settingApply} from "../../../data/settings";
import {saveAs} from "file-saver";
import {endLoading, startLoading} from "../../../redux/loadingSlice";
import {useNavigate, useParams} from "react-router-dom";

function ShaderEditor() {
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const shaders = useAppSelector(state => state.shaderList);
    const shader = shaders.find(shader => shader.name === params.shader);

    const values = useAppSelector(state => state.settings);

    const onBack = useCallback(() => {
        let goBack = window.confirm("Are you sure you want to go back? You will lose all edits you made up to this point!");
        if (!goBack) {
            return;
        }
        navigate("/");

    }, [navigate]);

    useEffect(() => {
        const listener = (e: PopStateEvent) => {
            e.preventDefault();
            navigate(`/${shader?.name}`);
            onBack();
        };
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, [navigate, shader?.name, onBack]);

    if (typeof shader === "undefined") {
        return (
            <div className="shader-editor">
                <span>Something went wrong :(</span>
            </div>
        );
    }

    const onDownload = async () => {
        dispatch(startLoading("Applying settings"));
        let zip = await collectZip(shader.url);

        for (let setting of shader.settings) {
            zip = await settingApply[setting.type](setting, values[setting.name], zip);
        }

        zip.generateAsync({type: "blob"})
            .then(blob => saveAs(blob, `${shader.name}.zip`))
            .then(() => dispatch(endLoading()));
    };

    return (
        <div className="shader-editor">
            <div className="top-row">
                <button onClick={onBack} title="Back"><i className="fas fa-arrow-left" /></button>
                <span className="name">{shader.name}</span>
                <button onClick={onDownload} title="Download"><i className="fas fa-download" /></button>
            </div>
            {shader.settings.map((setting, i) => <ShaderSetting key={i} data={setting} />)}
        </div>
    );
}

export default ShaderEditor;