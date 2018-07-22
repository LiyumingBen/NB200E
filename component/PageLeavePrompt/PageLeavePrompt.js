import React from 'react'
import {Prompt} from 'react-router-dom'
import T from "../../common/Lang/T";
class PageLeavePrompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: $.extend(true, {}, this.props.data)
        };
    }

    componentWillReceiveProps(newProps){
        this.setState({
            data: newProps.data
        });
    }

    render(){
        return(
            <Prompt message={T.A_LeavePage_Tip} when={!this.state.data}/>
        )
    }
}

export default PageLeavePrompt;