/**
 * 首页
 */
import React from "react";
import {
    Button,
    Form,
    Input,
    Select,
    Layout,
    Table,
    Pagination,
    Progress,
    Notification,
    Popover,
    Dialog
} from "element-react";
import "./index.css";

import request from "../../services/request";
import { iRouter } from "../../ts/react";

interface iProps {
    history: iRouter;
}
interface iState {
    total: number;
    form: any;
    columns: Array<any>;
    list: Array<any>;
    dialogVisible: boolean;
    publishData: any;
}

function replaceDate(time: string) {
    if (!time) return "";
    return time.replace("T", " ").replace(".000Z", "");
}

export default class extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            total: 1,
            form: {},
            columns: this.columns,
            list: [],
            dialogVisible: false,
            publishData: null
        };
    }
    /**
     * 表格的表头属性
     */
    columns = [
        {
            label: "最低版本",
            prop: "version",
            width: 90,
            className: "list_small",
            render: function(row: any) {
                if (!row.version) return "";
                return (row.version + "").split("").join(".");
            }
        },
        {
            label: "平台",
            prop: "platform",
            width: 80,
            className: "list_small"
        },
        {
            label: "签名",
            prop: "sign",
            className: "list_small",
            render: function(row: any) {
                return (
                    <a href={row.link} target="blank">
                        {row.sign}
                    </a>
                );
            }
        },
        {
            label: "发布说明",
            prop: "remark",
            width: 100,
            className: "list_small"
        },
        {
            label: "发布人",
            prop: "nickname",
            width: 80,
            className: "list_small"
        },
        {
            label: "发布日期",
            prop: "createdAt",
            width: 160,
            className: "list_small",
            render: function(row: any) {
                return replaceDate(row.createdAt);
            }
        },
        {
            label: "占比",
            prop: "perce",
            width: 160,
            className: "list_small",
            render: function(row: any) {
                return (
                    <Progress
                        strokeWidth={18}
                        status="success"
                        percentage={row.perce}
                        textInside
                    />
                );
            }
        },
        {
            label: "类型",
            prop: "pub_type",
            width: 80,
            className: "list_small",
            render: function(row: any) {
                if (row.pub_type === 0) return "全量";
                if (row.pub_type === 1) return "灰度";
                if (row.pub_type === 2) return "白名单";
                return row.pub_type;
            }
        },
        {
            label: "状态",
            prop: "status",
            width: 80,
            className: "list_small",
            render: function(row: any) {
                if (row.status === 0)
                    return <span className="notUse">未使用</span>;
                if (row.status === 1)
                    return <span className="used">生效中</span>;
                if (row.status === 9)
                    return <span className="delete">已删除</span>;
                return row.status;
            }
        },
        {
            label: "操作",
            prop: "address",
            width: 180,
            render: (row: any) => {
                return (
                    <div>
                        <Button.Group>
                            <Button
                                onClick={() => this.goDetail(row.id)}
                                plain={true}
                                type="info"
                                size="small"
                            >
                                查看
                            </Button>
                            {row.status === 0 && (
                                <Button
                                    onClick={() => this.publish(row)}
                                    type="info"
                                    size="small"
                                >
                                    发布
                                </Button>
                            )}
                            {row.status === 1 && (
                                <Button
                                    onClick={() => this.pause(row.id)}
                                    type="success"
                                    size="small"
                                >
                                    暂停
                                </Button>
                            )}
                        </Button.Group>
                        <Popover
                            placement="top"
                            title="确定要删除吗？"
                            content={
                                <div style={{ textAlign: "right" }}>
                                    <Button
                                        onClick={() => this.delBundle(row.id)}
                                        type="danger"
                                        size="mini"
                                    >
                                        确定
                                    </Button>
                                </div>
                            }
                        >
                            <Button
                                style={{ marginLeft: "10px" }}
                                type="danger"
                                size="small"
                            >
                                删除
                            </Button>
                        </Popover>
                    </div>
                );
            }
        }
    ];

    render() {
        return (
            <div id="bundle_list">
                <Layout.Row align="middle" className="top_box">
                    <Layout.Col span="24">
                        <Form inline={true} model={this.state.form}>
                            <Form.Item>
                                <Select
                                    value={this.state.form.platform}
                                    onChange={this.onChange.bind(
                                        this,
                                        "platform"
                                    )}
                                    placeholder="平台"
                                >
                                    <Select.Option
                                        label="所有"
                                        value=""
                                    />
                                    <Select.Option
                                        label="安卓"
                                        value="android"
                                    />
                                    <Select.Option label="IOS" value="ios" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.version}
                                    placeholder="最低版本"
                                    onChange={this.onChange.bind(
                                        this,
                                        "version"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.nickname}
                                    placeholder="发布人"
                                    onChange={this.onChange.bind(
                                        this,
                                        "nickname"
                                    )}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    value={this.state.form.pub_type}
                                    placeholder="类型"
                                    onChange={this.onChange.bind(
                                        this,
                                        "pub_type"
                                    )}
                                >
                                    <Select.Option label="所有类型" value="" />
                                    <Select.Option label="全量发布" value="0" />
                                    <Select.Option label="灰度发布" value="1" />
                                    <Select.Option label="白名单" value="2" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    value={this.state.form.status}
                                    placeholder="状态"
                                    onChange={this.onChange.bind(
                                        this,
                                        "status"
                                    )}
                                >
                                    <Select.Option label="全部" value="" />
                                    <Select.Option label="未使用" value="0" />
                                    <Select.Option label="生效中" value="1" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => this.searchData()}
                                    type="primary"
                                >
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
                <div className="bundle_box">
                    <Table
                        style={{ width: "100%" }}
                        rowClassName={this.rowClassName.bind(this)}
                        columns={this.state.columns}
                        data={this.state.list}
                        border={true}
                    />
                </div>
                <div className="bundle_footer">
                    <Pagination
                        layout="prev, pager, next, total"
                        total={this.state.total}
                        pageSize={20}
                        onCurrentChange={this.onCurrentChange}
                    />
                </div>
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                >
                    <Dialog.Body>
                        <span>确定要发布这次bundle更新到线上？</span>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button
                            onClick={() =>
                                this.setState({ dialogVisible: false })
                            }
                        >
                            取消
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.publishSure()}
                        >
                            确定
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }

    async componentDidMount() {
        this.getList(1);
    }
    pageindex = 1;
    async getList(pageindex: number) {
        try {
            this.pageindex = pageindex;
            let data = await request.get(
                "/bundle",
                Object.assign({ limit: pageindex }, this.state.form)
            );
            this.setState({
                total: data.count,
                list: data.rows
            });
        } catch (error) {
            console.log(error);
            Notification.error({
                message: error.msg
            });
        }
    }
    async searchData() {
        this.getList(1);
    }
    onChange = (key: string, value: any) => {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    };
    /**
     * 根据状态选择
     * @param row
     * @param index
     */
    rowClassName(row: any, index: number) {
        if (index === 1) return "info-row";
        if (index === 3) {
            return "positive-row";
        }
        return "";
    }
    /**
     * 点击跳转页面
     */
    onCurrentChange = (currentPage: number) => {
        this.getList(currentPage);
    };

    goDetail(id: number) {
        this.props.history.push("/see/" + id);
    }
    async delBundle(id: number) {
        try {
            await request.post("/bundle/del/" + id);
            this.getList(this.pageindex);
        } catch (error) {
            console.log(error);
        }
    }
    async pause(id: number) {
        try {
            await request.post("/bundle/pause/" + id);
            this.getList(this.pageindex);
        } catch (error) {
            console.log(error);
        }
    }
    async publish(data: any) {
        this.setState({ dialogVisible: true, publishData: data });
    }
    async publishSure() {
        this.setState({ dialogVisible: false });
        if (!this.state.publishData || !this.state.publishData.id) return;
        try {
            await request.post("/bundle/publish/" + this.state.publishData.id);
            this.getList(this.pageindex);
            this.setState({ publishData: null });
        } catch (error) {
            console.log(error);
        }
    }
}
