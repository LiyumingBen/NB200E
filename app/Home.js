import React from "react";
import {Route, NavLink, Switch} from "react-router-dom";
import System from "./Home/System";
import LiveSreamSettings from "./Home/LiveSreamSettings";
import RecordSettings from "./Home/RecordSettings";
import InitStatus from "./Home/InitStatus";
import ChangePassword from "./Home/ChangePassword";
import {HeaderLogo, ImpulseLogo, T, Handler, Ajax, Image_user, E404} from "./";
import store from "store";

class Home extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            isShowLeftNav: false
        };
    }

    toggleLeftNav = () => {
        this.setState({
            isShowLeftNav: !this.state.isShowLeftNav
        });
    };

    handleLogout = () => {
        Ajax({
            url: "ajax/Logout.w",
            isCodeErrorShow: false,
            isOtherErrorShow: false,
            onComplete: () => {
                Handler.doLogin();
            }
        })
    };

    render() {
        let localInfomation = "" + T.T_Local_Infomation + ":" + " ";
        switch (location.hash) {
            case "#/":
                localInfomation = localInfomation + T.T_Status;
                break;
            case "#/livestreamsettings":
                localInfomation = localInfomation + T.T_Broadcast_LiveStream;
                break;
            case "#/record_settings":
                localInfomation = localInfomation + T.T_Record + T.T_Settings;
                break;
            case "#/system":
                localInfomation = localInfomation + T.T_System_Settings;
                break;
            case "#/password":
                localInfomation = localInfomation + T.T_Password;
                break;
        }

        return <div className="home">
            <nav className="navbar navbar-expand-sm navbar-dark">
                <span
                    title="Menu"
                    className={this.state.isShowLeftNav ? "glyphicon glyphicon-remove" : "glyphicon glyphicon-tasks"}
                    onClick={this.toggleLeftNav}/>
                <a className="navbar-brand product-name" href="javascript:void(0)">
                    <img src={ImpulseLogo} height="30" className="d-inline-block align-top" alt="Logo"/>
                </a>
                <a className="navbar-brand" href="javascript:void(0)">
                    <img src={HeaderLogo} height="30" className="d-inline-block align-top" alt="Logo"/>
                </a>
            </nav>
            <div className="card-subtitle d-flex justify-content-between">
                <span style={{color:"#30569d", cursor:'pointer'}} title={localInfomation}>{localInfomation}</span>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-link btn-sm dropdown-toggle"
                            data-toggle="dropdown" aria-expanded="false">
                        <img src={Image_user}/> &nbsp;{store.get("username")}
                    </button>
                    <nav className="dropdown-menu" aria-labelledby="btnGroupDrop1"
                         style={{left: "-80px", padding: "0"}} aria-label="breadcrumb">
                        <ol className="breadcrumb" style={{margin: "-2px", padding: "0 0.75rem", fontSize: "14px"}}>
                            <li className="breadcrumb-item ml-1">
                                <NavLink to="/password">{T.T_Change_Password}</NavLink>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="javascript:void 0" onClick={this.handleLogout.bind(this)}>{T.T_Logout}</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className={this.state.isShowLeftNav ? "over" : "d-none"} onClick={this.toggleLeftNav}/>
            <div className={this.state.isShowLeftNav ? "leftNav" : "leftNav hide"}>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/">
                            {T.T_Status}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/livestreamsettings">
                            {T.T_Broadcast_LiveStream}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/record_settings">
                            {T.T_Record_Settings}
                        </NavLink>
                    </li>

                    <li className="list-group-item">
                        <NavLink className="nav-item nav-link"
                                 onClick={this.toggleLeftNav}
                                 to="/system">
                            {T.T_System_Settings}
                        </NavLink>
                    </li>
                </ul>
            </div>
            <br/>
            <Switch>
                <Route exact path="/" component={InitStatus}/>
                <Route path="/livestreamsettings" component={LiveSreamSettings}/>
                <Route path="/record_settings" component={RecordSettings}/>
                <Route path="/system" component={System}/>
                <Route path="/password" component={ChangePassword}/>
                <Route path="*" component={E404}/>
            </Switch>
        </div>
    }
}

export default Home;