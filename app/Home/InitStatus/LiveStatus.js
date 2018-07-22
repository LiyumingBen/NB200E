import React from "react";
import T from "../../../common/Lang/T";

class LiveStatus extends React.Component {
    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        let data = this.props["data"];
        let checkPararmter = (name) => {
            let attr = {
                title: data[name] === 1 ? "Good" : "Bad",
                className: name === 'input_status' ?
                    "col-sm-6 form-control-plaintext" + (data['input_status'] ? " good-status" : " bad-status")
                    : "col-sm-6 form-control-plaintext" + (data['output_status'] ? " good-status" : " bad-status")
            };
            return attr;
        };

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Input_Status}: </label>
                        <span {...checkPararmter("input_status")}>
                            {data['input_status'] === 1 ? "Good" : "Bad"}
                        </span>
                    </div>

                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Output_Status}: </label>
                        <span {...checkPararmter("output_status")}>
                            {data['output_status'] === 1 ? "Good" : "Bad"}
                        </span>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Input}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text" title={data["input"]}>
                            {data["input"]}
                        </span>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Output}: </label>
                        <span className="col-sm-6 form-control-plaintext status-text"
                              title={data["output"]}>
                            {data["output"]}
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
                        <label className="col-sm-6 col-form-label col-form-label-sm">{T.T_Output_Resolution}: </label>
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
            </form>
        </div>
    }
}

export default LiveStatus;
