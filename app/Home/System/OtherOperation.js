import React from "react";
import {T} from "../../";
import Reboot from "./Reboot";
import FactorySettings from "./FactorySettings";
import LogClear from "./LogClear";
import LogExport from "./LogExport";
class OtherOperation extends React.Component {

    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <div className="text-center w-100">
                <button className="btn" type="button" onClick={() => Reboot()}>
                    {T.T_System_Reboot}
                </button>
                <FactorySettings/>
                <LogExport/>
                <LogClear/>
            </div>
        </div>
    }
}

export default OtherOperation;