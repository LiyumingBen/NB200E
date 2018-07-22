import React from "react";
import {Ajax, T, Util, Layer, Validation, PageLeavePrompt, Handler} from "../../";
import NetworkIP from "./NetworkIP";
import _ from "underscore";


let originalData = {};
class Network extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                ip_auto: 0,
                ipaddr: "",
                netmask: "",
                gateway: "",
                dns_auto: 0,
                dns1: "",
                dns2: ""
            }
        };
    }

    componentDidMount() {
        this.initEntry();
    }


    initState = (originalData) => {
        const data = $.extend(true, {}, originalData);
        this.setState({
            data: data,
        })
    };

    initEntry = () => {
        Ajax({
            url: "ajax/GetNetwork.w",
            isLoadingShow: false,
            onSuccess: (data) => {
                this.setState({
                    data: {
                        ip_auto: data["ip_auto"],
                        ipaddr: Util.IP.getIPFromApiValue(data["ipaddr"]),
                        netmask: Util.IP.getIPFromApiValue(data["netmask"]),
                        gateway: Util.IP.getIPFromApiValue(data["gateway"]),
                        dns_auto: data["dns_auto"],
                        dns1: Util.IP.getIPFromApiValue(data["dns1"]),
                        dns2: Util.IP.getIPFromApiValue(data["dns2"])
                    },
                });
                originalData = $.extend(true, {}, this.state.data);
            }
        });
    };

    handleChange = (event) => {
        const {data} = this.state;
        const target = event.target;
        // target.type 比较容易区别input与checkbox

        if (target.name === "ip_auto") {
            data.dns_auto = target.value;
        }
        data[target.name] = target.value;
        this.setState({
            data,
        });
    };

    handleApply = () => {
        let data = $.extend(true, {}, this.state.data);

        if (_.isEqual(data, originalData)) {
            Layer.msg({
                icon: 0,
                content: T.A_Settings_Parameter_NoChange
            });
            return false;
        }

        //校验
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            switch (keys[i]) {
                case "ipaddr":
                case "netmask":
                case "gateway":
                case "dns1":
                case "dns2":
                    if (!Validation.isIP(data[keys[i]])) {
                        Layer.alert({
                            icon: 2,
                            content: T.A_IPAddress_FormatError
                        });
                        return;
                    }
                    data[keys[i]] = parseInt(Util.IP.getApiValueFromIP(data[keys[i]]));
                    break;
                default:
                    data[keys[i]] = parseInt(data[keys[i]]);
                    break;
            }
        }

        this.IPChangeProgressBar = Layer.progress({
            content: T.A_Configuring_Network,
            total: 60,
            onComplete() {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: () => {
                        if (Util.IP.getApiValueFromIP(originalData['ipaddr']) !== data['ipaddr']) {
                            Handler.doLogin(Util.IP.getIPFromApiValue(data['ipaddr']));
                        }
                    }
                });
            }
        });
        this.IPChangeProgressBar.start();

        Ajax({
            url: "ajax/SetNetwork.w",
            data: data,
            isLoadingShow: false,
            isOtherErrorShow: false,
            isCodeErrorShow: false,
            onSuccess: () => {
                this.IPChangeProgressBar.stop();
            },
            onError: (errCode, description) => {
                if (-1 !== errCode) {
                    this.IPChangeProgressBar.stop(true);
                    Handler.handleAjaxErr(errCode, description, true);
                }

            }
        });
    };


    handleCancelClick = () => {
        this.initState(originalData);
    };


    render() {
        const {collapse} = this.props;
        const {data} = this.state;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <NetworkIP data={data}
                       handleChange={this.handleChange.bind(this)}
                       handleCancelClick={this.handleCancelClick.bind(this)}
                       handleApply={this.handleApply.bind(this)}/>
            <PageLeavePrompt data={_.isEqual(originalData, this.state.data)}/>
        </div>
    }
}

export default Network;