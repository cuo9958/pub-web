import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import Layout from "../pages/layout";
import Home from "../pages/home";
import Detail from "../pages/detail";
import Label from "../pages/label";
import Login from "../pages/login";
import Test from "../pages/test";

const Main = withRouter((props: any) => <Layout {...props} />);

export default () => {
    return (
        <Main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/label" component={Label} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/test" component={Test} />
            </Switch>
        </Main>
    );
};
