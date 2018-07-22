import React from "react";
import {Ajax, T, Layer, Handler} from "../../";

function Reboot(content) {
    Layer.confirm({
        content: typeof content === "string" ? content : T.C_Reboot_This_Baseboard,
        onEnter: function () {
            Ajax({
                url: 'ajax/SystemReboot.w',
                isLoadingShow: true,
                isCodeErrorShow: false,
                isOtherErrorShow: false,
                onSuccess: function () {
                    let rebootProgressBar;
                    this.rebootProgressBar = Layer.progress({
                        content: T.A_Rebooting,
                        total: 30,
                        onComplete: function () {
                            Handler.doLogin();
                        }
                    });
                    this.rebootProgressBar.start();
                },
                onError: (code, description) => {
                    Handler.handleAjaxErr(code, description, code !== -1);
                }
            });
        }
    });
}

export default Reboot;