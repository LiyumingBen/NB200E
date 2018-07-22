import React from "react";
import {Ajax, Handler, T, Layer, Validation} from "../";
import store from "store";
import _ from "underscore";

const oldPw = 'oldpassword';
const newPw = 'newpassword';
const confirmPw = 'confirmpassword';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        let state = {};
        [oldPw, newPw, confirmPw].forEach(function (item) {
            state[item] = {
                value: '',
            };
            state['v' + item] = {};
        });
        this.state = state;
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: {
                value: event.target.value
            },
            ['v' + event.target.name]: {},
        });
    };

    handleApply = () => {
        let userName = store['get']('username');
        let value = this.state[oldPw].value;
        if (Validation.isPassword(value)) {
            this.setState({
                ['v' + oldPw]: {
                    state: 'error',
                    text: T.A_Current_Password_Error('[2,20]'),
                }
            });
            return false;
        }
        value = this.state[newPw].value;
        if (Validation.isPassword(value)) {
            this.setState({
                ['v' + newPw]: {
                    state: 'error',
                    text: T.A_New_Password_Error('[2,20]'),
                }
            });
            return false;
        }
        value = this.state[confirmPw].value;
        if (Validation.isPassword(value)) {
            this.setState({
                ['v' + confirmPw]: {
                    state: 'error',
                    text: T.A_Confirmation_Password_Error('[2,20]'),
                }
            });
            return false;
        }
        if (this.state[newPw].value === this.state[oldPw].value) {
            this.setState({
                ['v' + newPw]: {
                    state: 'error',
                    text: T.A_Current_New_Password_Is_Same,
                }
            });
            return false;
        }

        if (this.state[newPw].value !== this.state[confirmPw].value) {
            this.setState({
                ['v' + confirmPw]: {
                    state: 'error',
                    text: T.A_New_Confirmation_Password_Not_Same,
                }
            });
            return false;
        }

        Ajax({
            url: 'ajax/Password.w',
            isLoadingShow: true,
            isCodeErrorShow: true,
            isOtherErrorShow: true,
            data: {
                username: userName,
                password: this.state[oldPw]['value'],
                newpassword: this.state[newPw]['value'],
            },
            onSuccess: () => {
                Layer.msg({
                    content: T.A_Password_Changed,
                });
                this.setState({
                    [oldPw]: {
                        value: ''
                    },
                    [newPw]: {
                        value: ''
                    },
                    [confirmPw]: {
                        value: ''
                    },
                });
                _.delay(Handler.doLogin, 2000);
            },
        });
    };

    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        let labelText = [T.T_Current_Password, T.T_New_Password, T.T_Confirm_Password];
        let placeholderText = [T.T_Current_Password, T.T_New_Password, T.T_Confirm_Password];
        return (
            <div className="container">
                <form>
                    {[oldPw, newPw, confirmPw].map((item, index) => {
                        return (
                            <div className="form-group row">
                                <label className="col-6 col-sm-2 col-form-label col-form-label-sm">
                                    {labelText[index]}:
                                </label>
                                <div className="col-6">
                                    <input className={"form-control form-control-sm" +
                                    (this.state['v' + item]['state'] === 'error' ? " bg_danger" : " ")}
                                           name={item}
                                           type="password"
                                           placeholder={placeholderText[index]}
                                           value={this.state[item].value || ''}
                                           onChange={this.handleInputChange}>
                                    </input>
                                    <span className="text-danger"
                                          style={{fontSize: "12px"}}>{this.state['v' + item]['text'] || ''}</span>
                                </div>
                            </div>
                        );
                    })}
                    <div className="card-body">
                        <div style={{marginLeft: "13em"}}>
                            <button className="btn " type="button" onClick={this.handleApply}>
                                {T.T_Apply}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}
export default ChangePassword;