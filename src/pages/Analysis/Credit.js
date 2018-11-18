import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Row,
  Col,
  Card,
  Divider,
  Form,
  Select,
  Input,
  Button,
  Icon,
  InputNumber,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import StandardTable from '@/components/StandardTable';
import StandardFormRow from '@/components/StandardFormRow';
import { Pie } from '@/components/Charts';

import styles from './Credit.less';

const FormItem = Form.Item;
const { Option } = Select;

const creditLevelList = [
  {
    id: 'A',
    name: 'A级',
  },
  {
    id: 'B',
    name: 'B级',
  },
  {
    id: 'C',
    name: 'C级',
  },
];

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ credit, loading }) => ({
  credit,
  cioRegionCountLoading: loading.effects['credit/fetchCioRegionCount'],
  cioCreditListLoading: loading.effects['credit/fetchCioCreditList'],
}))
@Form.create()
class Credit extends Component {

  state = {
    expandForm: false,
    formValues: {},
    selectedRows: [],
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'credit/fetchCioRegionCount',
      payload: {}
    });
    dispatch({
      type: 'credit/fetchCioCreditList',
      payload: {}
    });
  }

  renderCioBehaviorTable = () => {
    const {selectedRows} = this.state;
    const {
      cioCreditListLoading,
      credit: {
        creditList,
      }
    } = this.props;
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'name',
      },
      {
        title: '诚信分值',
        dataIndex: 'creditScore',
        sorter: true,
        align: 'center',
      },
      {
        title: '诚信等级',
        dataIndex: 'creditLevel',
        sorter: true,
        align: 'center',
        render: val => `${val}级`,
      },
      {
        title: '不良行为次数',
        dataIndex: 'badBehaviorAmount',
        sorter: true,
        align: 'center',
        render: (val) => <div style={{cursor: 'pointer', color: 'red'}}>{val}</div>,
      },
      {
        title: '良好行为次数',
        dataIndex: 'goodBehaviorAmount',
        sorter: true,
        align: 'center',
        render: (val) => <div style={{cursor: 'pointer', color: 'green'}}>{val}</div>,
      },
    ];

    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        <StandardTable
          loading={cioCreditListLoading}
          selectDisable
          selectedRows={selectedRows}
          data={creditList}
          columns={columns}
          onChange={this.handleStandardTableChange}
        />
      </div>
    );
  };

  renderSimpleForm = () => {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="企业名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="诚信等级">
              {getFieldDecorator('creditLevel', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  style={{ maxWidth: 286, width: '80%' }}
                  placeholder="选择诚信等级"
                >
                  {creditLevelList.map(level => (
                    <Option key={level.id} value={level.id}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              )}
              <a className={styles.clearCreditLevelTrigger} onClick={this.clearCreditLevel}>清除</a>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderAdvancedForm = () => {
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="企业名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="诚信等级">
              {getFieldDecorator('creditLevel', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  style={{ maxWidth: 286, width: '80%' }}
                  placeholder="选择诚信等级"
                >
                  {creditLevelList.map(level => (
                    <Option key={level.id} value={level.id}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              )}
              <a className={styles.clearCreditLevelTrigger} onClick={this.clearCreditLevel}>清除</a>
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
        <StandardFormRow title="诚信分值" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('creditScoreStart')(<InputNumber placeholder="请输入最小分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('creditScoreEnd')(<InputNumber placeholder="请输入最大分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="不良行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('badBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('badBehaviorAmountEnd')(<InputNumber placeholder="请输入最多次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="良好行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('goodBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('goodBehaviorAmountEnd')(<InputNumber placeholder="请输入最多次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
      </Form>
    );
  };

  renderForm = () => {
    const {expandForm} = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  };

  clearCreditLevel = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.setFieldsValue({
      creditLevel: [],
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'credit/fetchCioCreditList',
        payload: values,
      });
    });

  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    dispatch({
      type: 'credit/fetchCioCreditList',
      payload: {},
    });
  };

  toggleForm = () => {
    const {
      expandForm
    } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        // creditLevel: fieldsValue.creditLevel,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'credit/fetchCioCreditList',
        payload: JSON.stringify({
          ...values,
        }),
      });
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sort = `${sorter.field}`;
      params.direction = `${sorter.order}`;
    }

    dispatch({
      type: 'credit/fetchCioCreditList',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {

    const {
      credit: {
        cioRegionCount: {
          qyzs = 0,
          ajizs = 0,
          bjizs = 0,
          cjizs = 0,
          qybdbl = 0,
          ajibdbl = 0,
          bjibdbl = 0,
          cjibdbl = 0,
        },
      }
    } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6,
    };

    return (
      <GridContent>
        <Card title="诚信企业数量" bodyStyle={{ padding: 0 }} style={{marginTop: 12}}>
          <Row gutter={6}>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ paddingBottom: '8px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>总数：</span>
                  <span className={styles.number}>{qyzs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <Pie percent={qybdbl} subTitle="本地企业" total={`${qybdbl}%`} height={140} />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ paddingBottom: '8px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>A级：</span>
                  <span className={styles.number}>{ajizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <Pie percent={ajibdbl} subTitle="本地企业" total={`${ajibdbl}%`} height={140} />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ paddingBottom: '8px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>B级：</span>
                  <span className={styles.number}>{bjizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <Pie percent={bjibdbl} subTitle="本地企业" total={`${bjibdbl}%`} height={140} />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ paddingBottom: '8px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>C级：</span>
                  <span className={styles.number}>{cjizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <Pie percent={cjibdbl} subTitle="本地企业" total={`${cjibdbl}%`} height={140} />
              </Card>
            </Col>
          </Row>
        </Card>
        <Card bordered={false} title="企业诚信" bodyStyle={{ padding: '12 0 0 0' }} style={{marginTop: 12}}>
          {this.renderCioBehaviorTable()}
        </Card>
      </GridContent>
    );
  }
}

export default Credit;
