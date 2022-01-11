import React, {useState} from "react";
import "./App.css";
import {useAppSelector} from "./redux/store";
import Spinner from "./components/common/Spinner/Spinner";
import Content from "./components/Content/Content";
import HelpDialog from "./components/Content/HelpDialog/HelpDialog";

function App() {
    const loading = useAppSelector(state => state.loading.value)

    const [helpDialog, setHelpDialog] = useState(false);

    const [firstVisit, setFirstVisit] = useState(window.localStorage.getItem("visitedBefore") === null);

    return (
        <div className="app">
            <span className="page-title">Vanilla Shader Editor</span>
            <button onClick={() => {
                window.localStorage.setItem("visitedBefore", "yes");
                setFirstVisit(false);
                setHelpDialog(true);
            }} className={`help ${firstVisit ? "firstVisit" : ""}`} title="Help"><i className="fas fa-question-circle" /></button>
            <hr />
            <Content />
            {
                loading ? <Spinner /> : null
            }
            {helpDialog ? <HelpDialog setHelpDialog={setHelpDialog} /> : null}
        </div>
    );
}

export default App;
