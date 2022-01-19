import React from "react";
import "./Placeholder.css";

interface Props {
    width: number;
    height?: number;
    margin?: number;
}

function Placeholder({width, height, margin}: Props) {
    return (
        <div className="placeholder" style={{
            width: `${width}em`,
            height: typeof height !== "undefined" ? `${height}em` : "1em",
            margin: typeof margin !== "undefined" ? `${margin}em` : "0.5em"
        }}>

        </div>
    );
}

export default Placeholder;