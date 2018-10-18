import React, {Component} from 'react';
import {connect} from 'dva';

import numeral from 'numeral';

import {
  Row,
  Col,
  Card,
} from 'antd';

import {
  Pie,
  TrendPie,
  SimplyLegendPie,
} from '@/components/Charts';
import MatrixBar from '../Analysis/MatrixBar/MatrixBar';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Contract.less';

@connect(({contract, loading}) => ({
  contract,
  basicInfoLoading: loading.effects['contract/fetchBasicInfo'],
  contractAmountLoading: loading.effects['contract/fetchContractAmountDataByRegion'],
  finalAccountsLoading: loading.effects['contract/fetchFinalAccountsDataByRegion'],
}))
class Contract extends Component {

  render() {

    const {
      basicInfoLoading
    } = this.props;

    const topColResponsiveProps = {xs: 24, sm: 12, md: 12, lg: 12, xl: 6, style: {marginBottom: 12},};

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    const engTypeData = [
      {
        x: '西陵区',
        y: 1000,
        tb: 0.11, // 月同比
        hb: 0.05, // 月环比
      },
      {
        x: '夷陵区',
        y: 500,
        tb: 0.12,
        hb: 0.06,
      },
      {
        x: '伍家区',
        y: 300,
        tb: 0.31,
        hb: 0.23,
      },
      {
        x: '猇亭区',
        y: 480,
        tb: 0.09,
        hb: -0.05,
      },
      {
        x: '点军区',
        y: 805,
        tb: 0.56,
        hb: 0.47,
      },
      {
        x: '高新区',
        y: 1015,
        tb: 1.11,
        hb: 1.05,
      },
      {
        x: '县市区',
        y: 1015,
        tb: -0.22,
        hb: -0.30,
      },
    ];

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Card loading={basicInfoLoading} title="施工合同备案" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>888</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>合同总额（万元）</p>
                    <p className={styles.topNumber}>45678</p>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={basicInfoLoading} title="竣工决算备案" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>887</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总金额（万元）</p>
                    <p className={styles.topNumber}>44444</p>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={basicInfoLoading} title="施工许可办理" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>申请数</p>
                    <p className={styles.topNumber}>777</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>办理完结</p>
                    <p className={styles.topNumber}>666</p>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card loading={basicInfoLoading} title="现场踏勘" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数</p>
                    <p className={styles.topNumber}>3000</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>通过率</p>
                    <p className={styles.topNumber}>60%</p>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={basicInfoLoading} title="合同额区域分布" bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}>
              <TrendPie
                hasLegend
                subTitle="总额"
                total={() => `${engTypeData.reduce((pre, now) => now.y + pre, 0)}万`}
                data={engTypeData}
                valueFormat={value => `${value}万`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={basicInfoLoading} bodyStyle={{ padding: '5px' }}>
              <Row>
                <Col span={8}>
                  <Card>
                    <h3>计价方式</h3>
                    <SimplyLegendPie
                      hasLegend
                      colors={['rgb(24, 144, 255)', 'rgb(235,235,235)']}
                      data={[
                        {
                          x: '清单计价',
                          y: 5000
                        },
                        {
                          x: '定额计价',
                          y: 15000
                        }
                      ]}
                      height={170}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <h3>调价方式</h3>
                    <SimplyLegendPie
                      hasLegend
                      colors={['rgb(60,179,113)', 'rgb(255,0,0,0.7)', 'rgb(235,235,235)']}
                      data={[
                        {
                          x: '固定',
                          y: 5000
                        },
                        {
                          x: '可调',
                          y: 15000
                        },
                        {
                          x: '成本加酬金',
                          y: 15000
                        }
                      ]}
                      height={130}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <h3>争议处理方式</h3>
                    <SimplyLegendPie
                      hasLegend
                      colors={['rgb(255,215,0)', 'rgb(235,235,235)']}
                      data={[
                        {
                          x: '仲裁',
                          y: 15000
                        },
                        {
                          x: '诉讼',
                          y: 5000
                        },
                      ]}
                      height={170}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={basicInfoLoading} title="决算额区域分布" bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}>
              <TrendPie
                hasLegend
                subTitle="总额"
                total={() => `${engTypeData.reduce((pre, now) => now.y + pre, 0)}万`}
                data={engTypeData}
                valueFormat={value => `${value}万`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={basicInfoLoading} title="预算与决算差异统计" bodyStyle={{ minHeight: '300px', padding: '5px' }}>
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

export default Contract;
