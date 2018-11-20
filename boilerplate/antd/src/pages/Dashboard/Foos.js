import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Popconfirm,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Foos.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const statusMap = {
  0: '关闭',
  1: '运行中',
  2: '已上线',
  3: '异常',
};
const badgeMap = {
  0: 'default',
  1: 'processing',
  2: 'success',
  3: 'error',
};

@Form.create()
class EditModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {
      dispatch,
      handleRefresh,
      formData: { id },
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        if (id) {
          dispatch({
            type: 'foos/editSingle',
            payload: { id, ...values },
            callback: () => {
              message.success('更新成功');
              this.hideModelHandler();
              handleRefresh();
            },
          });
        } else {
          dispatch({
            type: 'foos/createSingle',
            payload: values,
            callback: () => {
              message.success('添加成功');
              this.hideModelHandler();
              handleRefresh();
            },
          });
        }
      }
    });
  };

  render() {
    const {
      children,
      modalTitle = '查看详情',
      modalWith = 520,
      form,
      formData: { name, status },
    } = this.props;
    const { visible } = this.state;

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          destroyOnClose
          title={modalTitle}
          width={modalWith}
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem {...this.formLayout} label="名称">
              {form.getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请输入至少三个字符！', min: 3 }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...this.formLayout} label="状态">
              {form.getFieldDecorator('status', {
                initialValue: status,
                rules: [{ required: true, message: '请选择!' }],
              })(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {Object.keys(statusMap).map(key => (
                    <Option key={key} value={key - 0}>
                      {statusMap[key]}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

class ViewModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    // this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      children,
      modalTitle = '查看详情',
      modalWith = 520,
      formData: { id, name, status },
    } = this.props;
    const { visible } = this.state;

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          destroyOnClose
          title={modalTitle}
          width={modalWith}
          visible={visible}
          onOk={this.hideModelHandler}
          onCancel={this.hideModelHandler}
          footer={null}
        >
          <FormItem {...this.formLayout} label="ID">
            {id}
          </FormItem>
          <FormItem {...this.formLayout} label="名称">
            {name}
          </FormItem>
          <FormItem {...this.formLayout} label="状态">
            {statusMap[status]}
          </FormItem>
        </Modal>
      </span>
    );
  }
}

@connect(({ foos: data, loading }) => ({
  data,
  loading: loading.models.foos,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    pagination: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'foos/fetchMultiple',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    console.log(filtersArg);

    // const filters = Object.keys(filtersArg).reduce((obj, key) => {
    //   const newObj = { ...obj };
    //   newObj[key] = getValue(filtersArg[key]);
    //   return newObj;
    // }, {});

    // console.log(filters)

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filtersArg,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}__${sorter.order.slice(0, -3)}`;
    }

    dispatch({
      type: 'foos/fetchMultiple',
      payload: params,
      callback: () => {
        this.setState({
          pagination: {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
          },
        });
      },
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      pagination: {},
    });
    dispatch({
      type: 'foos/fetchMultiple',
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
        pagination: {},
      });

      dispatch({
        type: 'foos/fetchMultiple',
        payload: values,
      });
    });
  };

  handleRefresh = ({ isReset } = {}) => {
    const { dispatch } = this.props;
    const { formValues, pagination } = this.state;
    if (isReset) {
      this.handleFormReset();
    } else {
      dispatch({
        type: 'foos/fetchMultiple',
        payload: {
          ...formValues,
          ...pagination,
        },
      });
    }
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: `foos/deleteSingle`,
      payload: {
        id,
      },
      callback: () => {
        message.success('删除成功');
        this.handleRefresh({ isReset: true });
      },
    });
  };

  handleDeleteMultiple = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows.length) return;
    dispatch({
      type: `foos/deleteMultiple`,
      payload: {
        ids: selectedRows.map(item => item.id),
      },
      callback: () => {
        message.success('删除成功');
        this.handleRefresh({ isReset: true });
      },
    });
  };

  filterForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {Object.keys(statusMap).map(key => (
                    <Option key={key} value={key - 0}>
                      {statusMap[key]}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { data, loading, dispatch } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: Object.keys(statusMap).map(key => ({
          text: statusMap[key],
          value: key,
        })),
        render: val => <Badge status={badgeMap[val]} text={statusMap[val]} />,
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <ViewModal modalTitle="查看" formData={record}>
              <a href="javascript:;">查看</a>
            </ViewModal>
            <Divider type="vertical" />
            <EditModal
              modalTitle={`新建示例`}
              formData={record}
              dispatch={this.props.dispatch}
              handleRefresh={this.handleRefresh}
            >
              <a href="javascript:;">编辑</a>
            </EditModal>
            <Divider type="vertical" />
            <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="示例页面">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.filterForm()}</div>
            <div className={styles.tableListOperator}>
              <EditModal
                modalTitle={`新建示例`}
                formData={{}}
                dispatch={dispatch}
                handleRefresh={this.handleRefresh}
              >
                <Button icon="plus" type="primary">
                  新建
                </Button>
              </EditModal>
              {selectedRows.length > 0 && (
                <Popconfirm title="确定删除？" onConfirm={() => this.handleDeleteMultiple()}>
                  <Button icon="delete" href="javascript:;">
                    删除
                  </Button>
                </Popconfirm>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey={'id'}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
