import React from "react";
import {T, Validation} from "../../";

const clazz = {
    inputLabel: "col-6 col-sm-3 col-form-label col-form-label-sm",
    inputDiv: "col-6 col-sm-9",
    offsetDiv: "offset-6 offset-sm-3 col-6 col-sm-9",
};

class NetworkIP extends React.Component {
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

    render() {

        const {data} = this.state;
        return <form>
            <div className="form-group row">
                <label className={clazz.inputLabel} htmlFor="ipDhcp">{T.T_Address_Mode}: </label>
                <div className={clazz.inputDiv}>
                    <select className="form-control form-control-sm"
                            name="ip_auto"
                            id="ipDhcp"
                            value={data.ip_auto}
                            onChange={this.props.handleChange}>
                        <option value="0">Static</option>
                        <option value="1">DHCP</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className={clazz.inputLabel}>{T.T_Network_IPAddress}: </label>
                <div className={clazz.inputDiv}>
                    <input type="text"
                           name="ipaddr"
                           className={"form-control form-control-sm" + (Validation.isIP(data['ipaddr']) ? "" : " bg_danger")}
                           value={data.ipaddr}
                           disabled={parseInt(data.ip_auto) === 0 ? null : true}
                           onChange={this.props.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className={clazz.inputLabel}>{T.T_Network_SubnetMask}: </label>
                <div className={clazz.inputDiv}>
                    <input type="text"
                           name="netmask"
                           className={"form-control form-control-sm" + (Validation.isIP(data["netmask"]) ? "" : " bg_danger")}
                           disabled={parseInt(data.ip_auto) === 0 ? null : true}
                           value={data.netmask}
                           onChange={this.props.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className={clazz.inputLabel}>{T.T_Network_DefaultGateway}: </label>
                <div className={clazz.inputDiv}>
                    <input type="text"
                           name="gateway"
                           className={"form-control form-control-sm" + (Validation.isIP(data["gateway"]) ? "" : " bg_danger")}
                           value={data.gateway}
                           disabled={parseInt(data.ip_auto) === 0 ? null : true}
                           onChange={this.props.handleChange}/>
                </div>
            </div>

            <div className="form-group row">
                <label className={clazz.inputLabel} htmlFor="ipDhcp">{T.T_Dynamic_DNS}: </label>
                <div className={clazz.inputDiv}>
                    <select className="form-control form-control-sm"
                            name="dns_auto"
                            id="dnsDhcp"
                            value={data.dns_auto}
                            disabled={parseInt(data.ip_auto) === 1 ? null : true}
                            onChange={this.props.handleChange}>
                        <option value="0">{T.T_Settings_Disable}</option>
                        <option value="1">{T.T_Settings_Enable}</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label className={clazz.inputLabel}>{T.T_Primary_Nameserver}: </label>
                <div className={clazz.inputDiv}>
                    <input type="text"
                           name="dns1"
                           className={"form-control form-control-sm" + (Validation.isIP(data["dns1"]) ? "" : " bg_danger")}
                           value={data.dns1}
                           disabled={parseInt(data.dns_auto) === 0 ? null : true}
                           onChange={this.props.handleChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label className={clazz.inputLabel}>{T.T_Secondary_Nameserver}: </label>
                <div className={clazz.inputDiv}>
                    <input type="text"
                           name="dns2"
                           className={"form-control form-control-sm" + (Validation.isIP(data["dns2"]) ? "" : " bg_danger")}
                           value={data.dns2}
                           disabled={parseInt(data.dns_auto) === 0 ? null : true}
                           onChange={this.props.handleChange}/>
                </div>
            </div>
            <div className="card-body">
                <div className="text-center w-100">
                    <button className="btn" type="button" onClick={this.props.handleApply}>
                        {T.T_Apply}
                    </button>
                    <button className="btn ml-5" type="button" onClick={this.props.handleCancelClick}>
                        {T.T_Cancel}
                    </button>
                </div>
            </div>
        </form>
    }
}
export default NetworkIP;