import React from "react";
import "./Spinner.css";
import {useAppSelector} from "../../../redux/store";

function Spinner() {
    const message = useAppSelector(state => state.loading.message);

    return (
        <div className="spinner">
            <div className="container">
                <div className="background">
                    <div className="circle"/>
                </div>
                <span className="loading-message">{message}</span>
            </div>
        </div>
    );
}

export default Spinner;