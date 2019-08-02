import React, { Fragment } from "react";
import {
    Button,
    Form,
    Input,
    Select,
    Radio,
    Notification,
    Message,
    Transfer,
    Slider,
    Tag,
    Checkbox
} from "element-react";

import "./index.css";

interface iProps {}
interface iDetail {
    version: string;
    platform: string;
    sign: string;
    link: string;
    state: number;
    labels: Array<any>;
    process: number;
    tags: Array<string>;
}
interface iState {
    form: iDetail;
    label_list: Array<any>;
    clientid: string;
    checkList: Array<any>;
}

export default class extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                version: "",
                platform: "",
                sign: "",
                link: "",
                state: 0,
                labels: [],
                process: 100,
                tags: []
            },
            label_list: [
                { key: 1, label: "开启原生首页" },
                { key: 2, label: "开启原生购物车" }
            ],
            clientid: "",
            checkList: []
        };
    }

    form: any;

    render() {
        return (
            <div id="bundle_detail">
                <Form ref={e => (this.form = e)} labelPosition="right">
                    <Form.Item label="平台" labelWidth="100px">
                        <Select
                            size="small"
                            value={this.state.form.platform}
                            placeholder="平台"
                        >
                            <Select.Option label="安卓" value="android" />
                            <Select.Option label="IOS" value="ios" />
                        </Select>
                    </Form.Item>
                    <Form.Item label="版本号" labelWidth="100px">
                        <Input
                            size="small"
                            style={{ width: "190px" }}
                            value={this.state.form.version}
                            placeholder="版本号"
                            onChange={e => this.onChange("version", e)}
                        />
                    </Form.Item>
                    <Form.Item label="bundle" labelWidth="100px">
                        <Input
                            size="small"
                            style={{ width: "190px" }}
                            value={this.state.form.sign}
                            placeholder="MD5"
                            onChange={e => this.onChange("sign", e)}
                        />
                        <Input
                            size="small"
                            style={{ width: "500px", marginLeft: "20px" }}
                            value={this.state.form.link}
                            placeholder="bundle地址"
                            onChange={e => this.onChange("link", e)}
                        />
                    </Form.Item>
                    <Form.Item label="标签选择" labelWidth="100px">
                        <Transfer
                            value={this.state.form.labels}
                            data={this.state.label_list}
                            onChange={this._handleChange}
                            titles={["标签列表", "已选标签"]}
                        />
                    </Form.Item>
                    <Form.Item label="发布类型" labelWidth="100px">
                        <Radio.Group
                            value={this.state.form.state}
                            onChange={e => this.onChange("state", e)}
                        >
                            <Radio value="0">正常发布</Radio>
                            <Radio value="1">灰度发布</Radio>
                            <Radio value="2">白名单</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {this.state.form.state == 1 && (
                        <Fragment>
                            <Form.Item label="灰度品牌" labelWidth="100px">
                                <Checkbox.Group value={this.state.checkList}>
                                    <Checkbox label="VIVO" />
                                    <Checkbox label="OPPO" />
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item label="灰度占比" labelWidth="100px">
                                <Slider
                                    className="slider"
                                    value={this.state.form.process}
                                    step="5"
                                    showStops={true}
                                    onChange={e => this.onChange("process", e)}
                                />
                                <span>{this.state.form.process}%</span>
                            </Form.Item>
                        </Fragment>
                    )}
                    {this.state.form.state == 2 && (
                        <Fragment>
                            <Form.Item label="添加白名单" labelWidth="100px">
                                <Input
                                    size="small"
                                    ref="saveTagInput"
                                    style={{ width: "190px" }}
                                    placeholder="clientid"
                                    value={this.state.clientid}
                                    onBlur={() => this.onKeyUp()}
                                    onChange={(e: any) => {
                                        this.setState({ clientid: e });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="白名单列表" labelWidth="100px">
                                {this.state.form.tags.map((item, index) => (
                                    <Tag
                                        className="tags"
                                        key={index}
                                        color={"#bb0000"}
                                        closable={true}
                                        closeTransition={false}
                                        onClose={() => this.handleClose()}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </Form.Item>
                        </Fragment>
                    )}
                    <Form.Item label="" labelWidth="100px">
                        <Button onClick={this.add} type="primary">
                            添加
                        </Button>
                        <Button onClick={this.add} type="primary">
                            返回
                        </Button>
                        <Button onClick={this.add} type="primary">
                            发布
                        </Button>
                        <Button onClick={this.add} type="primary">
                            撤销
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    onChange = (key: string, value: any) => {
        console.log(key, value);
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    };
    _handleChange = (list: any) => {
        this.setState({
            form: Object.assign({}, this.state.form, { labels: list })
        });
    };
    handleClose = () => {};
    onKeyUp() {
        this.setState({
            form: Object.assign({}, this.state.form, {
                tags: this.state.form.tags.concat(this.state.clientid)
            }),
            clientid: ""
        });
    }
    add = () => {
        console.log(this.state.form);
        if (!/^[0-9]{0,}\.[0-9]\.[0-9]$/.test(this.state.form.version)) {
            return Message.error("请填写版本号");
        }

        Notification.success({
            message: "发布成功"
        });
    };
}
