import React from "react";
import {useAppSelector} from "../../redux/store";
import ShaderList from "./ShaderList/ShaderList";
import ShaderEditor from "./ShaderEditor/ShaderEditor";

function Content() {
    const selected = useAppSelector(state => state.shaderList.selected);

    return (
        <div className="content">
            {selected === "" ? <ShaderList /> : <ShaderEditor /> }
        </div>
    );
}

export default Content;