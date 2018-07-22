import React from "react";
import {T, Ajax} from "../../";

class AuthInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                "hdcp_authorized": "N/A",//HDCP授权信息
                "h265_authorized": "N/A",//H265授权信息
                "cc_authorized": "N/A", //CC授权信息
                "encryption_stream": "N/A", //是否为加密流
                "sdi_authorized": "N/A",//SDI授权
                "serial_license": "N/A" //串口授权
            }
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/AuthInformation.w",
            onSuccess: (data) => {
                this.setState({
                    data
                });
            }
        });
    };

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }

        let {data} = this.state;
        let v = '';
        let className = "form-control-plaintext w-100 ";
        if (data['hdcp_authorized'] === 0) {
            if (data['encryption_stream'] === 1) {
                v = T.A_Encryption_Stream_Authorized;
                className += "bad-status";
            } else {
                v = T.T_Unauthorized;
                className += "bad-status";
            }
        } else {
            v = T.T_Authorized;
            className += "good-status";
        }

        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">HDCP: </label>
                    <div className="col-7">
                        <span className={className}>
                            {v}
                        </span>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">H265: </label>
                    <div className="col-7">
                        <span className={"form-control-plaintext " +
                        (data["h265_authorized"] === 1 ? "good-status" : "bad-status")}>
                            {data["h265_authorized"] === 1 ? T.T_Authorized : T.T_Unauthorized}
                        </span>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">CC: </label>
                    <div className="col-7">
                        <span className={"form-control-plaintext " +
                        (data["cc_authorized"] === 1 ? "good-status" : "bad-status")}>
                            {data["cc_authorized"] === 1 ? T.T_Authorized : T.T_Unauthorized}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">SDI: </label>
                    <div className="col-7">
                        <span className={"form-control-plaintext " +
                        (data["sdi_authorized"] === 1 ? "good-status" : "bad-status")}>
                            {data["sdi_authorized"] === 1 ? T.T_Authorized : T.T_Unauthorized}
                        </span>
                    </div>
                </div>
                {/*<div className="form-group row">
                 <label className="col-6 col-sm-3 col-form-label col-form-label-sm">{T.T_Serial_License}: </label>
                 <div className="col-7">
                 <span className={"form-control-plaintext " +
                 (data["serial_license"] === 1? "good-status" : "bad-status")}>
                 {data["serial_license"] === 1? T.T_Authorized: T.T_Unauthorized}
                 </span
                 </div>
                 </div>*/}
            </form>
        </div>
    }
}

export default AuthInfo;