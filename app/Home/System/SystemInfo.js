import React from "react";
import {T, Ajax} from "../../";

class OutputStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                "software_version": "N/A",//软件版本号
                "hardware_version": "N/A"//硬件版本号
            }
        };
    }

    componentDidMount() {
        this.initEntry();
    }

    initEntry = () => {
        Ajax({
            url: "ajax/SystemVersion.w",
            onSuccess: (data) => {
                this.setState({
                    data: {
                        software_version: data['software_version'],
                        hardware_version: data['hardware_version']
                    },
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
        return <div className="card-body">
            <form>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">{T.T_System_Software_Version}: </label>
                    <div className="col-7">
                        <span className="form-control-plaintext status-text">
                            {data["software_version"]}
                        </span>

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">{T.T_System_Hardware_Version}: </label>
                    <div className="col-7">
                        <span className="form-control-plaintext status-text">
                            {data["hardware_version"]}
                        </span>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default OutputStatus;