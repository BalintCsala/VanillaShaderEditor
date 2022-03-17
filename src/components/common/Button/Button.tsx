import "./Button.css";
import React from "react";

interface Props {
    title?: string;
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}

export function Button({title, children, onClick, className}: Props) {
    return (
        <button className={`shader-editor-button ${className}`} title={title} onClick={onClick}>
            {children}
        </button>
    );
}