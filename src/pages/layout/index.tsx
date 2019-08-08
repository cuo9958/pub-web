import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { iRouter } from "../../ts/react";

import { Menu, Layout } from "element-react";
import "./index.css";

interface iProps {
    demo_show: boolean;
    history: iRouter;
    location: any;
    nickname: string;
    isLogin(): boolean;
}

@inject((models: any) => ({
    demo_show: models.demo.show,
    isLogin: models.user.isLogin,
    nickname: models.user.nickname
}))
@observer
export default class extends React.Component<iProps> {
    render() {
        if (this.props.location.pathname === "/login") {
            return this.props.children;
        }
        return (
            <Fragment>
                <div id="top_box">
                    <Link to="/">
                        <div className="logo">达令家BPM</div>
                    </Link>
                    <Menu
                        defaultActive={this.props.location.pathname}
                        className="top_menu"
                        mode="horizontal"
                        onSelect={this.onSelect}
                    >
                        <Menu.SubMenu index="me" title={this.props.nickname}>
                            <Menu.Item index="manger">用户管理</Menu.Item>
                            <Menu.Item index="quit">退出</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item index="/about">使用说明</Menu.Item>
                        <Menu.Item index="/label">标签管理</Menu.Item>
                        <Menu.Item index="/detail">新建发布</Menu.Item>
                        <Menu.Item index="/">发布列表</Menu.Item>
                    </Menu>
                </div>
                <Layout.Row justify="center" type="flex">
                    <Layout.Col span="20" lg="20" md="24" sm="24" xs="24">
                        {this.props.children}
                    </Layout.Col>
                </Layout.Row>
            </Fragment>
        );
    }

    onSelect = (key: string) => {
        if (key === "/") this.list();
        if (key === "/detail") this.editor();
        if (key === "/label") this.label();
        if (key === "/about") this.goPage("/about");
        if (key === "/manger") this.manger();
        if (key === "quit") this.quit();
    };

    goPage(pathname: string) {
        this.props.history.push(pathname);
    }
    /**
     * 查看列表
     */
    list() {
        this.props.history.push("/");
    }
    /**
     * 新增
     */
    editor() {
        this.props.history.push("/detail");
    }
    /**
     * 用户管理
     */
    manger() {
        console.log("go manger");
    }
    /**
     * 标签
     */
    label() {
        this.props.history.push("/label");
    }
    quit() {
        this.props.history.push("/login");
    }
}
