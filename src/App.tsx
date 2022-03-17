import React, {useState} from "react";
import "./App.css";
import {useAppDispatch, useAppSelector} from "./redux/store";
import Loader from "./components/common/Loader/Loader";
import Content from "./components/Content/Content";
import HelpDialog from "./components/Content/HelpDialog/HelpDialog";
import DeveloperConfirm from "./components/DeveloperConfirm/DeveloperConfirm";
import {setDeveloper} from "./redux/developerSlice";
import {Button} from "./components/common/Button/Button";

function App() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.loading.value);
    const developer = useAppSelector(state => state.developer);
    const [helpDialog, setHelpDialog] = useState(false);
    const [firstVisit, setFirstVisit] = useState(window.localStorage.getItem("visitedBefore") === null);
    const [developerConfirm, setDeveloperConfirm] = useState(false);

    const onDeveloper = () => {
        setDeveloperConfirm(true);
    };

    const onDeveloperConfirm = () => {
        dispatch(setDeveloper(true));
        setDeveloperConfirm(false);
    };

    const onDeveloperCancel = () => {
        setDeveloperConfirm(false)
    };

    const onHelp = () => {
        window.localStorage.setItem("visitedBefore", "yes");
        setFirstVisit(false);
        setHelpDialog(true);
    };

    return (
        <div className="app">
            <a href="/" className="page-title">Vanilla Shader Editor</a>
            <div className="page-controls">
                {!developer ? <Button onClick={onDeveloper} className="developer" title="developer">
                    <i className="fas fa-wrench"/>
                </Button> : null}
                <Button onClick={onHelp} className={`help ${firstVisit ? "firstVisit" : ""}`} title="Help">
                    <i className="fas fa-question-circle"/>
                </Button>
            </div>
            <hr/>
            <Content/>
            {
                loading ? <Loader/> : null
            }
            {helpDialog ? <HelpDialog setHelpDialog={setHelpDialog}/> : null}
            {developerConfirm ? <DeveloperConfirm confirm={onDeveloperConfirm} cancel={onDeveloperCancel}/> : null}
        </div>
    );
}

export default App;
