import React from "react";
import ShaderList from "./ShaderList/ShaderList";
import ShaderEditor from "./ShaderEditor/ShaderEditor";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {endLoading, startLoading} from "../../redux/loadingSlice";
import {setShaders} from "../../redux/shaderListSlice";
import {ShaderData, Tag} from "../../data/types";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setTags} from "../../redux/tagsSlice";

const SHADERS_JSON_URL = "https://raw.githubusercontent.com/BalintCsala/ConfigurableVanillaShaders/main/shaders.json";
const TAGS_JSON_URL = "https://raw.githubusercontent.com/BalintCsala/ConfigurableVanillaShaders/main/tags.json";

function Content() {
    const dispatch = useAppDispatch();
    const shaders = useAppSelector(state => state.shaderList);

    if (shaders.length === 0) {
        dispatch(startLoading("Loading shaders"));

        Promise.all([
            fetch(SHADERS_JSON_URL)
                .then(res => res.json())
                .then(shaderData => dispatch(setShaders(shaderData as ShaderData[]))),
            fetch(TAGS_JSON_URL)
                .then(res => res.json())
                .then(tags => dispatch(setTags(tags as Tag[]))),
        ])
            .then(() => dispatch(endLoading()));
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:shader" element={<ShaderEditor/>}/>
                <Route path="/" element={<ShaderList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Content;