import React, { Fragment } from "react";
import { inject } from "mobx-react";
import { Route, Redirect } from "react-router-dom";

import Home from "../pages/home";
import Detail from "../pages/detail";
import Label from "../pages/label";
import Login from "../pages/login";
import About from "../pages/about";
import Test from "../pages/test";

interface iProps {
    location: any;
    isLogin(): boolean;
}

const notLogin = ["/login"];

@inject((models: any) => ({
    isLogin: models.user.isLogin
}))
class Auth extends React.Component<any, iProps> {
    render() {
        const { location } = this.props;
        const { pathname } = location;
        const isLogin = this.props.isLogin();

        if (!notLogin.includes(pathname) && !isLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/detail" component={Detail} />
                <Route path="/see/:id" component={Detail} />
                <Route path="/label" component={Label} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={About} />
                <Route path="/test" component={Test} />
            </Fragment>
        );
    }
}
export default Auth;
