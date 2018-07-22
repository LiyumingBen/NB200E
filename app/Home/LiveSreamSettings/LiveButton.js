import React from "react";
import {T} from "../../";

class LiveButton extends React.Component {

    render() {
        const liveButtonClass = this.props.data['liveflag'] ? "glyphicon glyphicon-play" : "glyphicon glyphicon-stop";
        return <div className="card-body">
            <div className="text-center w-100">
                <div className="text-center w-100">
                    <button type="button"
                            className={ this.props.data['liveflag'] ? "btn btn-success btn-xs" : "btn btn-stop btn-xs"}
                            onClick={this.props.onHandleApply}>
                            <span className={liveButtonClass}>
                            </span>
                        &nbsp;
                        {this.props.data['liveflag'] ? T.T_Start_Live_Stream : T.T_Stop_Live_Stream}
                    </button>
                </div>
            </div>
        </div>
    }
}

export default LiveButton;