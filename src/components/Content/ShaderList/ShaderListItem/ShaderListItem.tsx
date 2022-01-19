import React, {useState} from "react";
import "./ShaderListItem.css";
import MissingThumbnail from "./missing_thumbnail.png";
import {collectZip} from "../../../../data/collectZip";
import {saveAs} from "file-saver";
import {useAppDispatch} from "../../../../redux/store";
import {endLoading, startLoading} from "../../../../redux/loadingSlice";
import {resetSettings} from "../../../../redux/settingsSlice";
import {ShaderData, ShaderDataLink} from "../../../../data/types";
import {useNavigate} from "react-router-dom";
import {setShader} from "../../../../redux/shaderListSlice";
import Spinner from "../../../common/Spinner/Spinner";
import Placeholder from "../../../common/Placeholder/Placeholder";

interface Props {
    data: ShaderData | ShaderDataLink
}

function ShaderListItem({data}: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);

    if (!isDownloading && data.hasOwnProperty("settingsLink")) {
        const settingsData = data as ShaderDataLink;
        fetch(settingsData.settingsLink ?? "")
            .then(response => response.json())
            .then(settings => {
                dispatch(setShader(settings as ShaderData));
                setIsDownloading(false);
            });
        setIsDownloading(true);
    }

    if (isDownloading) {
        return (
            <div className="shader-list-item downloading">
                <div className="thumbnail">
                    <Spinner />
                </div>
                <div className="data-container">
                    <Placeholder width={10} height={1.5} />
                    <Placeholder width={20} />
                </div>
                <div className="controls">
                    <Placeholder width={2.5} height={2.5} margin={0} />
                    <Placeholder width={2.5} height={2.5} margin={0} />
                    <Placeholder width={2.5} height={2.5} margin={0} />
                </div>
            </div>
        );
    }

    const shaderData = data as ShaderData;
    const onDownload = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(startLoading("Loading ZIP"));
        collectZip(shaderData.url)
            .then(zip => zip.generateAsync({type: "blob"}))
            .then(blob => saveAs(blob, `${shaderData.name}.zip`))
            .then(() => dispatch(endLoading()));
    };

    const onEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(resetSettings(shaderData.settings));
        navigate(`/${shaderData.name}`);
    };

    return (
        <div onClick={onEdit} className="shader-list-item">
            <img className="thumbnail" alt="thumbnail" src={shaderData.thumbnail ?? MissingThumbnail} />
            <div className="data-container">
                <div className="highlight"><span className="name">{shaderData.name}</span> by <a target="_blank" onClick={e => e.stopPropagation()} className="creator" href={shaderData.creatorLink ?? ""} rel="noreferrer">{shaderData.creator}</a></div>
                <span className="description">{shaderData.description}</span>
            </div>
            <div className="controls">
                <a title="Link to the shader" target="_blank" onClick={e => e.stopPropagation()} href={shaderData.link ?? shaderData.url} rel="noreferrer"><i className="fas fa-link" /></a>
                <a title="Edit shader" href="/" onClick={onEdit}><i className="fas fa-edit" /></a>
                <a title="Download shader without editing" href="/" onClick={onDownload}><i className="fas fa-download" /></a>
            </div>
        </div>
    );
}

export default ShaderListItem;