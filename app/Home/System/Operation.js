import React from "react";
import Upgrade from "./Upgrade";
import License from "./License";
import Configuration from "./Configuration";

class Operation extends React.Component {
    render() {
        const {collapse} = this.props;

        if (collapse) {
            return null;
        }

        return <div className="container">
            <Upgrade/>
            <License/>
            <Configuration/>
        </div>
    }
}

export default Operation;