import React from "react";
import {T, Validation} from "../../../";

class VideoEncodeSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("VideoRate", 500, 12000);
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

        const showItem = (name, value) => {
            let sTitle = "";
            let type = "input";
            let optsArr = [];
            let attr = {};
            let checkClassName = "";
            let Disabled = "";
            Disabled = this.props.data['liveflag'] ? "" : true;
            switch (name) {
                case "video_encodetype":
                    sTitle = T.T_Encode_Video_Type;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "H264"},
                        {val: 1, text: "H265"},
                    ];
                    if (!data['videotype_h256_authorized']) {
                        optsArr.pop();
                    }
                    break;
                case "video_profile":
                    sTitle = T.T_Encode_Profile;
                    type = "select";
                    parseInt(data['video_encodetype']) === 1 ?
                        optsArr = [
                            {val: 1, text: "Main"},
                        ] : optsArr = [
                            {val: 2, text: "High"},
                            {val: 1, text: "Main"},
                            {val: 0, text: "Baseline"},
                        ];
                    break;
                case "video_resolution":
                    sTitle = T.T_Encode_Video_Resolution;
                    type = "select";

                    if (!Disabled) {
                        Disabled = (parseInt(data["presets"]) !== 0 ? "disabled" : "");
                    }

                    optsArr = [
                        {val: "1920x1080", text: "1920x1080"},
                        {val: "1680x1200", text: "1680x1200"},
                        {val: "1600x900", text: "1600x900"},
                        {val: "1440x1050", text: "1440x1050"},
                        {val: "1440x900", text: "1440x900"},
                        {val: "1360x768", text: "1360x768"},
                        {val: "1280x720", text: "1280x720"},
                        {val: "1280x800", text: "1280x800"},
                        {val: "1280x768", text: "1280x768"},
                        {val: "1024x768", text: "1024x768"},
                        {val: "1024x576", text: "1024x576"},
                        {val: "960x540", text: "960x540"},
                        {val: "850x480", text: "850x480"},
                        {val: "800x600", text: "800x600"},
                        {val: "720x576", text: "720x576"},
                        {val: "720x540", text: "720x540"},
                        {val: "720x480", text: "720x480"},
                        {val: "720x404", text: "720x404"},
                        {val: "704x576", text: "704x576"},
                        {val: "640x480", text: "640x480"},
                        {val: "640x360", text: "640x360"},
                        {val: "480x270", text: "480x270"},
                        {val: "auto", text: T.T_Settings_Automatic},
                    ];
                    break;
                case "framerate":
                    sTitle = T.T_Encode_VideoFrameRate + "(FPS)";
                    checkClassName = Validation.checkNumberRange(data['framerate'], 20, 60) ? "" : " bg_danger";
                    break;
                case "video_bitrate":
                    if (!Disabled) {
                        Disabled = (parseInt(data["presets"]) !== 0 ? "disabled" : "");
                    }

                    sTitle = T.T_Encode_Video_Bitrate + "(kbps)";
                    checkClassName = Validation.checkNumberRange(data['video_bitrate'], 600, 20000) ? "" : " bg_danger";
                    break;
                case "video_gop_size":
                    sTitle = T.T_Encode_GOP_Size;
                    checkClassName = Validation.checkNumberRange(data['video_gop_size'], 1, 61) ? "" : " bg_danger";
                    break;

                case "video_aspect_ratio":
                    sTitle = T.T_Encode_Video_Aspect_Ratio;
                    type = "select";

                    if (!Disabled) {
                        Disabled = (parseInt(data["video_encodetype"]) === 1 ? "disabled" : "");
                    }

                    optsArr = [
                        {val: 0, text: "Automatic"},
                        {val: 1, text: "16x9(SD)"},
                        {val: 3, text: "4x3(SD)"},
                    ];
                    break;
                case "video_bitratemode":
                    sTitle = T.T_Encode_Video_Mode;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "CBR"},
                        {val: 1, text: "VBR"},
                    ];
                    break;
                case "video_minbitrate":
                    sTitle = T.T_Encode_Video_Min_Bitrate + "(kbps)";
                    attr["readOnly"] = (parseInt(data["video_bitratemode"]) === 0 ? "readOnly" : "");
                    break;
                case "video_maxbitrate":
                    sTitle = T.T_Encode_Video_Max_Bitrate + "(kbps)";
                    attr["readOnly"] = (parseInt(data["video_bitratemode"]) === 0 ? "readOnly" : "");
                    break;
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className={"form-control form-control-sm" + checkClassName}
                               value={value}
                               {...attr}
                               disabled={Disabled}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={value}
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

export default VideoEncodeSettings;