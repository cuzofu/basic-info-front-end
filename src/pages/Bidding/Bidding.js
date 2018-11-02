import React, {Component} from 'react';
import {connect} from 'dva';

import numeral from 'numeral';

import {
  Row,
  Col,
  Card,
  Tooltip,
  Icon,
} from 'antd';

import {
  ChartCard,
  MiniBar,
  MiniProgress,
  Pie,
  TrendPie,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import MatrixBar from '../Analysis/MatrixBar/MatrixBar';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Bidding.less';
import DimensionsScatterChart from './DimensionsScatterChart';
import InvestmentScatterChart from './InvestmentScatterChart';

@connect(({bidding, loading}) => ({
  bidding,
  basicInfoLoading: loading.effects['bidding/fetchBasicInfo'],
  engTypeLoading: loading.effects['bidding/fetchEngType'],
  regionTypeLoading: loading.effects['bidding/fetchRegionType'],
  gmfbLoading: loading.effects['bidding/fetchGmfb'],
  tzefbLoading: loading.effects['bidding/fetchTzefb'],
}))
class Bidding extends Component {

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'bidding/fetchBasicInfo',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchEngType',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchRegionType',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchGmfb',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'bidding/fetchTzefb',
      payload: {
        time: '2018-10-29'
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bidding/clear',
    });
  }

  render() {

    const {
      basicInfoLoading,
      engTypeLoading,
      regionTypeLoading,
      gmfbLoading,
      tzefbLoading,
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
        },
        engType,
        regionType,
        tzefb,
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

    return (
      <GridContent>
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
              <MiniBar data={[
                {
                  x: '2018-01',
                  y: 45
                },
                {
                  x: '2018-02',
                  y: 69
                },
                {
                  x: '2018-03',
                  y: 108
                },
                {
                  x: '2018-04',
                  y: 88
                },
                {
                  x: '2018-05',
                  y: 79
                },
                {
                  x: '2018-06',
                  y: 99
                },
                {
                  x: '2018-07',
                  y: 112
                },
                {
                  x: '2018-08',
                  y: 69
                }
              ]}
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

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={engTypeLoading}
              title="工程类型"
              bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}
            >
              <TrendPie
                hasLegend
                subTitle="数量"
                total={() => `${engTypeData.reduce((pre, now) => now.y + pre, 0)}个`}
                data={engTypeData}
                valueFormat={value => `${value}个`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={regionTypeLoading}
              title="区域分布"
              bodyStyle={{ minHeight: '300px', padding: '5px' }}
            >
              <MatrixBar
                height={290}
                padding={[10, 10, 100, 50]}
                data={regionType}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={tzefbLoading} title="投资额分布" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <InvestmentScatterChart
                id="investment"
                height={390}
                data={tzefb}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={gmfbLoading} title="规模分布" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <DimensionsScatterChart id="dimensions" height={390} />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Bidding;
