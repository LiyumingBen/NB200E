import React from "react";
import T from "../../common/Lang/T";

export default class E404 extends React.Component {

    static handleClick(type) {
        switch (type) {
            case 'back':
	            this.props.history.goBack();
                break;
            case 'home':
	            this.props.history.push('/');
                break;
            default:
                break;
        }
    }

    render () {
        return <div className="text-center">
            <h1>
                404
                <small className="clearfix">{T.A_Page_Not_Exist}~</small>
            </h1>
            <p className="error-info">
                {T.A_404_Tips_0}：
                <a href="javascript:void(0);" onClick={E404.handleClick.bind(this, 'back')} className="c-primary">&lt; {T.A_404_Tips_1}</a>
                <span className="ml-20"> | </span>
                <a href="javascript:void(0);" className="c-primary ml-20" onClick={E404.handleClick.bind(this, 'home')}>{T.A_404_Tips_2} &gt;</a>
            </p>
        </div>
    }
}
