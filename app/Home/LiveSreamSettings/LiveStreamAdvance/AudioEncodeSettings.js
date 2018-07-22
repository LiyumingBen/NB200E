import React from "react";
import {T, Validation} from "../../../";

class AudioEncodeSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("Volume", -12, 12);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.data
        });
    }

    handleChange = (name, event) => {
        let {data} = this.state;
        data[name] = event.target.value;

        this.setState({
            data
        });
    };

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        const {data} = this.state;
        let Disabled = "";
        Disabled = this.props.data['liveflag'] ? "" : true;
        const showItem = (name, value) => {
            let sTitle = "";
            let type = "input";
            let optsArr = [];
            switch (name) {
                case "audio_encodetype":
                    sTitle = T.T_Encode_Audio_Type;
                    type = "select";
                    optsArr = [
                        {val: 2, text: "AAC"},
                    ];
                    break;
                case "audio_samplerate":
                    sTitle = T.T_Encode_Audio_Sampling_Bitrate + "(KHz)";
                    type = "select";
                    optsArr = [
                        {val: 2, text: "48"}
                    ];
                    break;
                case "audio_bitrate":
                    sTitle = T.T_Encode_Audio_Bitrate + "(kbps)";
                    type = "select";

                    if (!Disabled) {
                        Disabled = (parseInt(data["presets"]) !== 0 ? "disabled" : "");
                    }

                    optsArr = [
                        {val: 0, text: "32"},
                        {val: 1, text: "48"},
                        {val: 2, text: "56"},
                        {val: 3, text: "64"},
                        {val: 4, text: "80"},
                        {val: 5, text: "96"},
                        {val: 6, text: "112"},
                        {val: 7, text: "128"},
                        {val: 8, text: "160"},
                        {val: 9, text: "192"},
                        {val: 10, text: "224"},
                        {val: 11, text: "246"},
                        {val: 12, text: "256"},
                        {val: 13, text: "320"},
                        {val: 14, text: "384"},
                        {val: 15, text: "448"},
                        {val: 16, text: "BITRATE_MAX"}
                    ];
                    break;
                /*case "audio_volume":
                 sTitle = T.T_Encode_Volume + "(dB)";
                 break;*/
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className="form-control form-control-sm"
                               value={value}
                               disabled={Disabled}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm"
                                value={value}
                                disabled={Disabled}
                                onChange={this.handleChange.bind(this, name)}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt.val} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>

                    </div>
                </div>
            }

        };

        return <div className="card-body ml-2">
            <form>
                {
                    Object.keys(data).map(function (key) {
                        return showItem(key, data[key]);
                    })
                }
            </form>
        </div>
    }
}


export default AudioEncodeSettings;