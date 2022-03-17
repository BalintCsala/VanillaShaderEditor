import React, {useRef, useState} from "react";
import "./ShaderList.css";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import ShaderListItem from "./ShaderListItem/ShaderListItem";
import {setShaders} from "../../../redux/shaderListSlice";
import {ShaderData} from "../../../data/types";
import {Button} from "../../common/Button/Button";

function checkTags(shaderTags: string[], required: string[]) {
    for (let requiredTag of required) {
        if (shaderTags.indexOf(requiredTag) === -1)
            return false;
    }
    return true;
}

function ShaderList() {
    const dispatch = useAppDispatch();
    const shaders = useAppSelector(state => state.shaderList);
    const tags = useAppSelector(state => state.tags);
    const developer = useAppSelector(state => state.developer);
    const fileRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState("");
    const [tagsOpen, setTagsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [currentDescription, setCurrentDescription] = useState("");

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
            <div className="search">
                <input placeholder="Search..." type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button title="Tags" onClick={() => setTagsOpen(!tagsOpen)}>
                    <i className="fas fa-tag"/>
                </Button>
            </div>
            <div className={`tags ${tagsOpen ? "open" : ""}`}>
                <span className="description">
                    {currentDescription}
                </span>
                <div className="list">
                    {tags.map(tag => (
                        <button className="tag" onClick={() => {
                            if (selectedTags.indexOf(tag.name) !== -1) {
                                setSelectedTags(selectedTags.filter(name => name !== tag.name));
                            } else {
                                setSelectedTags([...selectedTags, tag.name]);
                            }
                        }} onMouseEnter={() => setCurrentDescription(tag.description)}
                                onMouseLeave={() => setCurrentDescription("")}>
                            <i className="fas fa-tag fa-xs"/>
                            {tag.name}
                            <span className={`light ${selectedTags.indexOf(tag.name) !== -1 ? "active" : ""}`}/>
                        </button>
                    ))}
                </div>
            </div>
            {shaders
                .filter(shader => search === "" || shader.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                .filter(shader => selectedTags.length === 0 || checkTags(shader.tags ?? [], selectedTags))
                .map((shader, i) => (
                    <ShaderListItem key={i} data={shader}/>
                ))}
            {developer ? <div className="sideloader">
                <span className="sideloader-description">Load shaders.json</span>
                <button onClick={onLoadShaders} className="load-json">
                    <i className="fas fa-plus-circle"/>
                </button>
                <input ref={fileRef} type="file" className="file" accept=".json" onChange={onJSONSelected}/>
            </div> : null}
        </div>
    );
}

export default ShaderList;