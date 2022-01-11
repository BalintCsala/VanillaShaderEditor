import React from "react";
import "./ShaderListItem.css";
import MissingThumbnail from "./missing_thumbnail.png";
import {collectZip} from "../../../../data/collectZip";
import {saveAs} from "file-saver";
import {useAppDispatch} from "../../../../redux/store";
import {endLoading, startLoading} from "../../../../redux/loadingSlice";
import {setSelected} from "../../../../redux/shaderListSlice";
import {resetSettings} from "../../../../redux/settingsSlice";
import {ShaderData} from "../../../../data/types";

interface Props {
    data: ShaderData
}

function ShaderListItem({data}: Props) {
    const dispatch = useAppDispatch();

    const onDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(startLoading("Loading ZIP"));
        collectZip(data.url)
            .then(zip => zip.generateAsync({type: "blob"}))
            .then(blob => saveAs(blob, `${data.name}.zip`))
            .then(() => dispatch(endLoading()));
    };

    const onEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.history.pushState("", document.title, `/${data.name}`);
        dispatch(resetSettings(data.settings));
        dispatch(setSelected(data.name));
    };

    return (
        <div onClick={onEdit} className="shader-list-item">
            <img alt="thumbnail" src={data.thumbnail ?? MissingThumbnail} />
            <div className="data-container">
                <div className="highlight"><span className="name">{data.name}</span> by <a target="_blank" onClick={e => e.stopPropagation()} className="creator" href={data.creatorLink ?? ""} rel="noreferrer">{data.creator}</a></div>
                <span className="description">{data.description}</span>
            </div>
            <div className="controls">
                <a title="Link to the shader" target="_blank" onClick={e => e.stopPropagation()} href={data.link ?? data.url} rel="noreferrer"><i className="fas fa-link" /></a>
                <a title="Edit shader" href="/" onClick={onEdit}><i className="fas fa-edit" /></a>
                <a title="Download shader without editing" href="/" onClick={onDownload}><i className="fas fa-download" /></a>
            </div>
        </div>
    );
}

export default ShaderListItem;