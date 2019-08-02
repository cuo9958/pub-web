import React from "react";
import { Button, Input } from "element-react";
import { iRouter } from "../../ts/react";
import "./index.css";

interface iProps {
    history: iRouter;
}

export default class extends React.Component<iProps> {
    render() {
        return (
            <div id="login">
                <div className="box">
                    <div className="title">登&nbsp;&nbsp;&nbsp;录</div>
                    <div className="content">
                        <Input placeholder="用户名" />
                        <Input placeholder="密码" />
                        <Button
                            onClick={this.login}
                            className="login_btn"
                            type="info"
                        >
                            登录
                        </Button>
                        <div className="footer">解释权归前端所有</div>
                    </div>
                </div>
            </div>
        );
    }

    login = () => {
        this.props.history.push("/");
    };
}
