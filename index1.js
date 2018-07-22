import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import App from "./app/app";
import Login from "./app/Login";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={App}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);