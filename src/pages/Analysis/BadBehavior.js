import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Table, DatePicker } from 'antd';
import { Pie } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import MatrixBar from './MatrixBar/MatrixBar';

import styles from './BadBehavior.less';

import { getTimeDistance } from '@/utils/utils';

const { RangePicker } = DatePicker;

@connect(({ badBehavior, loading }) => ({
  badBehavior,
  blxwJgbmzbLoading: loading.effects['badBehavior/fetchBlxwJgbmzb'],
  blxwJgbmlxzbLoading: loading.effects['badBehavior/fetchBlxwJgbmlxzb'],
  blxwQyxwpmLoading: loading.effects['badBehavior/fetchBlxwQyxwpm'],
  blxwGrxwpmLoading: loading.effects['badBehavior/fetchBlxwGrxwpm'],
  blxwXmpmLoading: loading.effects['badBehavior/fetchBlxwXmpm'],
  blxwXwlxpmLoading: loading.effects['badBehavior/fetchBlxwXwlxpm'],
}))
class BadBehavior extends Component {

  state = {
    rangePickerValue: getTimeDistance('year'),
    blxwQyxwpmPagination: {
      current: 1,
      pageSize: 10,
    },
    blxwGrxwpmPagination: {
      current: 1,
      pageSize: 10,
    },
    blxwXmpmPagination: {
      current: 1,
      pageSize: 10,
    },
    blxwXwlxpmPagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'badBehavior/clear',
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
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    const { dispatch } = this.props;
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    dispatch({
      type: 'badBehavior/fetchBlxwJgbmzb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'badBehavior/fetchBlxwJgbmlxzb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'badBehavior/fetchBlxwQyxwpm',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'badBehavior/fetchBlxwGrxwpm',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'badBehavior/fetchBlxwXmpm',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'badBehavior/fetchBlxwXwlxpm',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
  };

  // 不良行为项目排名翻页
  handleBlxwXmpmTableChange = (pagination) => {
    this.setState({
      blxwXmpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 行为类型排名翻页
  handleBlxwXwlxpmTableChange = (pagination) => {
    this.setState({
      blxwXwlxpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 企业行为排名翻页
  handleBlxwQyxwpmTableChange = (pagination) => {
    this.setState({
      blxwQyxwpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 个人行为排名翻页
  handleBlxwGrxwpmTableChange = (pagination) => {
    this.setState({
      blxwGrxwpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 机构部门占比
  renderBlxwJgbmzb = () => {

    const {
      badBehavior: {
        blxwJgbmzb,
      }
    } = this.props;

    if (blxwJgbmzb && blxwJgbmzb.length > 0) {
      return (
        <Pie
          hasLegend
          subTitle="总数"
          total={() => blxwJgbmzb.reduce((pre, now) => now.y + pre, 0)}
          data={blxwJgbmzb}
          valueFormat={value => `${value}`}
          height={248}
          lineWidth={4}
        />
      )
    }
    return (
      <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
    )
  };

  render() {
    const {
      blxwQyxwpmPagination,
      blxwGrxwpmPagination,
      blxwXmpmPagination,
      blxwXwlxpmPagination,
    } = this.state;
    const {
      blxwJgbmzbLoading,
      blxwJgbmlxzbLoading,
      blxwQyxwpmLoading,
      blxwGrxwpmLoading,
      blxwXmpmLoading,
      blxwXwlxpmLoading,
      badBehavior: {
        blxwJgbmzb,
        blxwJgbmlxzb,
        blxwQyxwpm,
        blxwGrxwpm,
        blxwXmpm,
        blxwXwlxpm,
      },
    } = this.props;

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    // 行为类型排名占比
    const behaviorListColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '10%',
        align: 'center',
      },
      {
        title: '行为编码',
        dataIndex: 'behaviorNo',
        width: '25%',
      },
      {
        title: '行为类型',
        dataIndex: 'behaviorType',
        width: '25%',
      },
      {
        title: '总项目数',
        dataIndex: 'countOfEng',
        width: '20%',
        align: 'center',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '20%',
      },
    ];

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

    // 个人行为排名占比
    const personalBehaviorRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '8%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
      },
      {
        title: '所属企业',
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
        width: '10%',
      },
      {
        title: '不良行为',
        dataIndex: 'amountOfBehavior',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '12%',
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

    return (
      <GridContent>
        {this.renderRangePicker()}
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwJgbmzbLoading} title="机构部门占比" bodyStyle={{ minHeight: '300px' }}>
              {this.renderBlxwJgbmzb()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="项目排名占比" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={blxwXmpmLoading}
                size="small"
                scroll={{ y: 200 }}
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
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwJgbmlxzbLoading} title="机构部门类型占比" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              {
                blxwJgbmlxzb && blxwJgbmlxzb.length > 0 ? (
                  <MatrixBar
                    height={390}
                    padding={[5, 5, 100, 60]}
                    data={blxwJgbmlxzb}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwXwlxpmLoading} title="行为类型排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                size="small"
                scroll={{ y: 305 }}
                dataSource={blxwXwlxpm}
                columns={behaviorListColumns}
                pagination={{
                  ...blxwXwlxpmPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 种行为类型.`,
                }}
                onChange={this.handleBlxwXwlxpmTableChange}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwQyxwpmLoading} title="企业行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
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
            <Card loading={blxwGrxwpmLoading} title="个人行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                size="small"
                scroll={{ y: 280 }}
                dataSource={blxwGrxwpm}
                columns={personalBehaviorRankingList}
                pagination={{
                  ...blxwGrxwpmPagination,
                  pageSizeOptions: ['10', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 人.`,
                }}
                onChange={this.handleBlxwGrxwpmTableChange}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default BadBehavior;
