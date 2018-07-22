import React from "react";
import {CollapseHeader, T, Ajax, PageLeavePrompt, Layer, Util, Validation, Image_computer} from "../";
import RecordGeneralSettings from "./RecordSettings/RecordGeneralSettings";
import RecordButton from "./RecordSettings/RecordButton";
import _ from "underscore";

let originalData = {};
class RecordSettings extends React.Component {
    constructor() {
        super();
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
                usdexist: "N/A", //SD是否存在
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
                stream_name: "N/A", //name
                usb_filesystem: "N/A", //USB文件系统
                sd_filesystem: "N/A", //SD文件系统
                iswriteableusb: "N/A", //USB是否可写
                iswriteablesd: "N/A" //SD是否可写
            },
            isCollapsed: [false]  // 初始折叠状态
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/GetRecordSettings.w",
            onSuccess: (data) => {
                data['recordtime'] = Util.Date.secondToDate(data['recordtime']);
                this.setState({
                    data: data
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
                case "recordname":
                case "recordflag":
                case "sd_filesystem":
                case "usb_filesystem":
                    break;
                case "recordtime":
                    let TimeReg = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
                    if (!TimeReg.test(data['recordtime'])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Time_Format_Error
                        });
                        return;
                    }
                    data['recordtime'] = Util.Date.DateToSecond(data[keys[i]]);
                    break;
                case "recordsize":
                    if (!Validation.checkNumberRange(data[keys[i]], 0, 2097152)) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Record_Size_Err(0, 2097152)
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
                default:
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
            }
        }

        //发送数据
        Ajax({
            url: "ajax/SetRecordSettings.w",
            data: data,
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: this.initEntry,
                });
            }
        });
    };

    render() {
        const {isCollapsed} = this.state;
        let n = -1;

        return <div>
            <div className="container">
                <div className="list-group">
                    <div className="list-group right-nav-title">
                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_computer} alt="" className="mr-2"/>{T.T_Settings_Basic_Settings}
                        </CollapseHeader>
                        <RecordGeneralSettings collapse={isCollapsed[n]} data={this.state.data}/>
                    </div>
                </div>
                <RecordButton data={this.state.data} onHandleApply={this.handleApply.bind(this)}/>
            </div>
            <PageLeavePrompt data={_.isEqual(originalData, this.state.data)}/>
        </div>
    }
}

export default RecordSettings;