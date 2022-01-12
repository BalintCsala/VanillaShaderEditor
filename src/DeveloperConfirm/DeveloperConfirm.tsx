import React from "react";
import "./DeveloperConfirm.css";

interface Props {
    confirm: () => any;
    cancel: () => any;
}


function DeveloperConfirm({confirm, cancel}: Props) {
    return (
        <div className="confirm">
            <div className="content">
                <span className="title">
                    Developer mode
                </span>
                <br/>
                <span className="description">
                    Do you wish to enable developer mode? This will let you test shaders.json files.
                </span>
                <div className="buttons">
                    <button onClick={cancel} className="cancel-button">Cancel</button>
                    <button onClick={confirm} className="confirm-button">Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeveloperConfirm;