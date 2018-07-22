import React from "react";
import {withRouter} from "react-router-dom";
import {CollapseHeader, T, Ajax, Util, Layer, PageLeavePrompt,
    Validation, Image_computer, Image_drive,
    Image_cog} from "../";
import OutputSettings from "./LiveSreamSettings/LiveStreamGenral/OutputSettings";
import AudioEncodeSettings from "./LiveSreamSettings/LiveStreamAdvance/AudioEncodeSettings";
import VideoEncodeSettings from "./LiveSreamSettings/LiveStreamAdvance/VideoEncodeSettings";
import InputSettings from "./LiveSreamSettings/LiveStreamAdvance/InputSettings";
import LiveButton from "./LiveSreamSettings/LiveButton";
import _ from "underscore";


let originalData = {};
class LiveSreamSettings extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                input: 0,//输入信号
                output: 0,//输出信号
                url: "N/A",//url
                stream_name: "N/A",//name
                presets: 3, //presets

                /*AudioEncodeSettings*/
                audio_encodetype: 0,//音频编码模式
                audio_samplerate: 0,//音频采样率，单位 KHz
                audio_volume: 0,//音频音量，单位 dB
                audio_bitrate: 0, //音频码率, 单位 K

                /*InputSettings*/
                video_input: 0,
                audio_input: 0,
                source: 0, //输入输出信号
                mic: 1, //麦克风
                cc: 1,
                authorized_cc: false, //cc是否授权
                /*OutputSettings*/
                rtmp_serverip: "",//RTMP 服务器地址
                rtmp_serverport: "",//RTMP 服务器端口
                // rtmp_appname:"",//RTMP 上传目录名
                Encryt: "",
                rtmp_streamname: "",//RTMP 上传节点
                rtmp_username: "",//RTMP 上传用户名
                rtmp_password: "",//RTMP 上传密码
                udp_serverip: "", //UDP 服务器地址
                udp_serverport: "", //UDP 服务器端口

                /*VideoEncodeSettings*/
                video_encodetype: 0,//视频编码模式
                videotype_h256_authorized: false, //H256是否授权
                video_profile: 0,//视频类别
                video_resolution: "",//视频分辨率
                framerate: 0,//帧率，单位 FPS
                video_bitrate: 0,//视频码率，单位 kbps
                video_bitratemode: 0,//码率模式
                video_minbitrate: 0,//最小视频码率，单位 kbps
                video_maxbitrate: 0,//最大视频码率，单位 kbps
                video_aspect_ratio: 1, //视频宽高比


                serverpath: "N/A", //切片后的存放路径

                rtsp_serverpath: "N/A",  //切片后的存放路径
                liveflag: true, //是否直播
                sdi_authorized: false //SDI授权
            },
            advanceHide: true,
            generalHide: false,
            isCollapsed: [false, false, false]  // 初始折叠状态
        };
    }


    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetLiveStreamSettings.w",
            onSuccess: (data) => {
                data["udp_serverip"] = Util.IP.getIPFromApiValue(data["udp_serverip"]);
                this.setState({
                    data
                });
                originalData = $.extend(true, {}, this.state.data);
            }
        });
    };

    handleApply = () => {

        let data = $.extend(true, {}, this.state.data);

        //校验
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "url":
                case "streamname":
                case "audio_input":
                case "rtmp_streamname":
                case "rtmp_appname":
                case "rtmp_password":
                case "rtmp_username":
                case "video_input":
                case "rtmp_serverip":
                case "video_resolution":
                case "serverpath":
                case "rtsp_serverpath":
                    break;
                case "video_bitrate":
                    if (!Validation.isVideoRate(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Bitrate_Err(...Validation["range"].VideoRate)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "framerate":
                    if (!Validation.checkNumberRange(data[keys[i]], 20, 60)) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Video_Frame_Err(20, 60)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "video_minbitrate":
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "video_maxbitrate":
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "rtmp_serverport":
                    if (!Validation.isIPPort(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_RTMP_Serverport_Err(...Validation["range"].IPPort)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "udp_serverport":
                    if (!Validation.isIPPort(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_RTMP_Serverport_Err(...Validation["range"].IPPort)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "udp_serverip":
                    if (!Validation.isIP(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_IPAddress_FormatError
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(Util.IP.getApiValueFromIP(data[keys[i]]));
                    break;
                case "video_gop_size":
                    if (!Validation.isGOPSize(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_GOP_Size_Err(...Validation["range"].GOPSize)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                case "liveflag":
                    data[keys[i]] = !data[keys[i]];
                    break;
                default:
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
            }
        }

        //发送数据
        Ajax({
            url: "ajax/SetLiveStreamSettings.w",
            data: data,
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: this.initEntry,
                });
            }
        });
    };

    andvanceShow = () => {
        const {advanceHide} = this.state;
        this.setState({
            advanceHide: !advanceHide,
        });
    };

    generalShow = () => {
        const {generalHide} = this.state;
        this.setState({
            generalHide: !generalHide,
        });
    };

    render() {
        const {isCollapsed} = this.state;
        let n = -1;
        const a_HideClass = "list-group right-nav-title" + " " + (this.state.advanceHide ? "d-none" : "none");
        const g_HideClass = "list-group right-nav-title" + " " + (this.state.generalHide ? "d-none" : "none");

        return <div>
            <div className="container">
                <div className="list-group">
                    <div className="list-group right-nav-title border-bottom-0">
                        <div className="list-group-item list-group-item-action" onClick={this.generalShow.bind(this)}
                             style={{cursor: 'pointer'}}>
                            <img src={Image_computer} alt="" className="mr-2"/>{T.T_Settings_Basic_Settings}
                            <button type="button" className="btn btn-link btn-sm">
                            <span
                                className={this.state.generalHide ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up"}>
                            </span>
                            </button>
                        </div>
                        <div className={g_HideClass}>
                            <OutputSettings collapse={isCollapsed[n]} data={this.state.data}
                                            changeState={this.setState.bind(this)}/>
                        </div>
                    </div>

                    <div className="list-group right-nav-title border-top-0">
                        <div className="list-group-item list-group-item-action" onClick={this.andvanceShow.bind(this)}
                             style={{cursor: 'pointer'}}>
                            <img src={Image_drive} alt="" className="mr-2"/>{T.T_Settings_Advance_Settings}
                            <button type="button" className="btn btn-link btn-sm">
                            <span
                                className={this.state.advanceHide ? "glyphicon glyphicon-chevron-down" : "glyphicon glyphicon-chevron-up"}>
                            </span>
                            </button>
                        </div>

                        <div className={a_HideClass}>
                            {/*<CollapseHeader collapse={isCollapsed[++n]}
                                            handleCollapse={Util.handleCollapse.bind(this, n)}>
                                <img src={Image_cog} alt="" className="mr-2"/>{T.T_Input}
                            </CollapseHeader>*/}
                            <p className="wv-caption">
                                <img src={Image_cog} alt="" className="mr-2 mb-1"/>{T.T_Input}
                            </p>
                            <InputSettings collapse={isCollapsed[n]} data={this.state.data}/>

                            {/*<CollapseHeader collapse={isCollapsed[++n]}
                                            handleCollapse={Util.handleCollapse.bind(this, n)}>
                                <img src={Image_cog} alt="" className="mr-2"/>{T.T_Encode_Video}
                            </CollapseHeader>*/}
                            <p className="wv-caption">
                                <img src={Image_cog} alt="" className="mr-2 mb-1"/>{T.T_Encode_Video}
                            </p>
                            <VideoEncodeSettings collapse={isCollapsed[n]} data={this.state.data}/>

                           {/* <CollapseHeader collapse={isCollapsed[++n]}
                                            handleCollapse={Util.handleCollapse.bind(this, n)}>
                                <img src={Image_cog} alt="" className="mr-2"/>{T.T_Encode_Audio}
                            </CollapseHeader>*/}
                            <p className="wv-caption">
                                <img src={Image_cog} alt="" className="mr-2 mb-1"/>{T.T_Encode_Audio}
                            </p>
                            <AudioEncodeSettings collapse={isCollapsed[n]} data={this.state.data}/>
                        </div>
                    </div>
                </div>
                <LiveButton data={this.state.data} onHandleApply={this.handleApply.bind(this)}/>
            </div>
            <PageLeavePrompt data={_.isEqual(originalData, this.state.data)}/>
        </div>
    }
}

export default withRouter(LiveSreamSettings);