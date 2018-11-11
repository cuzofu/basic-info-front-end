import React, {Component} from 'react';
import {connect} from 'dva';

import numeral from 'numeral';

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

const { RangePicker } = DatePicker;

@connect(({bidding, loading}) => ({
  bidding,
  basicInfoLoading: loading.effects['bidding/fetchBasicInfo'],
  engTypeLoading: loading.effects['bidding/fetchEngType'],
  regionTypeLoading: loading.effects['bidding/fetchRegionType'],
  gmfbLoading: loading.effects['bidding/fetchGmfb'],
  tzefbLoading: loading.effects['bidding/fetchTzefb'],
  zbfstjLoading: loading.effects['bidding/fetchZbfstj'],
}))
class Bidding extends Component {

  state = {
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    const {
      rangePickerValue,
    } = this.state;

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

    dispatch({
      type: 'bidding/fetchBasicInfo',
      payload: {
        gjTime: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchEngType',
      payload: {
        gjTime: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchRegionType',
      payload: {
        gjTime: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchGmfb',
      payload: {
        gjTime: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchTzefb',
      payload: {
        gjTime: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchZbfstj',
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
      type: 'bidding/fetchZbfstj',
      payload: {
        firstTime: startTime,
        lastTime: endTime,
      }
    });
  };

  render() {

    const {
      rangePickerValue,
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
          sumZBS = 0,
          zbytb = "0.00",
          zbyhb= '0.00',
          sumLBS = 0,
          lbbl = '0.00',
          sumCXKB = 0,
          cxkbbl = '0.00',
          sumZBCG = 0,
          cgbl = '0.00',
          list = [],
        },
        engType,
        regionType,
        tzefb,
        gmfb,
        zbfstj,
      }
    } = this.props;

    const topColResponsiveProps = {xs: 24, sm: 12, md: 12, lg: 12, xl: 6, style: {marginBottom: 12},};

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    const engTypeData = engType.map( r => ({
      x: r.gcType,
      y: r.gcNum,
      tb: parseFloat(r.ytb).toFixed(2), // 月同比
      hb: parseFloat(r.yhb).toFixed(2), // 月环比
    }));

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
        align: 'center',
        render: (val) => (val - 0).toFixed(4)
      },
      {
        title: '面积（㎡）',
        dataIndex: 'zbmj',
        align: 'center',
        render: (val) => (val - 0).toFixed(2)
      },
      {
        title: '公里数（km）',
        dataIndex: 'gls',
        align: 'center',
        render: (val) => (val - 0).toFixed(2)
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
          />
        </div>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={basicInfoLoading}
              title="招标数"
              action={
                <Tooltip
                  title="说明"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral({sumZBS}).format('0,0')}
              footer={
                <div style={{ textAlign: 'center' }}>
                  <Trend flag="up" reverseColor style={{ padding: '0 6px 0 0' }}>
                    <span>月同比</span>
                    <span className={styles.trendText}>{`${(parseFloat(zbytb) * 100).toFixed(2)}%`}</span>
                  </Trend>
                  <Trend flag="down" reverseColor style={{ padding: '0 0 0 6px' }}>
                    <span>月环比</span>
                    <span className={styles.trendText}>{`${(parseFloat(zbyhb) * 100).toFixed(2)}%`}</span>
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
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${(parseFloat(lbbl) * 100).toFixed(2)}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={(parseFloat(lbbl) * 100).toFixed(2)} strokeWidth={8} />
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
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${(parseFloat(cxkbbl) * 100).toFixed(2)}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <Pie percent={(parseFloat(cgbl) * 100).toFixed(2)} total={`${(parseFloat(cxkbbl) * 100).toFixed(2)}%`} height={100} />
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
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>{`${(parseFloat(cgbl) * 100).toFixed(2)}%`}</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={(parseFloat(cgbl) * 100).toFixed(2)} strokeWidth={8} target={90} color="green" />
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
              loading={engTypeLoading}
              title="工程类型"
              bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}
            >
              {
                engTypeData && engTypeData.length > 0 ? (
                  <TrendPie
                    hasLegend
                    subTitle="数量"
                    total={() => `${engTypeData.reduce((pre, now) => now.y + pre, 0)}个`}
                    data={engTypeData}
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
      </GridContent>
    );
  }
}

export default Bidding;
