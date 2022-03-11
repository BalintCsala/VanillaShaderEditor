import React, {useCallback, useEffect} from "react";
import "./ShaderEditor.css";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderSetting from "./ShaderSetting/ShaderSetting";
import {collectZip, proxyFetch} from "../../../data/collectZip";
import {settingApply} from "../../../data/settings";
import {saveAs} from "file-saver";
import {endLoading, startLoading} from "../../../redux/loadingSlice";
import {useNavigate, useParams} from "react-router-dom";
import {loadSettings, resetSettings} from "../../../redux/settingsSlice";
import Loader from "../../common/Loader/Loader";
import {ShaderData, ShaderDataLink} from "../../../data/types";
import {setShader} from "../../../redux/shaderListSlice";

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
        if (typeof shader !== "undefined" && shader.hasOwnProperty("settingsLink")) {
            const externalShaderData = shader as ShaderDataLink;
            proxyFetch(externalShaderData.settingsLink)
                .then(res => res.json())
                .then(shaderData => dispatch(setShader(shaderData)))
        }

        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, [dispatch, shader, navigate, shader?.name, onBack]);

    if (typeof shader !== "undefined" && shader.hasOwnProperty("settingsLink")) {
        return <Loader />;
    } else if (typeof shader === "undefined") {
        return (
            <div className="shader-editor">
                <span>Something went wrong :(</span><br />
                <a href="/">Back to the home page</a>
            </div>
        );
    }

    const shaderData = shader as ShaderData;

    if (Object.keys(values).length === 0 && typeof shader !== "undefined") {
        dispatch(resetSettings(shaderData.settings ?? []));
    }

    const onLoad = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.addEventListener("change", e => {
            const targ = e.target as HTMLInputElement;
            const fileReader = new FileReader();
            const file = (targ.files ?? [])[0];
            if (file === null)
                return;
            fileReader.readAsText(file);
            fileReader.onload = e => {
                console.log(e.target?.result);
                dispatch(loadSettings(JSON.parse(e.target?.result as string)));
            };
        });
        input.click();
    };

    const onSave = async () => {
        let saved = JSON.stringify(values);
        let blob = new Blob([saved], { type: "text/plain" });
        saveAs(blob, shader.name + ".json");
    };

    const onDownload = async () => {
        dispatch(startLoading("Applying settings"));
        let zip = await collectZip(shaderData.url);
        for (let setting of shaderData.settings) {
            zip = await settingApply[setting.type](setting, values[setting.name], zip);
        }

        zip.generateAsync({type: "blob"})
            .then(blob => saveAs(blob, `${shader.name}.zip`))
            .then(() => dispatch(endLoading()));
    };

    const description = shaderData.longDescription ?? shaderData.description;

    return (
        <div className="shader-editor">
            <div className="top-row">
                <button onClick={onBack} title="Back"><i className="fas fa-arrow-left"/></button>
                <span className="name">{shader.name}</span>
                <div className="editor-controls">
                    <button onClick={onLoad} title="Load settings"><i className="fas fa-upload"/></button>
                    <button onClick={onSave} title="Save settings"><i className="fas fa-save"/></button>
                    <button onClick={onDownload} title="Download"><i className="fas fa-download"/></button>
                </div>
            </div>
            <div className="description">
                <img alt="thumbnail" src={shaderData.thumbnail}/>
                {description.split("\\n").map((line, i) => (
                    <span key={i}>
                        {line}<br/>
                    </span>
                ))}
            </div>
            <span className="settings-title">Settings</span>
            {shaderData.settings.map((setting, i) => <ShaderSetting key={i} data={setting} />)}
            <button onClick={onDownload} className="download-button"><i className="fas fa-download" /> Download shader</button>
        </div>
    );
}

export default ShaderEditor;