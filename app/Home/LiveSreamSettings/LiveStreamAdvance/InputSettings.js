import React from "react";
import {T} from "../../../"

class InputSettings extends React.Component {

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
        if (event.target.type === "checkbox") {
            data[name] = event.target.checked;
        } else {
            data[name] = event.target.value;
        }

        this.setState({
            data
        });

    };

    render() {
        const {collapse} = this.props;
        if (collapse) {
            return null;
        }
        const {data} = this.state;

        const optsArrMic = [
            {val: 0, text: T.T_Settings_Disable},
            {val: 1, text: T.T_Settings_Enable},
        ];

        const optsArrCC = [
            {val: 0, text: T.T_Settings_Disable},
            {val: 1, text: T.T_Settings_Enable},
        ];

        let Disabled = "";
        Disabled = this.props.data['liveflag'] ? "" : true;
        return <div className="card-body ml-2">
            <form>
                <div className="form-group row">
                    <label className="col-5 col-sm-3 col-form-label col-form-label-sm">MIC: </label>
                    <div className="col-7 col-sm-9">
                        <select className="form-control form-control-sm"
                                value={data["mic"]}
                                disabled={Disabled}
                                onChange={this.handleChange.bind(this, "mic")}>
                            {
                                optsArrMic.map(function (opt, index) {
                                    return <option key={index} value={opt.val}>{opt.text}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {data['authorized_cc'] ? <div className="form-group row">
                        <label className="col-5 col-sm-3 col-form-label col-form-label-sm">CC: </label>
                        <div className="col-7 col-sm-9">
                            <select className="form-control form-control-sm"
                                    value={data["cc"]}
                                    disabled={Disabled}
                                    onChange={this.handleChange.bind(this, "cc")}>
                                {
                                    optsArrCC.map(function (opt, index) {
                                        return <option key={index} value={opt.val}>{opt.text}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div> : null
                }
            </form>
        </div>
    }
}

export default InputSettings;