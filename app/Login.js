import React from "react";
import {Image_lock, Image_administrator, Image_login_split_white, Layer, T, Util, Validation} from "./";
import store from "store";
import {Ajax} from "./";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleLogin = (evt) => {
        evt.preventDefault();
        if (!this.state.username) {
            Layer.alert({
                icon: 2,
                content: T.A_UserName_Cannot_Be_Empty
            });
            return false;
        }

        Ajax({
            url: "ajax/Login.w",
            data: {
                username: this.state.username,
                password: this.state.password
            },
            onSuccess: (data) => {
                store.set("token", data.token);
                store.set("username", this.state.username);
                this.props.history.push('/');
            }
        });
    };


    handleOnChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return (<div className="login_body d-flex flex-row justify-content-center align-items-center">
            {Util.IEVersion() < 10 ? <div className="IE_Tips">
                <p>{T.A_Browser_Version_Tip}</p>
                <p>{T.A_Browser_Version_Tip1}</p>
            </div> : null}
            <div className="login_content col-sm-9 col-md-7 col-lg-5 d-flex flex-column p-4">
                <div className="welcome">
                    {T.T_Welcome_Use} <a>impulse</a> {T.T_Platform}
                </div>
                <img src={Image_login_split_white}/>
                <form className="d-flex flex-column p-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 d-flex flex-row justify-content-between align-items-center mb-2">
                            <label htmlFor="username" className="mr-2">
                                <img src={Image_administrator}/>
                            </label>
                            <input
                                id="username"
                                name="username"
                                className="form-control flex-grow-1 w-83"
                                value={this.state.username}
                                placeholder={T.T_UserName}
                                type="text"
                                autoFocus
                                onChange={this.handleOnChange.bind(this)}
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 d-flex flex-row justify-content-between align-items-center mb-2">
                            <label htmlFor="password" className="mr-2">
                                <img src={Image_lock}/>
                            </label>
                            <input
                                id="password"
                                name="password"
                                className="form-control flex-grow-1 w-83"
                                value={this.state.password}
                                placeholder={T.T_Password}
                                type="password"
                                onChange={this.handleOnChange.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="align-self-end mt-3">
                        <button id="submit" className="submit"
                                type="submit"
                                onClick={this.handleLogin.bind(this)}
                        >{T.T_Login}</button>
                    </div>
                </form>
            </div>
        </div>);

    }
}

export default Login;
