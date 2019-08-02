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
    Progress
} from "element-react";
import "./index.css";

interface iProps {}
interface iState {
    form: any;
    columns: Array<any>;
    data: Array<any>;
}

export default class extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {},
            columns: this.columns,
            data: [
                {
                    version: "1.2.4",
                    platform: "android",
                    sign: "sahs6j2828749sd6555599",
                    date: "2016-05-02 12:02:33",
                    name: "郭方超",
                    process: 1,
                    state: 0
                },
                {
                    version: "1.2.3",
                    platform: "ios",
                    sign: "sahs6j2828749sd6555599",
                    date: "2016-05-02",
                    process: 10,
                    name: "郭方超",
                    state: 1
                },
                {
                    version: "1.2.2",
                    platform: "android",
                    sign: "sahs6j2828749sd6555599",
                    date: "2016-05-02",
                    process: 35,
                    name: "郭方超",
                    state: 1
                },
                {
                    version: "1.2.1",
                    platform: "android",
                    sign: "sahs6j2828749sd6555599",
                    date: "2016-05-02",
                    name: "郭方超",
                    process: 100,
                    state: 2
                }
            ]
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
            className: "list_small"
        },
        {
            label: "平台",
            prop: "platform",
            width: 90,
            className: "list_small"
        },
        {
            label: "MD5",
            prop: "sign",
            className: "list_small",
            render: function(row: any) {
                return (
                    <a href="http://dalingjia.com" target="blank">
                        {row.sign}
                    </a>
                );
            }
        },
        {
            label: "发布日期",
            prop: "date",
            width: 160,
            className: "list_small"
        },
        {
            label: "发布人",
            prop: "name",
            width: 80,
            className: "list_small"
        },
        {
            label: "占比",
            prop: "process",
            width: 150,
            className: "list_small",
            render: function(row: any) {
                return (
                    <Progress
                        strokeWidth={18}
                        status="success"
                        percentage={row.process}
                        textInside
                    />
                );
            }
        },
        {
            label: "状态",
            prop: "state",
            width: 90,
            className: "list_small",
            render: function(row: any) {
                if (row.state === 0) return "正常发布";
                if (row.state === 1) return "灰度发布";
                if (row.state === 2) return "白名单";
                return row.state;
            }
        },
        {
            label: "操作",
            prop: "address",
            width: 180,
            render: function() {
                return (
                    <div>
                        <Button.Group>
                            <Button plain={true} type="info" size="small">
                                查看
                            </Button>
                            {/* <Button type="info" size="small">
                                发布
                            </Button> */}
                            <Button type="info" size="small">
                                暂停
                            </Button>
                        </Button.Group>
                        <Button
                            style={{ marginLeft: "10px" }}
                            type="danger"
                            size="small"
                        >
                            删除
                        </Button>
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
                                    value={this.state.form.region}
                                    placeholder="平台"
                                >
                                    <Select.Option
                                        label="安卓"
                                        value="android"
                                    />
                                    <Select.Option label="IOS" value="ios" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="发布人"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="版本号"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="发布日期"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    value={this.state.form.region}
                                    placeholder="状态"
                                >
                                    <Select.Option
                                        label="正常发布"
                                        value="android"
                                    />
                                    <Select.Option
                                        label="灰度发布"
                                        value="ios"
                                    />
                                    <Select.Option label="白名单" value="ios" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">查询</Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
                <div className="bundle_box">
                    <Table
                        style={{ width: "100%" }}
                        rowClassName={this.rowClassName.bind(this)}
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                    />
                </div>
                <div className="bundle_footer">
                    <Pagination
                        layout="prev, pager, next, total"
                        total={500}
                        pageSize={50}
                        onCurrentChange={this.onCurrentChange}
                    />
                </div>
            </div>
        );
    }

    onChange() {}
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
    onCurrentChange = (currentPage: number) => {};
}
