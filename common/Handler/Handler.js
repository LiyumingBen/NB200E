import React from "react";
import Util from "../Util/Util";
import store from "store";
import Layer from "../../component/Layer/Layer";
import T from "../../common/Lang/T";

class Handler extends React.Component {
    doLogin = (newIPAddress) => {
        store.remove("token");
        store.remove("username");
        if (newIPAddress) {
            top.location.href = "http://" + newIPAddress + '#/login?s=' + Util.getUUID();
        } else {
            top.location.href = '#login?s=' + Util.getUUID();
        }

    };

    //请求错误的统一处理函数
    handleAjaxErr = (code, description, isErrorShow, callBack) => {
        // 如果是 Token 过期，则特殊处理
        if (1032 === code || 1033 === code) {
            this.doLogin();
            return;
        }

        if (isErrorShow) {
            description = description ? description : T.A_Operation_Failed;
            callBack = callBack || $.noop;
            Layer.alert({
                icon: 2,
                title: T.A_Error + '[' + code + ']',
                content: description,
                onEnter: callBack,
            });
        }
    };
}

const handler = new Handler();
export default handler;
