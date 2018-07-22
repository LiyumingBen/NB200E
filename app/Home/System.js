import React from "react";
import Network from "./System/Network";
import Language from "./System/Language";
import Operation from "./System/Operation";
import OtherOperation from "./System/OtherOperation";
import SystemVersion from "./System/SystemInfo";
import AuthInfo from "./System/AuthInfo";
import {CollapseHeader, T, Util, Image_computer,
    Image_server_connect, Image_computer_go,
    Image_application_form, Image_brick,
    Image_arrow_switch} from "../";

class System extends React.Component {

    constructor() {
        super();
        this.state = {
            isCollapsed: [false, false, false, false, false, false],  // 初始折叠状态
        };
    }

    render() {
        const {isCollapsed} = this.state;
        let n = -1;
        return <div>
            <div className="container">
                <div className="list-group">
                    <div className="list-group right-nav-title">
                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_application_form} alt="" className="mr-2"/>{T.T_System_Version}
                        </CollapseHeader>
                        <SystemVersion collapse={isCollapsed[n]}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_computer_go} alt="" className="mr-2"/>{T.T_License_Information}
                        </CollapseHeader>
                        <AuthInfo collapse={isCollapsed[n]}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_server_connect} alt="" className="mr-2"/>{T.T_Network}
                        </CollapseHeader>
                        <Network collapse={isCollapsed[n]}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_arrow_switch} alt="" className="mr-2"/>{T.T_Lang}
                        </CollapseHeader>
                        <Language collapse={isCollapsed[n]}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_brick} alt="" className="mr-2"/>{T.T_System_Operation}
                        </CollapseHeader>
                        <Operation collapse={isCollapsed[n]}/>

                        <CollapseHeader collapse={isCollapsed[++n]} handleCollapse={Util.handleCollapse.bind(this, n)}>
                            <img src={Image_computer} alt="" className="mr-2"/>{T.T_Other_Operation}
                        </CollapseHeader>
                        <OtherOperation collapse={isCollapsed[n]}/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default System;