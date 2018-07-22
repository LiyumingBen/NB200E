import React from "react";
import {T, Layer, Ajax, Handler, Image_cog} from "../../";
import Upload from "rc-upload";
import Reboot from "./Reboot";

let timer;
class Upgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
        };

        this.uploaderProps = {
            action: 'ajax/SystemUpgrade.w',
            multiple: false,
            beforeUpload: (file) => {

                if (file) {
                    this.setState({
                        fileName: file.name,
                    });
                } else {
                    this.setState({
                        fileName: '',
                    });
                }

                let arr = file.name.split(".");
                if (arr[arr.length - 1] !== "WVUpgrade") {

                    this.setState({
                        fileName: '',
                    });

                    Layer.alert({
                        icon: 2,
                        content: T.A_Upgrade_File_Type_Error,
                    });
                    return false;
                }

            },
            onStart: () => {

                timer = setInterval(() => {
                    Ajax({
                        url: "ajax/Beat.w",
                        isLoadingShow: false,
                        isCodeErrorShow: false,
                        isOtherErrorShow: false
                    });
                }, 2000);

                this.upgradeComplete = () => {
                    Layer.alert({
                        icon: 2,
                        content: T.A_File_Upgrade_Failed,
                    });
                };

                this.upgradeProgressBar = Layer.progress({
                    content: T.A_Uploading_File,
                    total: 600,
                    onComplete: () => this.upgradeComplete()
                });
                this.upgradeProgressBar.start();

            },
            onProgress: (step) => {
                if (Math.round(step.percent) === 100) {
                    this.upgradeProgressBar.setContent(T.A_Processing_After_Uploaded);
                }
            },
            onSuccess: (xhr) => {

                this.setState({
                    fileName: '',
                });

                clearInterval(timer);

                if (typeof xhr !== "object") {
                    this.upgradeProgressBar.stop();
                } else if (xhr.code) {
                    this.upgradeComplete = () => {
                    };
                    this.upgradeProgressBar.stop();
                    Handler.handleAjaxErr(xhr.code, xhr.description, true);

                } else {
                    this.upgradeProgressBar.setRemain(2);
                    Reboot(T.C_Reboot_After_Upgrade);
                }
            },
            onError: () => {
                clearInterval(timer);
                this.setState({
                    fileName: '',
                });
                this.upgradeProgressBar.stop();

            },
            fileName: this.state.fileName,
        };
    }

    render() {
        return <div>
            <p className="wv-caption">
                <img src={Image_cog} alt="" className="mr-2 mb-1"/>{T.T_System_Upgrade}
            </p>
            <div className="form-group row ml-5">
                <label className="col-6 col-sm-2 col-form-label col-form-label-sm">{T.T_System_Upgrade}: </label>
                <div className="col-6 col-sm-10">
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm" readOnly="readOnly"
                               value={this.state.fileName}/>
                        <Upload {...this.uploaderProps}>
                            <button className="btn" type="button">
                                {T.T_Upload}
                            </button>
                        </Upload>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Upgrade;