import React from "react";
import {T, Data, Ajax} from "../../";

class RecordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                recordflag: "N/A"
            },
            sData: this.props.data
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            sData: newProps.data
        });
    }

    componentDidMount() {
        this.initEntry();
    }

    componentWillUnmount() {
        Data.updateUnitTask.recordStatus = null;
    }

    initEntry = () => {

        Data.updateUnitTask.recordStatus = (showLoading = false) => {
            Ajax({
                url: "ajax/GetRecordSettings.w",
                isLoadingShow: showLoading,
                isCodeErrorShow: showLoading,
                isOtherErrorShow: showLoading,
                onSuccess: (data) => {
                    this.setState({
                        data: data
                    });
                }
            });
        };

        Data.updateUnitTask.recordStatus(true);
    };

    render() {
        const recoderButtonClass = this.state.sData['recordflag'] ? "glyphicon glyphicon-play" : "glyphicon glyphicon-stop";
        return <div className="card-body">
            <div className="text-center w-100">
                <div className="text-center w-100">
                    <button type="button"
                            className={ this.state.sData['recordflag'] ? "btn btn-success btn-xs" : "btn btn-stop btn-xs"}
                            onClick={this.props.onHandleApply}>
                            <span className={recoderButtonClass}>
                            </span>
                        &nbsp;
                        {this.state.sData['recordflag'] ? T.T_Start_Recording : T.T_Stop_Recording}
                    </button>
                </div>
            </div>
        </div>
    }
}

export default RecordButton;