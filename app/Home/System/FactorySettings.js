import React from "react";
import {Ajax, T, Layer} from "../../";
import Reboot from "./Reboot";

class FactorySettings extends React.Component {
    // 恢复出厂设置
    handleDefault = () => {
        // 恢复出厂
        let doDefault = () => {
            Ajax({
                url: 'ajax/SystemDefault.w',
                isLoadingShow: true,
                isCodeErrorShow: true,
                isOtherErrorShow: true,
                onSuccess: (data) => {
                    this.defaultProgressBar = Layer.progress({
                        content: T.A_System_Restoring_Factory_Settings,
                        total: data['defaultDelay'],
                        onComplete: () => {
                            Reboot(T.C_Reboot_After_Factory_Settings);
                        }
                    });
                    this.defaultProgressBar.start();
                }
            });
        };

        Layer.confirm({
            content: T.C_Restore_Factory_Settings,
            onEnter: () => {
                doDefault();
            }
        });
    };

    render() {
        return <button className="btn ml-5" type="button" onClick={this.handleDefault}>
            {T.T_System_Factory_Settings}
        </button>;
    }
}

export default FactorySettings;