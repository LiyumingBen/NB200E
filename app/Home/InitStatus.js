import React from "react";
import {Ajax, CollapseHeader, T, Util, Data, Image_snap} from "../";
import LiveStatus from "./InitStatus/LiveStatus";
import RecordStatus from "./InitStatus/RecordStatus";

class InitStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            initstatus: {
                "live_status": {
                    "input_status": "N/A",//输入状态
                    "output_status": "N/A",//输出状态
                    "input": "N/A",//输入信号
                    "output": "N/A",//输出信号
                    "input_resolution": "",//输入分辨率
                    "output_resoultion": "",//输出分辨率
                    "audio_samplerate": "N/A",//音频采样率，单位 KHz
                    "video_bitrate": "N/A",//视频码率，单位 kbps
                    "audio_bitrate": "N/A",//音频码率，单位 kbps
                    "encryptstream": "N/A" //是否为加密流
                },
                "record_status": {
                    "input_status": "N/A",//输入状态
                    "output_status": "N/A",//输出状态
                    "input": "N/A",//输入信号
                    "output_file": "N/A",//输出文件
                    "input_resolution": "",//输入分辨率
                    "output_resoultion": "",//输出分辨率
                    "audio_samplerate": "N/A",//音频采样率，单位 KHz
                    "video_bitrate": "N/A",//视频码率，单位 kbps
                    "audio_bitrate": "N/A",//音频码率，单位 kbps
                    "encryptstream": "N/A" //是否为加密流
                },
                "hdcp_authorized": "",
                "encryption_stream": "",
                "h265_authorized": "",
                "cc_authorized": ""
            },
            isCollapsed: [false, false],  // 初始折叠状态
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    componentWillUnmount() {
        Data.updatePictureTask.status = null;
    }

    initEntry() {

        Data.updatePictureTask.status = (showLoading = false) => {
            Ajax({
                url: "ajax/GetInitStatus.w",
                isLoadingShow: showLoading,
                isCodeErrorShow: showLoading,
                isOtherErrorShow: showLoading,
                onSuccess: (data) => {
                    this.setState({
                        initstatus: data
                    });
                }
            });
        };
        Data.updatePictureTask.status(true);
    };

    render() {
        const {isCollapsed, initstatus} = this.state;
        let n = -1;
        const showHDCP_Auth = () => {
            let HDCP = '';
            let CC = '';
            let H265 = '';
            let allShow = [];
            if (initstatus['hdcp_authorized'] === 0) {
                if (initstatus['encryption_stream'] === 1) {
                    HDCP = <span>{T.A_Encryption_Stream_Authorized}</span>;
                } else {
                    HDCP = <span>{T.A_HDCP_Unauthorized}</span>
                }
            }

            if (initstatus['cc_authorized'] === 0) {
                CC = <span>
                    &nbsp;{initstatus['hdcp_authorized'] === 0 ? "/" : null}&nbsp;{T.A_CC_Unauthorized}
                    </span>;
            }

            if (initstatus['h265_authorized'] === 0) {
                H265 = <span>
                    &nbsp;{(initstatus['hdcp_authorized'] === 0 || initstatus['cc_authorized'] === 0) ? "/" : null}&nbsp;{T.A_H265_Unauthorized}
                    </span>;
            }

            allShow = [HDCP, CC, H265];
            return <div className="alert alert-info">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span>
                {allShow}
            </div>;
        };

        return <div>
            <div className="container">
                {/*<div style={{marginBottom: "-5px"}}>
                    {showHDCP_Auth()}
                </div>*/}
                <div className="list-group">
                    <div className="list-group right-nav-title">
                        <div className="card-body">
                            <img
                                src={process.env.NODE_ENV === 'development' ? Image_snap : "snapic/snap.jpg" + "?picture=" + Util.getUUID()}
                                alt="sorry no picture" title="Picture Precview"/>
                        </div>
                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            {T.T_Live_Stream}
                        </CollapseHeader>
                        <LiveStatus collapse={isCollapsed[n]} data={initstatus["live_status"]}/>
                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            {T.T_Record_Stream}
                        </CollapseHeader>
                        <RecordStatus collapse={isCollapsed[n]} data={initstatus["record_status"]}/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default InitStatus;