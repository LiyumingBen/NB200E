import React from "react";
import {T, Ajax, Layer, Validation} from "../../";
import SafetyRemove from "./SafetyRemove";

class RecordGeneralSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
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

    handleSafetyRemove = (type) => {

        let content = type === 0 ? (T.C_Remove_USB) : (T.C_Remove_SD);
        Layer.confirm({
            content: content,
            onEnter: () => {
                Ajax({
                    url: "ajax/SafetyRemoveUSBOrSD.w",
                    data: {
                        isflag: type  // 0: USB  1: SD
                    },
                    onSuccess: () => {
                        Layer.msg({
                            content: T.A_Remove_Success
                        });
                    }
                });
            }
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
            let Disabled = "";
            let checkClassName = "";
            Disabled = data['recordflag'] ? "" : true;
            switch (name) {
                case "recordname":
                    sTitle = T.T_Record_name;
                    break;
                case "recordmode":
                    sTitle = T.T_Record_Mode;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "Loop"},
                        {val: 1, text: "Size"},
                        {val: 2, text: "Time"},
                    ];
                    break;
                case "storagedevice":
                    sTitle = T.T_StorageDevice;
                    type = "select";
                    optsArr = [
                        {val: 0, text: "USB"},
                        {val: 1, text: "SD"},
                    ];
                    break;
                case "recordtime":
                    let TimeReg = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
                    if (parseInt(data['recordmode']) !== 2) {
                        return;
                    }
                    sTitle = T.T_Record_Time + " (S)";
                    checkClassName = TimeReg.test(data['recordtime']) ? "" : " bg_danger";
                    break;
                case "recordsize":
                    if (parseInt(data['recordmode']) !== 1) {
                        return;
                    }
                    sTitle = T.T_Record_Size + " (KB)";
                    checkClassName = Validation.checkNumberRange(data['recordsize'], 0, 2097152) ? "" : " bg_danger";
                    break;

                case "istimeloop":
                    if (parseInt(data['recordmode']) !== 2) {
                        return;
                    }
                    sTitle = T.T_Loop_Enable;
                    type = "select";
                    optsArr = [
                        {val: 0, text: T.T_Settings_Disable},
                        {val: 1, text: T.T_Settings_Enable},
                    ];
                    break;
                case "issizeloop":
                    if (parseInt(data['recordmode']) !== 1) {
                        return;
                    }
                    sTitle = T.T_Loop_Enable;
                    type = "select";
                    optsArr = [
                        {val: 0, text: T.T_Settings_Disable},
                        {val: 1, text: T.T_Settings_Enable},
                    ];
                    break;
                default:
                    return "";
            }

            if (type === "input") {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}: </label>
                    <div className="col-7 col-sm-9">
                        <input type="text" className={"form-control form-control-sm" + (checkClassName)}
                               value={value}
                               disabled={Disabled}
                               onChange={this.handleChange.bind(this, name)}/>
                    </div>
                </div>
            } else {
                return <div className="form-group row" key={name}>
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">{sTitle}:</label>
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

        return <div className="card-body">
            <form>
                <SafetyRemove data={this.state.data} onHandleSafetyRemove={this.handleSafetyRemove.bind(this)}/>
                {
                    Object.keys(data).map(function (key) {
                        return showItem(key, data[key]);
                    })
                }
            </form>
        </div>
    }
}

export default RecordGeneralSettings;