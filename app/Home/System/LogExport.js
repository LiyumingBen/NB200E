import React from "react";
import {T, Layer, Ajax} from "../../";

class LogExport extends React.Component {

    handleExportLogs = () => {
        Layer.confirm({
            content: T.C_System_Export_Logs,
            onEnter: () => {
                Ajax({
                    url: 'ajax/ExportLogs.w',
                    isLoadingShow: true,
                    isCodeErrorShow: true,
                    isOtherErrorShow: true,
                    onSuccess: (data) => {
                        this.refs['ifr'].src = data.uri;
                    }
                });
            }
        });
    };

    render() {
        return <button className="btn ml-5" type="button" onClick={this.handleExportLogs}>
            {T.T_System_Log_Export}
            <iframe ref="ifr" className="d-none"/>
        </button>;
    }
}

export default LogExport;