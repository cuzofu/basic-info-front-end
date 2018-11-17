import React, {Component} from 'react';
import {connect} from 'dva';

import numeral from 'numeral';
import moment from 'moment';

import { getTimeDistance } from '@/utils/utils';
import {
  Table,
  Row,
  Col,
  Card,
  Tooltip,
  Icon,
  DatePicker,
} from 'antd';

import {
  ChartCard,
  MiniBar,
  MiniProgress,
  Pie,
  TrendPie,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import MatrixBar from './MatrixBar/MatrixBar';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Bidding.less';
import DimensionsScatterChart from './DimensionsScatterChart';
import InvestmentScatterChart from './InvestmentScatterChart';

const { RangePicker, MonthPicker } = DatePicker;

@connect(({bidding, loading}) => ({
  bidding,
  basicInfoLoading: loading.effects['bidding/fetchBasicInfo'],
  engTypeLoading: loading.effects['bidding/fetchEngType'],
  regionTypeLoading: loading.effects['bidding/fetchRegionType'],
  gmfbLoading: loading.effects['bidding/fetchGmfb'],
  tzefbLoading: loading.effects['bidding/fetchTzefb'],
  zbfstjLoading: loading.effects['bidding/fetchZbfstj'],
  engZtbLoading: loading.effects['bidding/fetchEngQyzbtj'],
}))
class Bidding extends Component {

  state = {
    rangePickerValue: getTimeDistance('year'),
    monthPickerValue: moment(new Date(), 'YYYY-MM'),
    engZtbListPagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    const {
      rangePickerValue,
      monthPickerValue,
    } = this.state;

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    dispatch({
      type: 'bidding/fetchBasicInfo',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchEngType',
      payload: {
        key: monthPickerValue.format('YYYY-MM'),
      }
    });
    dispatch({
      type: 'bidding/fetchRegionType',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchGmfb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchTzefb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchZbfstj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchEngQyzbtj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bidding/clear',
    });
  }

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

    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    dispatch({
      type: 'bidding/fetchBasicInfo',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchRegionType',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchGmfb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchTzefb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchZbfstj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchEngQyzbtj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
  };

  handleMonthPickerChange = (date, dateString) => {
    if (!date) {
      return;
    }
    this.setState({
      monthPickerValue: date,
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'bidding/fetchEngType',
      payload: {
        key: dateString
      }
    });
  };

  handleRangePickerChange = rangePickerValue => {
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    dispatch({
      type: 'bidding/fetchBasicInfo',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchRegionType',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchGmfb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchTzefb',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchZbfstj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
    dispatch({
      type: 'bidding/fetchEngQyzbtj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
  };

  // 企业行为排名翻页
  handleEngZtbTableChange = (pagination) => {
    this.setState({
      engZtbListPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  render() {

    const {
      rangePickerValue,
      monthPickerValue,
      engZtbListPagination,
    } = this.state;

    const {
      basicInfoLoading,
      engTypeLoading,
      regionTypeLoading,
      gmfbLoading,
      tzefbLoading,
      zbfstjLoading,
      bidding: {
        basicInfo: {
          list = [],
          byzbs = 0,
          zbsTb = 0,
          zbsHb = 0,
          sumLBS = 0,
          lbl = 0,
          sumCXKB = 0,
          cxkbl = 0,
          sumZBCG = 0,
          cgl = 0,
        },
        engType,
        regionType,
        tzefb,
        gmfb,
        zbfstj,
        engZtbList,
      }
    } = this.props;

    const topColResponsiveProps = {xs: 24, sm: 12, md: 12, lg: 12, xl: 6, style: {marginBottom: 12},};

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    const biddingColumns = [
      {
        title: '招标方式',
        dataIndex: 'zbfs',
        align: 'center',
      },
      {
        title: '项目总数',
        dataIndex: 'count',
        align: 'center',
      },
      {
        title: '投资总额（万元）',
        dataIndex: 'zbje',
        align: 'right',
        render: (val) => numeral((val - 0)).format('0,0.0000')
      },
      {
        title: '面积（㎡）',
        dataIndex: 'zbmj',
        align: 'right',
        render: (val) => numeral((val - 0)).format('0,0.0000')
      },
      {
        title: '公里数（km）',
        dataIndex: 'gls',
        align: 'right',
        render: (val) => numeral((val - 0)).format('0,0.0000')
      },
    ];

    return (
      <GridContent>
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
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={basicInfoLoading}
              title="本月招标数"
              action={
                <Tooltip
                  title="说明"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral({byzbs}).format('0,0')}
              footer={
                <div style={{ textAlign: 'center' }}>
                  <Trend flag={zbsTb >= 0 ? 'up' : 'down'} reverseColor style={{ padding: '0 6px 0 0' }}>
                    <span>月同比</span>
                    <span className={styles.trendText}>{`${zbsTb}%`}</span>
                  </Trend>
                  <Trend flag={zbsHb >= 0 ? 'up' : 'down'} reverseColor style={{ padding: '0 0 0 6px' }}>
                    <span>月环比</span>
                    <span className={styles.trendText}>{`${zbsHb}%`}</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniBar data={list.map(r => ({
                x: r.groupX,
                y: r.groupY - 0,
              }))}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="流标数"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={sumLBS}
              footer={
                <div>
                  <span>
                    流标率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${lbl}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={lbl} strokeWidth={8} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="重新开标"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={sumCXKB}
              footer={
                <div>
                  <span>
                    成功率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${cxkbl}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <Pie percent={cxkbl} total={`${cxkbl}%`} height={100} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="招标成功"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={sumZBCG}
              footer={
                <div>
                  <span>
                    成功率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${cgl}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={cgl} strokeWidth={8} target={90} color="green" />
            </ChartCard>
          </Col>
        </Row>
        <Card
          loading={zbfstjLoading}
          title="招标方式数据统计"
          style={{marginBottom: '12px'}}
          bodyStyle={{ minHeight: '300px', padding: '5px' }}
        >
          <Table
            rowKey="zbfs"
            dataSource={zbfstj}
            columns={biddingColumns}
            pagination={false}
          />
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              className={styles.cardExtra}
              loading={engTypeLoading}
              title="工程类型"
              bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}
              extra={
                <MonthPicker
                  value={monthPickerValue}
                  onChange={this.handleMonthPickerChange}
                />
              }
            >
              {
                engType && engType.length > 0 ? (
                  <TrendPie
                    hasLegend
                    subTitle="数量"
                    total={() => `${engType.reduce((pre, now) => now.y + pre, 0)}个`}
                    data={engType}
                    valueFormat={value => `${value}个`}
                    height={248}
                    lineWidth={4}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={regionTypeLoading}
              title="区域分布"
              bodyStyle={{ minHeight: '300px', padding: '5px' }}
            >
              {
                regionType && regionType.length > 0 ? (
                  <MatrixBar
                    height={290}
                    padding={[10, 10, 100, 50]}
                    data={regionType}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={tzefbLoading} title="投资额分布" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              {
                tzefb && tzefb.length > 0 ? (
                  <InvestmentScatterChart
                    id="investment"
                    height={390}
                    data={tzefb}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={gmfbLoading} title="规模分布" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              {
                gmfb.listgls.length === 0 && gmfb.listmje.length === 0 ? (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                ) : (
                  <DimensionsScatterChart id="dimensions" height={390} data={gmfb} />
                )
              }
            </Card>
          </Col>
        </Row>
        <Card
          title="企业招投标统计"
          bodyStyle={{ height: '400px', padding: '5px' }}
        >
          <Table
            size="large"
            scroll={{ y: 260 }}
            dataSource={engZtbList}
            columns={[
              {
                title: '排名',
                dataIndex: 'rank',
                width: '10%',
              },
              {
                title: '企业名称',
                dataIndex: 'cioName',
                width: '15%',
              },
              {
                title: '投标数量',
                dataIndex: 'tbCount',
                width: '15%',
              },
              {
                title: '中标数量',
                dataIndex: 'zbCount',
                width: '15%',
              },
              {
                title: '未中标数量',
                dataIndex: 'wzCount',
                width: '15%',
              },
              {
                title: '中标率',
                dataIndex: 'zbl',
                width: '15%',
              },
              {
                title: '未中标率',
                dataIndex: 'wzl',
                width: '15%',
              },
            ]}
            pagination={{
              ...engZtbListPagination,
              pageSizeOptions: ['10', '20', '50'],
              showSizeChanger: true,
              showTotal: total => `总计 ${total} 条记录.`,
            }}
            onChange={this.handleEngZtbTableChange}
          />
        </Card>
      </GridContent>
    );
  }
}

export default Bidding;
