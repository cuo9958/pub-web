import React from "react";
import {
    Button,
    Form,
    Input,
    Layout,
    Table,
    Pagination,
    Select,
    Notification
} from "element-react";
import "./index.css";
import request from "../../services/request";

interface iProps {}
interface iState {
    form: {
        title: string;
        attr_name: string;
        attr_val: string | number;
        attr_type: string;
    };
    columns: Array<any>;
    list: Array<any>;
    count: number;
}

export default class extends React.Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                title: "",
                attr_name: "",
                attr_val: "",
                attr_type: "text"
            },
            count: 0,
            columns: this.columns,
            list: [
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
            prop: "title",
            width: 120,
            className: "list_small"
        },
        {
            label: "属性名",
            prop: "attr_name",
            width: 120,
            className: "list_small"
        },
        {
            label: "属性值",
            prop: "attr_val",
            className: "list_small"
        },
        {
            label: "创建日期",
            prop: "createdAt",
            width: 200,
            className: "list_small"
        },
        {
            label: "创建人",
            prop: "nickname",
            width: 80,
            className: "list_small"
        },
        {
            label: "状态",
            prop: "status",
            width: 70,
            className: "list_small",
            render: function(row: any) {
                if (row.status === 1) return "启用";
                if (row.status === 0) return "禁止";
                return "";
            }
        },
        {
            label: "操作",
            render: (row: any) => {
                return (
                    <Button.Group>
                        <Button
                            onClick={() => this.changeStatus(row.id, 1)}
                            type="info"
                            size="small"
                        >
                            启用
                        </Button>
                        <Button
                            onClick={() => this.changeStatus(row.id, 0)}
                            type="warning"
                            size="small"
                        >
                            禁止
                        </Button>
                    </Button.Group>
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
                                    value={this.state.form.title}
                                    placeholder="标签名"
                                    onChange={(e: any) => this.setTitle(e)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.attr_name}
                                    placeholder="属性名"
                                    onChange={(e: any) => this.setAttrName(e)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    value={this.state.form.attr_val}
                                    placeholder="属性值"
                                    onChange={(e: any) => this.setAttrVal(e)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    size="small"
                                    value={this.state.form.attr_type}
                                    placeholder="平台"
                                    onChange={e => this.setAttrType(e)}
                                >
                                    <Select.Option label="文本" value="text" />
                                    <Select.Option
                                        label="数字"
                                        value="number"
                                    />
                                    <Select.Option label="布尔" value="bool" />
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => this.addLabel()}
                                    type="primary"
                                >
                                    添加
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
                        total={this.state.count}
                        pageSize={20}
                        onCurrentChange={this.onCurrentChange}
                    />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.loadData(1);
    }
    pageIndex = 1;
    async loadData(pageIndex: number) {
        try {
            this.pageIndex = pageIndex;
            let data = await request.get("/labels/pages");
            this.setState({
                count: data.count,
                list: data.rows
            });
        } catch (error) {
            console.log(error);
        }
    }
    //=====================================
    setTitle(e: string) {
        const form = this.state.form;
        form.title = e;
        this.setState({ form });
    }
    setAttrName(e: string) {
        const form = this.state.form;
        form.attr_name = e;
        this.setState({ form });
    }
    setAttrType(e: string) {
        const form = this.state.form;
        form.attr_type = e;
        this.setState({ form });
    }
    setAttrVal(e: string) {
        const form = this.state.form;
        form.attr_val = e;
        this.setState({ form });
    }
    //=====================================
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
        if (row.status === 0) return "not_use";
        if (row.status === 1) return "used";
        return "";
    }
    /**
     * 点击跳转页面
     */
    onCurrentChange = (currentPage: number) => {
        this.loadData(currentPage);
    };
    async addLabel() {
        try {
            await request.post("/labels/add", this.state.form);
            this.setState({
                form: {
                    title: "",
                    attr_name: "",
                    attr_val: "",
                    attr_type: "text"
                }
            });
            this.loadData(this.pageIndex);
            Notification.success({
                message: "添加成功"
            });
        } catch (error) {
            Notification.error({
                message: error.msg
            });
        }
    }
    async changeStatus(id: number, status: number) {
        try {
            await request.post("/labels/change/" + id, { status });
            this.loadData(this.pageIndex);
        } catch (error) {
            //
        }
    }
}
