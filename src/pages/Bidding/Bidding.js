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

@connect(({bidding, loading}) => ({
  bidding,
  basicInfoLoading: loading.effects['bidding/fetchBasicInfo'],
  engTypeLoading: loading.effects['bidding/fetchEngType'],
}))
class Bidding extends Component {

  render() {

    const {
      basicInfoLoading
    } = this.props;

    const topColResponsiveProps = {xs: 24, sm: 12, md: 12, lg: 12, xl: 6, style: {marginBottom: 12},};

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    const engTypeData = [
      {
        x: '住宅工程',
        y: 1000,
      },
      {
        x: '公共建筑',
        y: 500,
      },
      {
        x: '工业厂房',
        y: 300,
      },
      {
        x: '构筑物',
        y: 480,
      },
      {
        x: '市政工程',
        y: 805,
      },
      {
        x: '绿化工程',
        y: 1015,
      },
      {
        x: '其它',
        y: 1015,
      },
    ];

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
              total={numeral(1222).format('0,0')}
              footer={
                <div style={{ textAlign: 'center' }}>
                  <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                    <span>月同比</span>
                    <span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down" reverseColor style={{ padding: '0 12px' }}>
                    <span>月环比</span>
                    <span className={styles.trendText}>11%</span>
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
              total="833"
              footer={
                <div>
                  <span>
                    流标率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>12%</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={12} strokeWidth={8} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="重新开标"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total="199"
              footer={
                <div>
                  <span>
                    成功率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>90%</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <Pie percent={90} total="90%" height={100} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="招标成功"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total="88"
              footer={
                <div>
                  <span>
                    成功率
                    <Trend style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>95%</Trend>
                  </span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={95} strokeWidth={8} target={90} color="green" />
            </ChartCard>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="工程类型" bodyStyle={{ minHeight: '300px' }}>
              <TrendPie
                hasLegend
                subTitle="数量"
                total={() => `${engTypeData.reduce((pre, now) => now.y + pre, 0)}家`}
                data={engTypeData}
                valueFormat={value => `${value}个`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="机构部门类型占比" bodyStyle={{ minHeight: '300px', padding: '5px' }}>
              <MatrixBar
                height={290}
                padding={[10, 10, 100, 50]}
                data={[
                  { groupY: '西陵区', value: 0.5, groupX: '市政工程' },
                  { groupY: '西陵区', value: 0.5, groupX: '住宅工程' },
                  { groupY: '西陵区', value: 0.2, groupX: '公共建筑' },
                  { groupY: '西陵区', value: 0.33, groupX: '工业厂房' },
                  { groupY: '西陵区', value: 0.22, groupX: '绿化工程' },
                  { groupY: '西陵区', value: 0.11, groupX: '构筑物' },
                  { groupY: '西陵区', value: 0.65, groupX: '其他' },

                  { groupY: '伍家区', value: 0.09, groupX: '市政工程' },
                  { groupY: '伍家区', value: 0.99, groupX: '住宅工程' },
                  { groupY: '伍家区', value: 0.05, groupX: '公共建筑' },
                  { groupY: '伍家区', value: 0.15, groupX: '工业厂房' },
                  { groupY: '伍家区', value: 0.25, groupX: '绿化工程' },
                  { groupY: '伍家区', value: 0.11, groupX: '构筑物' },
                  { groupY: '伍家区', value: 0.65, groupX: '其他' },

                  { groupY: '夷陵区', value: 0.22, groupX: '市政工程' },
                  { groupY: '夷陵区', value: 0.33, groupX: '住宅工程' },
                  { groupY: '夷陵区', value: 0.44, groupX: '公共建筑' },
                  { groupY: '夷陵区', value: 0.55, groupX: '工业厂房' },
                  { groupY: '夷陵区', value: 0.77, groupX: '绿化工程' },
                  { groupY: '夷陵区', value: 0.88, groupX: '构筑物' },
                  { groupY: '夷陵区', value: 0.66, groupX: '其他' },

                  { groupY: '点军区', value: 0.44, groupX: '市政工程' },
                  { groupY: '点军区', value: 0.22, groupX: '住宅工程' },
                  { groupY: '点军区', value: 0.11, groupX: '公共建筑' },
                  { groupY: '点军区', value: 0.09, groupX: '工业厂房' },
                  { groupY: '点军区', value: 0.89, groupX: '绿化工程' },
                  { groupY: '点军区', value: 0.05, groupX: '构筑物' },
                  { groupY: '点军区', value: 0.15, groupX: '其他' },

                  { groupY: '高新区', value: 0.25, groupX: '市政工程' },
                  { groupY: '高新区', value: 0.09, groupX: '住宅工程' },
                  { groupY: '高新区', value: 0.89, groupX: '公共建筑' },
                  { groupY: '高新区', value: 0.05, groupX: '工业厂房' },
                  { groupY: '高新区', value: 0.15, groupX: '绿化工程' },
                  { groupY: '高新区', value: 0.25, groupX: '构筑物' },
                  { groupY: '高新区', value: 0.09, groupX: '其他' },

                  { groupY: '猇亭区', value: 0.89, groupX: '市政工程' },
                  { groupY: '猇亭区', value: 0.05, groupX: '住宅工程' },
                  { groupY: '猇亭区', value: 0.15, groupX: '公共建筑' },
                  { groupY: '猇亭区', value: 0.25, groupX: '工业厂房' },
                  { groupY: '猇亭区', value: 0.09, groupX: '绿化工程' },
                  { groupY: '猇亭区', value: 0.89, groupX: '构筑物' },
                  { groupY: '猇亭区', value: 0.05, groupX: '其他' },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Bidding;
