import React from "react";
import {T, Layer, Ajax} from "../../";

class LogClear extends React.Component {

    handleClearLogs = () => {
        Layer.confirm({
            content: T.C_System_Clear_Logs,
            onEnter: () => {
                Ajax({
                    url: 'ajax/ClearLogs.w',
                    onSuccess: () => {
                        Layer.msg({
                            content: T.A_Log_Clear_Success,
                        });
                    }
                });
            }
        });
    };

    render() {
        return <button className="btn ml-5" type="button" onClick={this.handleClearLogs}>
            {T.T_System_Log_Clear}
        </button>;
    }
}

export default LogClear;