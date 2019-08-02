import React from "react";
import { Button, Form, Input, Layout, Table, Pagination } from "element-react";
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
            label: "标签名",
            prop: "version",
            width: 120,
            className: "list_small"
        },
        {
            label: "属性名",
            prop: "platform",
            width: 120,
            className: "list_small"
        },
        {
            label: "属性值",
            prop: "platform",
            className: "list_small"
        },
        {
            label: "创建日期",
            prop: "date",
            width: 160,
            className: "list_small"
        },
        {
            label: "创建人",
            prop: "name",
            width: 80,
            className: "list_small"
        },
        {
            label: "状态",
            prop: "state",
            width: 70,
            className: "list_small",
            render: function(row: any) {
                if (row.state === 0) return "启用";
                if (row.state === 1) return "禁止";
                return "";
            }
        },
        {
            label: "操作",
            render: function() {
                return (
                    <div>
                        <Button.Group>
                            <Button plain={true} type="info" size="small">
                                查看
                            </Button>
                            <Button type="info" size="small">
                                启用
                            </Button>
                            <Button type="warning" size="small">
                                禁止
                            </Button>
                        </Button.Group>
                    </div>
                );
            }
        }
    ];
    render() {
        return (
            <div id="label_list">
                <Layout.Row align="middle" className="top_box">
                    <Layout.Col span="24">
                        <Form inline={true} model={this.state.form}>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="标签名"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="属性名"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.user}
                                    placeholder="属性值"
                                    onChange={this.onChange.bind(this, "user")}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">添加</Button>
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
