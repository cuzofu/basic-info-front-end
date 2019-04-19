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
  Table,
  InputNumber,
  DatePicker,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import StandardTable from '@/components/StandardTable';
import StandardFormRow from '@/components/StandardFormRow';
import { Pie } from '@/components/Charts';

import { getTimeDistance } from '@/utils/utils';

import styles from './Credit.less';

const FormItem = Form.Item;
const { Option } = Select;

const { RangePicker } = DatePicker;

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

@connect(({ credit, badBehavior, mm, loading }) => ({
  credit,
  badBehavior,
  mm,
  cioRegionCountLoading: loading.effects['credit/fetchCioRegionCount'],
  cioCreditListLoading: loading.effects['credit/fetchCioCreditList'],
  blxwXmpmLoading: loading.effects['badBehavior/fetchBlxwXmpm'],
  blxwQyxwpmLoading: loading.effects['badBehavior/fetchBlxwQyxwpm'],
  bqqycxpmLoading: loading.effects['mm/fetchBqqycxpm'],
}))
@Form.create()
class Credit extends Component {

  state = {
    rangePickerValue: getTimeDistance('year'),
    expandForm: false,
    formValues: {},
    selectedRows: [],
    blxwXmpmPagination: {
      current: 0,
      pageSize: 10,
    },
    blxwQyxwpmPagination: {
      current: 0,
      pageSize: 10,
    },
  };

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'mm/fetchBqqycxpm',
      payload: {
        currentPage: 0,
        pageSize: 10,
      }
    });
    dispatch({
      type: 'credit/fetchCioRegionCount',
      payload: {}
    });
    /*
    dispatch({
      type: 'credit/fetchCioCreditList',
      payload: {}
    });
    */

    const {
      rangePickerValue,
    } = this.state;

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    this.reqRef = requestAnimationFrame(() => {
      this.fetchData(rangePickerValue);
    });
  }

  renderRangePicker = () => {
    const {
      rangePickerValue
    } = this.state;

    return (
      <div className={styles.timeExtraWrap}>
        <div className={styles.timeExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>今日</a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>本周</a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>本月</a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>今年</a>
        </div>
        <RangePicker
          value={rangePickerValue}
          style={{ width: 256 }}
          onChange={this.handleRangePickerChange}
        />
      </div>
    );
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  selectDate = type => {

    const rangePickerValue = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    this.setState({
      rangePickerValue,
    });

    this.fetchData(rangePickerValue);
  };

  handleRangePickerChange = rangePickerValue => {
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    this.setState({
      rangePickerValue,
    });

    this.fetchData(rangePickerValue);
  };

  fetchData = (rangePickerValue) => {
    this.fetchBlxwXmpm(rangePickerValue);
    this.fetchBlxwQyxwpm(rangePickerValue);
  };

  fetchBlxwQyxwpm = (rangePickerValue) => {

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    const {dispatch} = this.props;
    dispatch({
      type: 'badBehavior/fetchBlxwQyxwpm',
      payload: {
        // firstTime: startTime,
        // lastTime: endTime,
      }
    });
  };

  fetchBlxwXmpm = (rangePickerValue) => {

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    const {dispatch} = this.props;
    dispatch({
      type: 'badBehavior/fetchBlxwXmpm',
      payload: {
        // firstTime: startTime,
        // lastTime: endTime,
      }
    });
  };

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
      currentPage: pagination.current - 1,
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

  // 企业行为排名翻页
  handleBlxwQyxwpmTableChange = (pagination) => {
    this.setState({
      blxwQyxwpmPagination: {
        current: pagination.current - 1,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 不良行为项目排名翻页
  handleBlxwXmpmTableChange = (pagination) => {
    this.setState({
      blxwXmpmPagination: {
        current: pagination.current - 1,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 本期企业诚信排名翻页
  handleBqqycxpmTableChange = (pagination) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'mm/fetchBqqycxpm',
      payload: {
        currentPage: pagination.current - 1,
        pageSize: pagination.pageSize,
      }
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {

    const {blxwXmpmPagination, blxwQyxwpmPagination} = this.state;
    const {
      bqqycxpmLoading,
      blxwXmpmLoading,
      blxwQyxwpmLoading,
      mm: {
        bqqycxpm,
      },
      badBehavior: {
        blxwXmpm,
        blxwQyxwpm,
      },
      credit: {
        cioRegionCount: {
          qyzs = 0,
          qybd = 0,
          qywd = 0,
          ajizs = 0,
          ajbd = 0,
          ajwd = 0,
          bjizs = 0,
          bjbd = 0,
          bjwd = 0,
          cjizs = 0,
          cjbd = 0,
          cjwd = 0,
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

    // 项目排名占比
    const projectRankingColumns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '项目名称',
        dataIndex: 'engName',
        width: '30%',
      },
      {
        title: '企业',
        dataIndex: 'countEng',
        width: '15%',
      },
      {
        title: '人员',
        dataIndex: 'countPerson',
        width: '15%',
      },
      {
        title: '总记录',
        dataIndex: 'count',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
      },
    ];

    // 企业行为排名占比
    const orgBehaviorRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'orgName',
        width: '30%',
      },
      {
        title: '信用等级',
        dataIndex: 'creditLevel',
        width: '15%',
      },
      {
        title: '信用分',
        dataIndex: 'creditScore',
        width: '15%',
      },
      {
        title: '不良行为',
        dataIndex: 'amountOfBehavior',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
        render: (val) => `${(val * 100).toFixed(2)}%`
      },
    ];

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    return (
      <GridContent>

        <Card title="诚信企业数量" bodyStyle={{ padding: 0 }} style={{marginTop: 12}}>
          <Row gutter={6}>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ padding: '12px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>总数：</span>
                  <span className={styles.number}>{qyzs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <div style={{margin: '0 0 10px'}}>
                  <div style={{float: 'left',width: '100%'}}>
                    <div style={{marginRight: 140}}>
                      <div>本地：{qybd}家</div>
                      <div>外地：{qywd}家</div>
                    </div>
                  </div>
                  <div style={{position: 'relative',float: 'right',width: 140, marginLeft: -140}}>
                    <Pie percent={qybdbl} subTitle="本地企业" total={`${qybdbl}%`} height={140} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ padding: '12px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>A级：</span>
                  <span className={styles.number}>{ajizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <div style={{margin: '0 0 10px'}}>
                  <div style={{float: 'left',width: '100%'}}>
                    <div style={{marginRight: 140}}>
                      <div>本地：{ajbd}家</div>
                      <div>外地：{ajwd}家</div>
                    </div>
                  </div>
                  <div style={{position: 'relative',float: 'right',width: 140, marginLeft: -140}}>
                    <Pie percent={ajibdbl} subTitle="本地企业" total={`${ajibdbl}%`} height={140} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ padding: '12px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>B级：</span>
                  <span className={styles.number}>{bjizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <div style={{margin: '0 0 10px'}}>
                  <div style={{float: 'left',width: '100%'}}>
                    <div style={{marginRight: 140}}>
                      <div>本地：{bjbd}家</div>
                      <div>外地：{bjwd}家</div>
                    </div>
                  </div>
                  <div style={{position: 'relative',float: 'right',width: 140, marginLeft: -140}}>
                    <Pie percent={bjibdbl} subTitle="本地企业" total={`${bjibdbl}%`} height={140} />
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{ padding: '12px' }}>
                <div className={styles.topNumber}>
                  <span className={styles.text}>C级：</span>
                  <span className={styles.number}>{cjizs}</span>
                  <span className={styles.text}>家</span>
                </div>
                <Divider />
                <div style={{margin: '0 0 10px'}}>
                  <div style={{float: 'left',width: '100%'}}>
                    <div style={{marginRight: 140}}>
                      <div>本地：{cjbd}家</div>
                      <div>外地：{cjwd}家</div>
                    </div>
                  </div>
                  <div style={{position: 'relative',float: 'right',width: 140, marginLeft: -140}}>
                    <Pie percent={cjibdbl} subTitle="本地企业" total={`${cjibdbl}%`} height={140} />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card style={{marginTop: 20}} loading={bqqycxpmLoading} title="企业诚信排名" bodyStyle={{ height: '400px', padding: '5px' }} >
          <Table
            size="large"
            scroll={{ y: 260 }}
            dataSource={bqqycxpm.data}
            columns={[
              {
                title: '排名',
                dataIndex: 'rank',
                width: '10%',
              },
              {
                title: '企业名称',
                dataIndex: 'orgName',
                width: '45%',
              },
              {
                title: '本期分数',
                dataIndex: 'score',
                width: '15%',
              },
              {
                title: '诚信分数',
                dataIndex: 'creditScore',
                width: '15%',
              },
              {
                title: '等级',
                dataIndex: 'creditLevel',
                width: '15%',
              },
            ]}
            pagination={{
              ...bqqycxpm.pagination,
              pageSizeOptions: ['10', '20', '50'],
              showSizeChanger: true,
              size: 'small',
              showTotal: total => `总计 ${total} 条记录.`,
            }}
            onChange={this.handleBqqycxpmTableChange}
          />
        </Card>

        {/*
        {this.renderRangePicker()}
        */}

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>

            <Card style={{marginTop: 20}} loading={blxwQyxwpmLoading} title="企业不良行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                size="small"
                scroll={{ y: 300 }}
                dataSource={blxwQyxwpm}
                columns={orgBehaviorRankingList}
                pagination={{
                  pageSize: blxwQyxwpmPagination.pageSize,
                  current: blxwQyxwpmPagination.current,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 家企业.`,
                }}
                onChange={this.handleBlxwQyxwpmTableChange}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card style={{marginTop: 20}} title="项目不良行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                loading={blxwXmpmLoading}
                size="small"
                scroll={{ y: 300 }}
                dataSource={blxwXmpm}
                columns={projectRankingColumns}
                pagination={{
                  ...blxwXmpmPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 个项目.`,
                }}
                onChange={this.handleBlxwXmpmTableChange}
              />
            </Card>
          </Col>
        </Row>

        {/*
        <Card bordered={false} title="企业诚信" bodyStyle={{ padding: '12 0 0 0' }} style={{marginTop: 12}}>
          {this.renderCioBehaviorTable()}
        </Card>
        */}
      </GridContent>
    );
  }
}

export default Credit;
