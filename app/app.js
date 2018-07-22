import React from "react";
import store from "store";
import {Ajax, Lang, Data, Handler} from "./";
import Home from "./Home";
import _ from "underscore";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isInit: false,
        };
    }

    /**
     * 启动定时器
     */

    startInterval() {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.interval = setInterval(() => {

            if (!Data.isContinueTask) {
                return;
            }

            // 执行每秒刷新任务
            _.each(Data.updateUnitTask, (task) => {
                if (null !== task) {
                    task.call();
                }
            });

            // 执行刷新图片任务
            if (Data.updateTimes % 4 === 0) {
                _.each(Data.updatePictureTask, (task) => {
                    if (null !== task) {
                        task.call();
                    }
                })
            }
            Data.updateTimes++;
        }, 1000);
    }

    componentDidMount() {
        const token = store.get("token");
        if (token) {
            Ajax({
                url: "ajax/GetHomeInfo.w",
                isCodeErrorShow: false,
                isOtherErrorShow: false,
                onSuccess: (data) => {
                    this.startInterval();
                    Lang.setLang(data["lang"]);
                    this.setState({
                        isInit: true,
                    });
                },
                onError: () => {
                    Handler.doLogin();
                }
            });
        } else {
            Handler.doLogin();
        }
    }

    componentWillUnmount(){
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }


    render() {
        const {isInit} = this.state;
        return isInit ? <Home/> : null;
    }
}

export default App;