import React from "react";
import {T, Ajax, Lang, Layer} from "../../";
import _ from "underscore";

let originalLang = {};
class Language extends React.Component {

    constructor() {
        super();
        this.state = {
            lang: Lang.getLang(),
        };
        originalLang = this.state.lang;
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    };

    handleApply = () => {
        if (_.isEqual(this.state.lang, originalLang)) {
            Layer.msg({
                icon: 0,
                content: T.A_Settings_Parameter_NoChange
            });
            return false;
        }

        Ajax({
            url: "ajax/SetLang.w",
            data: {
                lang: this.state.lang,
            },
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Setting_Success,
                    onComplete: () => window.location.reload(),
                });
            }
        })
    };

    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <form>
                <div className="form-group row">
                    <label className="col-6 col-sm-3 col-form-label col-form-label-sm">{T.T_Lang}: </label>
                    <div className="col-6 col-sm-9">
                        <select className="form-control form-control-sm"
                                name="lang"
                                value={this.state.lang}
                                onChange={this.handleChange}>
                            <option value="zh_CN">{T.T_Lang_Chinese}</option>
                            <option value="en_US">English</option>
                        </select>
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center w-100">
                        <button className="btn" type="button" onClick={this.handleApply}>
                            {T.T_Apply}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default Language;