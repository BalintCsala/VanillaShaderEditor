import React from "react";
import "./Loader.css";
import {useAppSelector} from "../../../redux/store";
import Spinner from "../Spinner/Spinner";

function Loader() {
    const message = useAppSelector(state => state.loading.message);

    return (
        <div className="loader">
            <div className="container">
                <Spinner />
                <span className="loading-message">{message}</span>
            </div>
        </div>
    );
}

export default Loader;