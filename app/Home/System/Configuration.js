import React from "react";
import {T, Layer, Ajax, Handler, Image_cog} from "../../";
import Upload from "rc-upload";
import Reboot from "./Reboot";

class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
        };

        this.uploaderProps = {
            action: 'ajax/ImportConfig.w',
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
                if (arr.length < 2 || arr[arr.length - 1].toLowerCase() !== "tar") {

                    this.setState({
                        fileName: '',
                    });

                    Layer.alert({
                        icon: 2,
                        content: T.A_Configuration_File_Type_Error,
                    });
                    return false;
                }

            },
            onStart: () => {

                this.importConfigurationComplete = () => {
                    Layer.alert({
                        icon: 2,
                        content: T.A_Import_Configuration_Failed,
                    });
                };

                this.configurationProgressBar = Layer.progress({
                    content: T.A_Uploading_File,
                    total: 12,
                    onComplete: () => this.importConfigurationComplete()
                });

                this.configurationProgressBar.start();

            },
            onProgress: (step) => {
                if (Math.round(step.percent) === 100) {
                    this.configurationProgressBar.setContent(T.A_Processing_After_Uploaded);
                }
            },
            onSuccess: (xhr) => {
                this.setState({
                    fileName: '',
                });

                if (typeof xhr !== "object") {
                    this.configurationProgressBar.stop();
                } else if (xhr.code) {
                    this.importConfigurationComplete = () => {
                    };
                    this.configurationProgressBar.stop();
                    Handler.handleAjaxErr(xhr.code, xhr.description, true);
                } else {
                    this.configurationProgressBar.setRemain(2);
                    Reboot(T.C_Reboot_After_Import_Configuration);
                }
            },
            onError: () => {
                this.setState({
                    fileName: '',
                });
                this.configurationProgressBar.stop();
            },
            fileName: this.state.fileName,
        };
    }

    //配置导出
    handleExport = (event) => {
        Layer.confirm({
            content: T.C_Export_Configuration,
            onEnter: () => {
                let exportProgressBar = Layer.progress({
                    content: T.A_Exporting_Configuration,
                    total: 60,
                    onComplete: () => {
                        this.refs['ifr'].src = this.url;
                    },
                });
                exportProgressBar.start();
                Ajax({
                    url: 'ajax/ExportConfig.w',
                    isLoadingShow: false,
                    isCodeErrorShow: false,
                    isOtherErrorShow: false,
                    timeout: 360000,
                    onSuccess: (data) => {
                        this.url = data.uri;
                        exportProgressBar.setRemain(2);
                    },
                    onError: () => {
                        Layer.alert({
                            icon: 2,
                            content: T.A_Export_Failed,
                        });
                        exportProgressBar.stop(true);
                    }
                });
            }
        });
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    render() {
        return <div>
            <p className="wv-caption">
                <img src={Image_cog} alt="" className="mr-2 mb-1"/>{T.T_System_Configuration}
            </p>
            <div className="form-group row ml-5">
                <label
                    className="col-6 col-sm-2 col-form-label col-form-label-sm">{T.T_System_Import_Configuration}: </label>
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
            <form className="form-horizontal mt-3">
                <div className="form-group row ml-5">
                    <label
                        className="col-6 col-sm-2 col-form-label col-form-label-sm">{T.T_System_Export_Configuration}: </label>
                    <button className="btn" type="button" onClick={this.handleExport.bind(this)}
                            style={{marginLeft: "0.8rem"}}>
                        {T.T_Export}
                    </button>
                </div>
            </form>
            <iframe ref="ifr" className="d-none"/>
        </div>;
    }
}

export default Configuration;