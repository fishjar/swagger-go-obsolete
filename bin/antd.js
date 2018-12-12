const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { YAML_FILE, ROOT_PATH, DIST_PATH } = require('../config');
const { getDataType } = require('../lib');

const PRJ_KEY = 'antd';

try {
  console.log('---开始执行脚本---\n');
  // 定义目录结构
  const rootDir = path.join(DIST_PATH, PRJ_KEY);

  const configDir = path.join(rootDir, 'config');
  const localesDir = path.join(rootDir, 'src', 'locales');
  const localesDir_US = path.join(rootDir, 'src', 'locales', 'en-US');
  const localesDir_CN = path.join(rootDir, 'src', 'locales', 'zh-CN');
  const pagesDir = path.join(rootDir, 'src', 'pages', 'Dashboard');
  const modelsDir = path.join(rootDir, 'src', 'pages', 'Dashboard', 'models');
  const servicesDir = path.join(rootDir, 'src', 'services');

  const routerFile = path.join(configDir, `router.config.js`);
  const localesFile_US = path.join(localesDir_US, `menu.js`);
  const localesFile_CN = path.join(localesDir_CN, `menu.js`);

  console.log(`移除：${rootDir}`);
  fs.removeSync(rootDir);

  console.log('\n复制模板文件...');
  fs.copySync(path.resolve(__dirname, `../boilerplate/${PRJ_KEY}`), rootDir, {
    filter: (src, dest) => {
      if (src.search(/node_modules|dist|.umi/) !== -1) {
        return false;
      }
      if (src.endsWith('.log') || src.endsWith('.sqlite')) {
        console.log(`忽略：.${src.split(ROOT_PATH)[1]}`);
        return false;
      }
      console.log(`复制：.${src.split(ROOT_PATH)[1]} -> <DIST_PATH>${dest.split(DIST_PATH)[1]}`);
      return true;
    }
  });

  console.log('\n读取swagger文档...');
  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));
  console.log(doc.definitions)

  let routerPaths = '';
  let localesMenu_US = '';
  let localesMenu_CN = '';

  const moduleNames = Object.keys(doc.definitions)
    .filter(item => doc.definitions[item]['x-isModel']); //过滤，必须包含`x-isModel`属性
  moduleNames.forEach(name => {
    const item = doc.definitions[name];
    const _name = name.toLowerCase();
    const pluralName = item['x-plural'];
    const _pluralName = item['x-plural'].toLowerCase();

    routerPaths += `{
        path: '/dashboard/${_pluralName}',
        name: '${_pluralName}',
        component: './Dashboard/${pluralName}',
        authority: ['admin'],
      },
    `;

    localesMenu_US += `'menu.dashboard.${_pluralName}': '${pluralName}',`;
    localesMenu_CN += `'menu.dashboard.${_pluralName}': '${item.description}',`;

    const servicesOutFile = path.join(servicesDir, `${_pluralName}.js`);
    const servicesFileData = `
      import { stringify } from 'qs';
      import request from '@/utils/request';

      export async function queryMultiple(params) {
        return request(\`/api/${_pluralName}?$\{stringify(params)\}\`);
      }

      export async function querySingle({ id }) {
        return request(\`/api/${_pluralName}/$\{id\}\`);
      }

      export async function removeMultiple({ ids }) {
        return request('/api/${_pluralName}', {
          method: 'DELETE',
          body: {
            id: ids,
          },
        });
      }

      export async function removeSingle({ id }) {
        return request(\`/api/${_pluralName}/$\{id\}\`, {
          method: 'DELETE',
        });
      }

      export async function addMultiple(params) {
        return request('/api/${_pluralName}/multiple', {
          method: 'POST',
          body: params,
        });
      }

      export async function addSingle(params) {
        return request('/api/${_pluralName}', {
          method: 'POST',
          body: params,
        });
      }

      export async function updateMultiple({ fields, ids }) {
        return request('/api/${_pluralName}', {
          method: 'PATCH',
          body: {
            fields,
            filter: {
              id: ids,
            },
          },
        });
      }

      export async function updateSingle({ id, ...params }) {
        return request(\`/api/${_pluralName}/$\{id\}\`, {
          method: 'PATCH',
          body: params,
        });
      }
    `;
    console.log(`创建：<DIST_PATH>${servicesOutFile.split(DIST_PATH)[1]}`);
    fs.writeFileSync(servicesOutFile, prettier.format(servicesFileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');

    const modelsOutFile = path.join(modelsDir, `${_pluralName}.js`);
    const modelsFileData = `
      import {
        querySingle,
        removeSingle,
        addSingle,
        updateSingle,
        queryMultiple,
        removeMultiple,
        addMultiple,
        updateMultiple,
      } from '@/services/${_pluralName}';
      
      export default {
        namespace: '${_pluralName}',
      
        state: {
          list: [],
          pagination: {},
        },
      
        effects: {
          *fetchMultiple({ payload = {}, callback }, { call, put }) {
            const { pageNum = 1, pageSize = 10 } = payload;
            const response = yield call(queryMultiple, payload);
            if (response) {
              const { count, rows } = response;
              yield put({
                type: 'save',
                payload: {
                  list: rows,
                  pagination: {
                    total: count,
                    pageSize,
                    current: pageNum,
                  },
                },
              });
              if (callback) callback(response);
            }
          },
          *fetchSingle({ payload, callback }, { call, put }) {
            const response = yield call(querySingle, payload);
            if (callback) callback(response);
          },
          *createMultiple({ payload, callback }, { call, put }) {
            const response = yield call(addMultiple, payload);
            if (callback) callback();
          },
          *createSingle({ payload, callback }, { call, put }) {
            const response = yield call(addSingle, payload);
            if (callback) callback();
          },
          *deleteMultiple({ payload, callback }, { call, put }) {
            const response = yield call(removeMultiple, payload);
            if (callback) callback();
          },
          *deleteSingle({ payload, callback }, { call, put }) {
            const response = yield call(removeSingle, payload);
            if (callback) callback();
          },
          *editMultiple({ payload, callback }, { call, put }) {
            const response = yield call(updateMultiple, payload);
            const { ids, fields } = payload;
            yield put({
              type: 'update',
              payload: {
                ids,
                fields,
              },
            });
            if (callback) callback();
          },
          *editSingle({ payload, callback }, { call, put }) {
            const response = yield call(updateSingle, payload);
            const { id, ...fields } = payload;
            yield put({
              type: 'update',
              payload: {
                ids: [id],
                fields,
              },
            });
            if (callback) callback();
          },
        },
      
        reducers: {
          save(state, action) {
            return {
              ...state,
              ...action.payload,
            };
          },
          update(state, action) {
            return {
              ...state,
              list: state.list.map(item => {
                if (action.payload.ids.includes(item.id)) {
                  return { ...item, ...action.payload.fields };
                }
                return item;
              }),
            };
          },
        },
      };    
    `;
    console.log(`创建：<DIST_PATH>${modelsOutFile.split(DIST_PATH)[1]}`);
    fs.writeFileSync(modelsOutFile, prettier.format(modelsFileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');

    const pagesOutFile = path.join(pagesDir, `${pluralName}.js`);
    const pagesFileData = `
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
        Button,
        InputNumber,
        DatePicker,
        Modal,
        message,
        Badge,
        Divider,
        Radio,
        Popconfirm,
      } from 'antd';
      import ReactQuill from 'react-quill';
      import StandardTable from '@/components/StandardTable';
      import PageHeaderWrapper from '@/components/PageHeaderWrapper';
      
      import styles from './${pluralName}.less';
      import 'react-quill/dist/quill.snow.css';
      
      const FormItem = Form.Item;
      const { TextArea } = Input;
      const { Option } = Select;
      const RadioGroup = Radio.Group;

      ${Object.entries(item.properties)
        .filter(([_, v]) => v['x-enumMap'])
        .map(([k, v]) => `
            const ${k}Map = ${JSON.stringify(v['x-enumMap'], null, 2)};
          `)
        .join(';')}
      
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
              const fields = {
                ...values,
                ${Object.entries(item.properties)
                  .filter(([_, v]) => v['format'] === 'date')
                  .map(([k, _]) => `${k}: values.${k} && values.${k}.format('YYYY-MM-DD'),`)
                  .join('')}
                ${Object.entries(item.properties)
                  .filter(([_, v]) => v['format'] === 'date-time')
                  .map(([k, _]) => `${k}: values.${k} && values.${k}.format('YYYY-MM-DD HH:mm:ss'),`)
                  .join('')}
              };
              console.log(fields)
              if (id) {
                dispatch({
                  type: '${_pluralName}/editSingle',
                  payload: { id, ...fields },
                  callback: () => {
                    message.success('更新成功');
                    this.hideModelHandler();
                    // handleRefresh();
                  },
                });
              } else {
                dispatch({
                  type: '${_pluralName}/createSingle',
                  payload: fields,
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
            formData: {
              ${Object.entries(item.properties)
                .map(([k, _]) => `${k},`)
                .join('')}
            },
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
                  ${Object.entries(item.properties)
                    .filter(([k,_])=>k!=='id')
                    .map(([k, v]) => {
                      let rules = '';
                      let input = '';
                      if(v.format.startsWith('string')) {
                        if(v.minLength!==undefined && v.maxLength!==undefined) {
                          rules = `min: ${v.minLength}, max: ${v.maxLength}`;
                        }
                        input = `<Input placeholder='${v['x-message']}' />`;
                      }
                      if(v.format.startsWith('int')) {
                        if(v.enum && v['x-enumMap']) {
                          input = `<Select placeholder='${v['x-message']}' style={{ width: '100%' }}>
                              {Object.keys(${k}Map).map(key => (
                                <Option key={key} value={key - 0}>
                                  {${k}Map[key]}
                                </Option>
                              ))}
                            </Select>`;
                        } else {
                          if(v.minimum!==undefined && v.maximum!==undefined) {
                            input = `<InputNumber min={${v.minimum}} max={${v.maximum}} placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                          } else {
                            input = `<InputNumber placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                          }
                          rules = `type: 'integer'`;
                        }
                      }
                      if(v.format.startsWith('float')) {
                        if(v.minimum!==undefined && v.maximum!==undefined) {
                          input = `<InputNumber min={${v.minimum}} max={${v.maximum}} placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                        } else {
                          input = `<InputNumber placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                        }
                      }
                      if(v.format.startsWith('date')) {
                        input = `<DatePicker placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                      }
                      if(v.format.startsWith('date-time')) {
                        input = `<DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder='${v['x-message']}' style={{ width: '100%' }} />`;
                      }
                      if(v.format.startsWith('email')) {
                        rules = `type: 'email',`;
                        input = `<Input placeholder='${v['x-message']}' />`;
                      }
                      if(v.format.startsWith('uri')) {
                        rules = `type: 'url',`;
                        input = `<Input placeholder='${v['x-message']}' />`;
                      }
                      if(v.format.startsWith('text')) {
                        if (v['x-isRichText']) {
                          input = `<ReactQuill placeholder='${v['x-message']}' />`;
                        } else {
                          input = `<TextArea rows={3} placeholder='${v['x-message']}' />`;
                        }
                      }
                      if(v.format.startsWith('object')||v.format.startsWith('array')) {
                        input = `<TextArea rows={3} placeholder='${v['x-message']}' />`;
                      }
                      if(v.format.startsWith('boolean')) {
                        input = `<RadioGroup placeholder='${v['x-message']}'>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                          </RadioGroup>`;
                      }

                      return `<FormItem {...this.formLayout} label='${v['x-description']||v.description}'>
                        {form.getFieldDecorator('${k}', {
                          initialValue: ${(v.format.startsWith('date') || v.format.startsWith('date-time'))?`${k} && moment(${k})`:k},
                          rules: [{ required: ${item.required.includes(k) ? 'false' : 'true'}, message: '${v['x-message']}！', ${rules} }],
                        })(${input})}
                      </FormItem>
                      `;
                    })
                    .join('')}
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
          this.setState({
            visible: false,
          });
        };
      
        render() {
          const {
            children,
            modalTitle = '查看详情',
            modalWith = 520,
            formData: {
              ${Object.entries(item.properties)
                .map(([k, _]) => `${k},`)
                .join('')}
            },
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
                ${
                  Object.entries(item.properties)
                    .map(([k,v])=>{
                      if(v.format.startsWith('boolean')) {
                        return `<FormItem {...this.formLayout} label='${v.description}'>{${k} ? '是' : '否'}</FormItem>`;
                      }
                      if(v.format.startsWith('int') && v.enum && v['x-enumMap']) {
                        return `<FormItem {...this.formLayout} label='${v['x-description']}}'>{${k}Map[${k}]}</FormItem>`;
                      }
                      return `<FormItem {...this.formLayout} label='${v.description}'>{${k}}</FormItem>`;
                    })
                    .join("")
                }
              </Modal>
            </span>
          );
        }
      }
      
      @connect(({ ${_pluralName}: data, loading }) => ({
        data,
        loading: loading.models.${_pluralName},
      }))
      @Form.create()
      class ${pluralName} extends PureComponent {
        state = {
          selectedRows: [],
          formValues: {},
          pagination: {},
        };
      
        componentDidMount() {
          const { dispatch } = this.props;
          dispatch({
            type: '${_pluralName}/fetchMultiple',
          });
        }
      
        handleStandardTableChange = (pagination, filtersArg, sorter) => {
          const { dispatch } = this.props;
          const { formValues } = this.state;
      
          console.log(filtersArg);
      
          const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filtersArg,
          };
          if (sorter.field) {
            params.sorter = sorter.field + '__' + sorter.order.slice(0, -3);
          }
      
          dispatch({
            type: '${_pluralName}/fetchMultiple',
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
            type: '${_pluralName}/fetchMultiple',
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
              type: '${_pluralName}/fetchMultiple',
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
              type: '${_pluralName}/fetchMultiple',
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
            type: '${_pluralName}/deleteSingle',
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
            type: '${_pluralName}/deleteMultiple',
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
            <Form onSubmit={this.handleSearch} layout='inline'>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                  <FormItem label='名称'>
                    {getFieldDecorator('name')(<Input placeholder='请输入' />)}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label='安好'>
                    {getFieldDecorator('isGood')(
                      <Select placeholder='请选择' style={{ width: '100%' }}>
                        <Option value={1}>是</Option>
                        <Option value={0}>否</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={24}>
                  <FormItem label='状态'>
                    {getFieldDecorator('status')(
                      <Select placeholder='请选择' style={{ width: '100%' }}>
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
                    <Button type='primary' htmlType='submit'>查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
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
            ${
              Object.entries(item.properties)
                .filter(([k,v])=>v['x-showTable'])
                .map(([k,v])=>{
                  if(v.format.startsWith('boolean')) {
                    return `{
                      title: '${v.description}',
                      dataIndex: '${k}',
                      filters: [
                        {
                          text: '是',
                          value: 1,
                        },
                        {
                          text: '否',
                          value: 0,
                        },
                      ],
                      filterMultiple: false,
                      render: val => val ? '是' : '否',
                    },`;
                  }
                  if(v.format.startsWith('int') && v.enum && v['x-enumMap']) {
                    return `{
                      title: '${v['x-description']}',
                      dataIndex: '${k}',
                      filters: Object.keys(${k}Map).map(key => ({
                        text: ${k}Map[key],
                        value: key,
                      })),
                      render: val => ${k}Map[val],
                    },`;
                  }
                  return `{
                    title: '${v.description}',
                    dataIndex: '${k}',
                  },`;
                })
                .join("")
            }
            {
              title: '创建时间',
              dataIndex: 'createdAt',
              sorter: true,
              render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
              title: '操作',
              render: (text, record) => (
                <Fragment>
                  <ViewModal modalTitle='查看' formData={record}>
                    <a href='javascript:;'>查看</a>
                  </ViewModal>
                  <Divider type='vertical' />
                  <EditModal
                    modalTitle={'新建示例'}
                    formData={record}
                    dispatch={this.props.dispatch}
                    handleRefresh={this.handleRefresh}
                  >
                    <a href='javascript:;'>编辑</a>
                  </EditModal>
                  <Divider type='vertical' />
                  <Popconfirm title='确定删除？' onConfirm={() => this.handleDelete(record.id)}>
                    <a href='javascript:;'>删除</a>
                  </Popconfirm>
                </Fragment>
              ),
            },
          ];
      
          return (
            <PageHeaderWrapper title='${item.description}'>
              <Card bordered={false}>
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>{this.filterForm()}</div>
                  <div className={styles.tableListOperator}>
                    <EditModal
                      modalTitle={'新建${item.description}'}
                      formData={{}}
                      dispatch={dispatch}
                      handleRefresh={this.handleRefresh}
                    >
                      <Button icon='plus' type='primary'>新建</Button>
                    </EditModal>
                    {selectedRows.length > 0 && (
                      <Popconfirm title='确定删除？' onConfirm={() => this.handleDeleteMultiple()}>
                        <Button icon='delete' href='javascript:;'>删除</Button>
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
      
      export default ${pluralName};
    `;
    console.log(`创建：<DIST_PATH>${pagesOutFile.split(DIST_PATH)[1]}`);
    fs.writeFileSync(pagesOutFile, prettier.format(pagesFileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');

  });

  const routerData = `
    export default [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          { path: '/user', redirect: '/user/login' },
          { path: '/user/login', component: './User/Login' },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          { path: '/', redirect: '/dashboard/index' },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                path: '/dashboard/index',
                name: 'index',
                component: './Dashboard/Index',
              },
              ${routerPaths}
            ],
          },
          {
            component: '404',
          },
        ],
      },
    ];
  `;

  const localesData_US = `
    export default {
      'menu.home': 'Home',
      'menu.dashboard': 'Dashboard',
      'menu.dashboard.index': 'Home',
      ${localesMenu_US}
      'menu.account': 'Account',
      'menu.account.center': 'Account Center',
      'menu.account.settings': 'Account Settings',
      'menu.account.trigger': 'Trigger Error',
      'menu.account.logout': 'Logout',
    };
  `;
  const localesData_CN = `
    export default {
      'menu.home': '首页',
      'menu.dashboard': '仪表盘',
      'menu.dashboard.index': '首页',
      ${localesMenu_CN}
      'menu.account': '个人页',
      'menu.account.center': '个人中心',
      'menu.account.settings': '个人设置',
      'menu.account.trigger': '触发报错',
      'menu.account.logout': '退出登录',
    };
  `;

  console.log(`创建：<DIST_PATH>${routerFile.split(DIST_PATH)[1]}`);
  fs.writeFileSync(routerFile, prettier.format(routerData, {
    semi: false,
    parser: "babylon"
  }), 'utf8');

  console.log(`创建：<DIST_PATH>${localesFile_US.split(DIST_PATH)[1]}`);
  fs.writeFileSync(localesFile_US, prettier.format(localesData_US, {
    semi: false,
    parser: "babylon"
  }), 'utf8');

  console.log(`创建：<DIST_PATH>${localesFile_CN.split(DIST_PATH)[1]}`);
  fs.writeFileSync(localesFile_CN, prettier.format(localesData_CN, {
    semi: false,
    parser: "babylon"
  }), 'utf8');

  console.log('\n---全部执行完成---');
} catch (err) {
  console.log(err)
  console.log('非正常退出!!')
}


