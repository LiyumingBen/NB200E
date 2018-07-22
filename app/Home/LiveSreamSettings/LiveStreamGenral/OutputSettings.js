import React from "react";
import {T, Validation, Layer} from "../../../";

class OutputSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
        Validation.setRange("IPPort", 1, 65535);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.data
        });
    }

    handleChange = (name, event) => {
        let {data} = this.state;
        if (event.target.type === "checkbox") {
            data[name] = event.target.checked;
        } else {
            data[name] = event.target.value;
        }

        this.setState({
            data
        });

        if (name === 'presets') {
            if (parseInt(data['presets']) === 0) {
                Layer.alert({
                    icon: 1,
                    content: T.T_Tip_User_Defined
                });
            }
        }
    };

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        const {data} = this.state;
        const showItem = (name, value) => {
            let sTitle = "";
            let title = "";
            let type = "input";
            let optsArr = [];
            let checkClassName = "";
            let Disabled = "";
            Disabled = this.props.data['liveflag'] ? "" : true;
            switch (name) {
                case "rtmp_serverip":
                case "rtmp_serverport":
                case "rtmp_appname":
                case "rtmp_streamname":
                case "rtmp_username":
                case "rtmp_password":
                case "Encryt":
                    if (parseInt(data.rtmp_enable) === 0) {
                        return;
                    }
                    break;
                case "udp_serverip":
                case "udp_serverport":
                    if (parseInt(data.udp_enable) === 0) {
                        return;
                    }
                    break;
                case "serverpath":
                    if (parseInt(data.hls_enable) === 0) {
                        return;
                    }
                    break;
                case "rtsp_serverpath":
                    if (parseInt(data.rtsp_enable) === 0) {
                        return;
                    }
                    break;

            }

            switch (name) {
                case "input":
                    sTitle = T.T_Input;
                    type = "select";
                    optsArr = [
                        {val: 1, text: "HDMI"},
                        {val: 2, text: "SDI"}
                    ];

                    if(Number(data['sdi_authorized']) === 0){
                        optsArr.pop();
                    }
                    break;
                case "presets":
                    sTitle = T.T_Presets;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "User-Defined"},
                        {val: 1, text: "1080p-12000Kbps-192Kbps"},
                        {val: 2, text: "1080p-8000Kbps-192Kbps"},
                        {val: 3, text: "1080p-6000Kbps-128 Kbps"},
                        {val: 4, text: "1080p-4000Kbps-128Kbps"},
                        {val: 5, text: "720p-8000Kbps-192Kbps"},
                        {val: 6, text: "720p-6000Kbps-128Kbps"},
                        {val: 7, text: "720p-4000Kbps-128Kbps"},
                        {val: 8, text: "576p-4000Kbps-128Kbps"},
                        {val: 9, text: "576p-2000Kbps-96Kbps"},
                        {val: 10, text: "480p-4000Kbps-128Kbps"},
                        {val: 11, text: "480p-2000Kbps-96Kbps"},
                    ];
                    break;
                case "output":
                    sTitle = T.T_Output;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "UDP"},
                        {val: 1, text: "RTMP"},
                        {val: 2, text: "HLS"},
                        {val: 3, text: "RTSP"}
                    ];
                    break;
                case "rtmp_serverip":
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = "URL";
                    break;
                case "rtmp_serverport":
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = T.T_RTMP_Serverport;
                    checkClassName = Validation.isIPPort(data['rtmp_serverport']) ? "" : " bg_danger";
                    break;
                case "rtmp_streamname":
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = T.T_RTMP_Streamname;
                    break;
                case "Encryt":
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = T.T_Encryt;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "Disabled"},
                        {val: 1, text: "Enabled"},
                    ];
                    break;
                case "rtmp_username":
                    if (!parseInt(data['Encryt'])) {
                        return;
                    }
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = T.T_RTMP_Username;
                    break;
                case "rtmp_password":
                    if (!parseInt(data['Encryt'])) {
                        return;
                    }
                    if (parseInt(data['output']) !== 1) {
                        return false;
                    }
                    sTitle = T.T_RTMP_Password;
                    break;
                case "udp_serverip":
                    if (parseInt(data['output']) !== 0) {
                        return false;
                    }
                    sTitle = T.T_UDP_Serverip;
                    checkClassName = Validation.isIP(data['udp_serverip']) ? "" : " bg_danger";
                    break;
                case "udp_serverport":
                    if (parseInt(data['output']) !== 0) {
                        return false;
                    }
                    sTitle = T.T_UDP_Serverport;
                    checkClassName = Validation.isIPPort(data['udp_serverport']) ? "" : " bg_danger";
                    break;
                case "serverpath":
                    if (parseInt(data['output']) !== 2) {
                        return false;
                    }
                    sTitle = T.T_ServerPath;
                    Disabled = true;
                    break;
                case "rtsp_serverpath":
                    if (parseInt(data['output']) !== 3) {
                        return false;
                    }
                    sTitle = "RTSP URL";
                    Disabled = true;
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
                               title={title}
                               disabled={Disabled}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else if (type === "select") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm" value={value}
                                disabled={Disabled}
                                title={title}
                                onClick={this.props.changeState.bind(this)}
                                onChange={this.handleChange.bind(this, name)}>
                            {
                                optsArr.map(function (opt) {
                                    return <option key={opt.val} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="checkbox" style={{"marginTop": "14px"}} defaultChecked={value}
                               disabled={Disabled}
                               title={title}
                               onClick={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            }
        };

        return <div className="card-body border-0">
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

export default OutputSettings;