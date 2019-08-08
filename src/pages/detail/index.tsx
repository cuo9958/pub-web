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

import request from "../../services/request";
import { iRouter } from "../../ts/react";

interface iProps {
    match: any;
    history: iRouter;
}
interface iDetail {
    version: string;
    platform: string;
    sign: string;
    link: string;
    bundleCompressUrl: string;
    pub_type: number;
    labels: Array<any>;
    perce: number;
    tags: string;
    brand: string;
    remark: string;
}
interface iState {
    form: iDetail;
    label_list: Array<any>;
    clientid: string;
    checkList: Array<any>;
    tag_list: Array<string>;
}
const colors = [
    "#99CCFF",
    "#99CCCC",
    "#66CCCC",
    "#CCCCFF",
    "#99CCCC",
    "#99CCFF",
    "#66CCFF",
    "#6699CC",
    "#6699CC",
    "#CCCCFF",
    "#99CCFF",
    "#003366",
    "#0066CC",
    "#333399"
];
function getRandomColor(index: number) {
    while (index > colors.length - 1) {
        index = index - colors.length;
    }
    if (index < 0) index = 0;
    console.log(index);
    return colors[index];
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
                bundleCompressUrl: "",
                pub_type: 0,
                labels: [],
                perce: 100,
                tags: "",
                remark: "",
                brand: ""
            },
            tag_list: [],
            label_list: [],
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
                            onChange={e => this.setPlatform(e)}
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
                            placeholder="最低版本号"
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
                    <Form.Item label="压缩地址" labelWidth="100px">
                        <Input
                            size="small"
                            style={{ width: "500px" }}
                            value={this.state.form.bundleCompressUrl}
                            placeholder="bundle压缩的地址"
                            onChange={e =>
                                this.onChange("bundleCompressUrl", e)
                            }
                        />
                    </Form.Item>
                    <Form.Item label="更新说明" labelWidth="100px">
                        <Input
                            size="small"
                            type="textarea"
                            style={{ width: "500px" }}
                            value={this.state.form.remark}
                            placeholder="本次更新的说明"
                            onChange={e => this.onChange("remark", e)}
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
                            value={this.state.form.pub_type}
                            onChange={(e: string) => this.setPubType(e)}
                        >
                            <Radio value="0">全量发布</Radio>
                            <Radio value="1">灰度发布</Radio>
                            <Radio value="2">白名单</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {this.state.form.pub_type === 1 && (
                        <Fragment>
                            {this.state.form.platform === "android" && (
                                <Form.Item label="灰度品牌" labelWidth="100px">
                                    <Checkbox.Group
                                        onChange={e => this.setBrand(e)}
                                        value={this.state.checkList}
                                    >
                                        <Checkbox label="vivo" />
                                        <Checkbox label="oppo" />
                                        <Checkbox label="huawei" />
                                        <Checkbox label="honor" />
                                        <Checkbox label="xiaomi" />
                                        <Checkbox label="redmi" />
                                    </Checkbox.Group>
                                </Form.Item>
                            )}
                            <Form.Item label="灰度占比" labelWidth="100px">
                                <Slider
                                    className="slider"
                                    value={this.state.form.perce}
                                    step="5"
                                    showStops={true}
                                    onChange={e => this.setPerce(e)}
                                />
                                <span>{this.state.form.perce}%</span>
                            </Form.Item>
                        </Fragment>
                    )}
                    {this.state.form.pub_type === 2 && (
                        <Fragment>
                            <Form.Item label="添加白名单" labelWidth="100px">
                                <Input
                                    size="small"
                                    type="textarea"
                                    style={{ width: "500px" }}
                                    placeholder="clientid"
                                    value={this.state.form.tags}
                                    onBlur={() => this.onKeyUp()}
                                    onChange={e => this.onChange("tags", e)}
                                />
                            </Form.Item>
                            <Form.Item label="白名单列表" labelWidth="100px">
                                {this.state.tag_list.map((item, index) => (
                                    <Tag
                                        className="tags"
                                        key={index}
                                        color={getRandomColor(index)}
                                        closeTransition={false}
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
                        <Button onClick={this.goback} type="primary">
                            返回
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    async componentDidMount() {
        try {
            const data = await request.get("/labels");
            let list: Array<any> = [];
            data.forEach((item: any) => {
                list.push({
                    label: item.title,
                    key: item.id
                });
            });
            this.setState({
                label_list: list
            });
        } catch (error) {
            console.log(error);
        }
        if (this.props.match.params.id) {
            try {
                const data = await request.get(
                    "/bundle/detail/" + this.props.match.params.id
                );
                const labels: Array<number> = [];
                data.labels.split(",").forEach((item: string) => {
                    labels.push(parseInt(item));
                });
                this.setState({
                    form: {
                        version: (data.version + "").split("").join("."),
                        platform: data.platform,
                        sign: data.sign,
                        link: data.link,
                        bundleCompressUrl: data.bundleCompressUrl,
                        pub_type: data.pub_type,
                        labels,
                        perce: data.perce,
                        tags: data.client_id.split(","),
                        brand: "",
                        remark: ""
                    },
                    checkList: data.brand.split(",")
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    //==============================
    /**
     * 设置平台
     * @param e
     */
    setPlatform(e: string) {
        const form = this.state.form;
        form.platform = e;
        this.setState({
            form
        });
    }
    setPubType(e: string) {
        const form = this.state.form;
        form.pub_type = parseInt(e);
        this.setState({ form });
    }
    setPerce(e: string) {
        const form = this.state.form;
        form.perce = parseInt(e);
        this.setState({ form });
    }
    setBrand(e: Array<string>) {
        const form = this.state.form;
        form.brand = e.join(",");
        this.setState({ form });
    }
    //==============================
    onChange = (key: string, value: any) => {
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
            tag_list: this.state.form.tags.split(",")
        });
    }
    goback = () => {
        this.props.history.goBack();
    };
    /**
     * 添加
     */
    add = async () => {
        console.log(this.state.form);
        if (
            this.state.form.platform !== "android" &&
            this.state.form.platform !== "ios"
        ) {
            return Message.error("请选择发布平台");
        }
        if (!/^[0-9]{0,}\.[0-9]\.[0-9]$/.test(this.state.form.version)) {
            return Message.error("请填写版本号");
        }
        if (this.state.form.sign === "" || this.state.form.link === "") {
            return Message.error("请填写bundle地址和md5");
        }

        try {
            await request.post("/bundle/pub", this.state.form);
            Notification.success({
                message: "发布成功"
            });
        } catch (error) {
            Notification.error({
                message: error.msg
            });
        }
    };
}
