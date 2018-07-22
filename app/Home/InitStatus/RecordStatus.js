import React from "react";
import {Ajax, T, Util} from "../../";

let totalTime = "";
let totalSize = "";
let recordMode = "";
class RecordStatus extends React.Component {
    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetRecordSettings.w",
            onSuccess: (data) => {
                recordMode = data['recordmode'];
                totalTime = data['recordtime'];
                totalSize = data['recordsize'];
            }
        });
    };

    render() {

        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        let data = this.props["data"];
        let inputStatusClass = (data.input_status === 1 ? " good-status" : " bad-status");
        let outputStatusClass = (data.output_status === 1 ? " good-status" : " bad-status");

        let sizeBar = (data["recordsize"] / totalSize) * 100 + "%";
        let timeBar = (data["recordtime"] / totalTime) * 100 + "%";

        const unitConversions = (obj) => {
            if (typeof obj === "number") {
                if (obj < 1024) {
                    return obj + " kbyte";
                } else if (obj >= 1024) {
                    return Math.round(obj / 1024) + " M";
                }
            }

        };
        let realValue = '';
        switch (parseInt(data["recordstatus"])) {
            case 0:
                realValue = T.T_Free;
                break;
            case 1:
                realValue = T.T_Recording;
                break;
            case 3:
                realValue = T.T_Recorded;
                break;
        }

        const recordTimeShow = () => {
            switch (parseInt(recordMode)) {
                case 0: //loop
                case 1: //size
                    return <span className="col-lg-9 col-sm-6 form-control-plaintext status-text"
                                 style={{marginLeft: "-1.145rem"}}
                                 title={Util.Date.secondToDate(data["recordtime"])}>
                        {Util.Date.secondToDate(data["recordtime"])}
                    </span>;

                case 2: //time
                    return <div className="progress col-lg-9 col-sm-6 p-0" style={style.bar}>
                        <div className="bg-success" role="progressbar" aria-valuenow={timeBar}
                             aria-valuemin="0" aria-valuemax="100" style={{width: timeBar}}>
                            <span style={{color: "#000", width: "15rem"}} className="d-block pl-1">
                                {Util.Date.secondToDate(data["recordtime"])}/{Util.Date.secondToDate(totalTime)}
                            </span>
                        </div>
                    </div>;
            }

        };

        const recordSizeShow = () => {
            switch (parseInt(recordMode)) {
                case 0: //loop
                case 2: //time
                    return <span className="col-sm-6 form-control-plaintext status-text"
                                 style={{marginLeft: "-1.145rem"}}
                                 title={unitConversions(data["recordsize"])}>
                        {unitConversions(data["recordsize"])}
                    </span>;
                case 1: //size
                    return <div className="progress col-sm-6 p-0" style={style.bar}>
                        <div className="bg-success" role="progressbar" aria-valuenow={sizeBar}
                             aria-valuemin="0" aria-valuemax="100" style={{width: sizeBar}}>
                            <span style={{color: "#000", width: "15rem"}} className="d-block pl-1">
                                {unitConversions(data["recordsize"])}/{unitConversions(totalSize)}
                            </span>
                        </div>
                    </div>;
            }
        };
        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Input_Status}: </label>
                        <span className={"col-sm-6 form-control-plaintext" + inputStatusClass}
                              title={data["input_status"] === 1 ? "Good" : "Bad"}>
                            {data["input_status"] === 1 ? "Good" : "Bad"}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Output_Status}: </label>
                        <span className={"col-sm-6 form-control-plaintext" + outputStatusClass}
                              title={data["output_status"] === 1 ? "Good" : "Bad"}>
                            {data["output_status"] === 1 ? "Good" : "Bad"}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Input}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["input"]}>
                            {data["input"]}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Output_File}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["output_file"]}>
                            {data["output_file"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Input_Resolution}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["input_resolution"]}>
                            {data["input_resolution"]}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label
                            className="col-lg-6 col-sm-6 col-form-label col-form-label-sm">{T.T_Output_Resolution}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["output_resoultion"]}>
                            {data["output_resoultion"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label
                            className="col-sm-6 col-form-label col-form-label-sm">{T.T_Status_Audio_Bitrate}(kbps): </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["audio_bitrate"]}>
                            {data["audio_bitrate"]}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label
                            className="col-sm-6 col-form-label col-form-label-sm">{T.T_Status_Video_Bitrate}(kbps): </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["video_bitrate"]}>
                            {data["video_bitrate"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label
                            className="col-sm-6 col-form-label col-form-label-sm"> {T.T_Encode_Audio_Sampling_Bitrate}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["audio_samplerate"]}>
                            {data["audio_samplerate"]}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm"> {T.T_Status_Encryption}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["encryptstream"] === 0 ? T.T_Status_Unencrypted : T.T_Status_Encrypted}>
                            {data["encryptstream"] === 0 ? T.T_Status_Unencrypted : T.T_Status_Encrypted}
                        </span>

                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-12 col-sm-12">
                        <label
                            className="col-lg-3 col-sm-6 col-form-label col-form-label-sm">{T.T_Record_Time}: </label>
                        {recordTimeShow()}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-12 col-sm-12">
                        <label
                            className="col-lg-3 col-sm-6 col-form-label col-form-label-sm">{T.T_Record_Size}: </label>
                        {recordSizeShow()}
                    </div>
                </div>

            </form>
        </div>
    }
}

export default RecordStatus;

let style = {
    bar: {
        backgroundColor: "#cbcdd0",
        display: "inline-block",
        margin: "0 0 -0.15rem -0.15rem"
    }
};