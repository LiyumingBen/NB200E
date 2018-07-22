import React from "react";
import {T, Data, Ajax} from "../../";

class SafetyRemove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                input: "N/A",//输入信号
                output: "N/A",//输出信号
                usbtotalsize: "N/A", //USB总存储
                usbusesize: "N/A", //USB使用存储
                usbexist: "N/A", //USB是否存在
                unmountusb: "N/A", //USB是否拔出
                sdtotalsize: "N/A", //SD总存储
                sdusesize: "N/A", //SD使用存储
                sdexist: "N/A", //SD是否存在
                unmountsd: "N/A", //SD是否拔出
                isrecord: "N/A", //是否开启录制模块
                recordname: "N/A", //录播名称
                recordmode: "N/A",//录播模式
                storagedevice: "N/A", //存储类型
                recordsize: "N/A", //录播大小
                recordtime: "N/A", //录播时间
                recordflag: "N/A", //是否录制
                istimeloop: "N/A", //是否为时间录制
                issizeloop: "N/A", //是否为大小录制
                url: "N/A",//url
                stream_name: "N/A" //name
            },
            isCollapsed: [false, false], // 初始折叠状态
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    componentWillUnmount() {
        Data.updateUnitTask.safetyRemoveStatus = null;
    }

    initEntry = () => {

        Data.updateUnitTask.safetyRemoveStatus = (showLoading = false) => {
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

        Data.updateUnitTask.safetyRemoveStatus(true);
    };

    render() {

        let {data} = this.state;
        let USBBar = ((data["usbusesize"] / data['usbtotalsize']) * 100).toFixed(2);
        let SDBar = ((data["sdusesize"] / data['sdtotalsize']) * 100).toFixed(2);
        let barColor = '';
        const barShow = (barValue) => {
            if (barValue <= 60) {
                barColor = "bg-success";
            } else if (barValue >= 80) {
                barColor = "bg-danger";
            } else {
                barColor = "bg-warning";
            }
            return barColor;
        };

        const unitConversions = (obj) => {
            if (typeof obj === "number") {
                if (obj < 1) {
                    return (obj * 1024).toFixed(2) + " KB";
                } else if (obj > 1024) {
                    return (obj / 1024).toFixed(2) + " GB";
                } else if (obj > 1024 * 1024) {
                    return (obj / (1024 * 1024)).toFixed(2) + " TB";
                } else {
                    return (obj).toFixed(2) + " MB";
                }
            }

        };


        let writePowerInfo = "";
        const writePower = (exit, odata, type) => {
            if (odata || !exit) {
                return null;
            } else {
                if (type === "SD") {
                    writePowerInfo = T.T_SD_Not_Written;
                } else {
                    writePowerInfo = T.T_USB_Not_Written;
                }

                return <div className="form-group row">
                    <label
                        className="col-5 col-sm-3 col-form-label col-form-label-sm">{type} {T.T_Written_Permission}:</label>
                    <div className="row ml-3 text-danger">{writePowerInfo}</div>
                </div>
            }
        };

        let fileSystemInfo = "";
        const fileSysystem = (exit, odata, type) => {
            if (!odata || !exit) {
                return null;
            } else {
                if (type === "SD") {
                    fileSystemInfo = T.T_SD_File_System;
                } else {
                    fileSystemInfo = T.T_USB_File_System;
                }

                return <div className="form-group row">
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{fileSystemInfo}:</label>
                    <div className="row ml-3">{odata}</div>
                </div>
            }
        };

        const USBShowInfo = () => {
            return data['usbexist'] ? <div className="col-7" style={{display: "flex"}}>
                    <div className="progress mt-2 col-lg-12" style={{backgroundColor: "#cbcdd0"}}>
                        <div className={barShow(USBBar)} role="progressbar" aria-valuenow={USBBar + "%"}
                             aria-valuemin="0" aria-valuemax="100" style={{width: USBBar + "%", marginLeft: "-0.95rem"}}>
                            <span
                                style={{color: "#000", padding: '0.25rem'}}>{unitConversions(data["usbusesize"])}/{unitConversions(data['usbtotalsize'])}</span>
                        </div>
                    </div>
                    <span className="m-2" style={{fontSize: "0.75rem"}}>{USBBar}%</span>
                </div> : <div className="row ml-3" style={{color: "#f8981d"}}>USB {T.T_NOt_Inserted}</div>;
        };

        const SDShowInfo = () => {
            return data['sdexist'] ? <div className="col-7" style={{display: "flex"}}>
                    <div className="progress mt-2 col-lg-12" style={{backgroundColor: "#cbcdd0"}}>
                        <div className={barShow(SDBar)} role="progressbar" aria-valuenow={SDBar + "%"}
                             aria-valuemin="0" aria-valuemax="100" style={{width: SDBar + "%", marginLeft: "-0.95rem"}}>
                            <span
                                style={{color: "#000", padding: '0.25rem'}}>{unitConversions(data["sdusesize"])}/{unitConversions(data['sdtotalsize'])}</span>
                        </div>
                    </div>
                    <span className="m-2" style={{fontSize: "0.75rem"}}>{SDBar}%</span>
                </div> : <div className="row ml-3" style={{color: "#f8981d"}}>SD {T.T_NOt_Inserted}</div>;
        };

        return <div>
            <div className="form-group row">
                <label className="col-lg-3  col-5 col-form-label col-form-label-sm">USB:</label>
                {USBShowInfo()}
                {data['usbexist'] ? <div className="col-lg-2 col-sm-12" style={{textAlign: "center"}}>
                        <button type="button" className="btn btn-sm ml-5"
                                style={{fontSize: "0.75rem", height: "1.45rem", padding: "0.15rem 0.35rem"}}
                                onClick={this.props.onHandleSafetyRemove.bind(this, 0)}>
                            {T.T_Safety_Remove}
                        </button>
                    </div> : null}

            </div>
            <div className="form-group row">
                <label className="col-lg-3 col-5 col-form-label col-form-label-sm">SD:</label>
                {SDShowInfo()}
                {data['sdexist'] ? <div className="col-lg-2 col-sm-12 mb-2" style={{textAlign: "center"}}>
                        <button type="button" className="btn btn-sm p-1"
                                style={{fontSize: "0.75rem", height: "1.45rem", padding: "0.15rem 0.35rem"}}
                                onClick={this.props.onHandleSafetyRemove.bind(this, 1)}>
                            {T.T_Safety_Remove}
                        </button>
                    </div> : null}

            </div>
            {fileSysystem(data['usbexist'], data['usb_filesystem'], 'USB')}
            {fileSysystem(data['sdexist'], data['sd_filesystem'], 'SD')}
            {writePower(data['usbexist'], data['iswriteableusb'], "USB")}
            {writePower(data['sdexist'], data['iswriteablesd'], "SD")}
        </div>
    }
}

export default SafetyRemove;