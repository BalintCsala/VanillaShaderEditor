import React from "react";
import "./HelpDialog.css";

interface Props {
    setHelpDialog: (value: boolean) => void;
}

function HelpDialog({setHelpDialog}: Props) {
    return (
        <div className="help-dialog">
            <div className="content">
                <button onClick={() => setHelpDialog(false)} className="exit"><i className="fas fa-times" /></button>
                <span className="title">Help/About</span><br />
                <p>
                    This page was made to make shader editing easier. You can click on any shaders below to edit it
                    or you can click the download button (<i className="fas fa-download" />) on the bottom right if you
                    just want to try it out (keep in mind: not all shaders will work well with this option).
                    You can also click on the link icon (<i className="fas fa-link" />) to go to main page of the pack.
                </p>
                <p>
                    If you find any issues with this site, please report using one of the following options:<br />
                    <br />
                    <span className="highlight"><i className="fas fa-envelope" /> Email: balintcsala@gmail.com</span><br />
                    <i className="highlight fab fa-github" /> <a className="highlight" href="https://github.com/BalintCsala/ConfigurableVanillaShaders/issues">GitHub issues page</a><br />
                    <span className="highlight"><i className="fab fa-discord" /> Discord: Bálint#1673</span>
                </p>
                <p>
                    If you find a bug in one of the shaders below, please <u>don't</u> report it using one of the options above,
                    as they might have been created by a separate person, refer to their original pages instead.
                </p>
                <p>
                    The shaders here can be under a licence which prohibits sharing them. Don't send the results to others,
                    send them a link to this site instead.
                </p>
                <p>
                    If you are a shader developer and want your work to be featured on this site, start <a className="highlight" href="https://github.com/BalintCsala/ConfigurableVanillaShaders">here</a>.
                </p>
                <p>
                    Abusing this service will result in a permanent and irreversible IP ban.
                </p>
            </div>
        </div>
    );
}

export default HelpDialog;