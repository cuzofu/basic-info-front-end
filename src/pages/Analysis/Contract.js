import React, {Component} from 'react';
import {connect} from 'dva';

import {
  Row,
  Col,
  Card,
  Pagination,
} from 'antd';

import {
  TrendPie,
  SimplyLegendPie,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Contract.less';
import PlusMinusBar from "@/components/ECharts/PlusMinusBar";

// 环比/同比计算
const rate = (p1, p2) => {
  const bq = parseFloat(p1);
  const sq = parseFloat(p2);
  if (sq === 0.0) {
    return 0;
  }
  return (bq - sq) / sq * 100;
};

const totalPages = (totalRecord, pageSize = 10) => parseInt((totalRecord + pageSize - 1) / pageSize, 0);

@connect(({contract, loading}) => ({
  contract,
  basicInfoLoading: loading.effects['contract/fetchBasicInfo'],
  contractAmountLoading: loading.effects['contract/fetchContractAmountDataByRegion'],
  finalAccountsLoading: loading.effects['contract/fetchFinalAccountsDataByRegion'],
  ysjscytjLoading: loading.effects['contract/fetchYsjscytjData'],
}))
class Contract extends Component {

  state = {
    ysjscytjList: [],
    currentPage: 1,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'contract/fetchBasicInfo',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'contract/fetchContractAmountDataByRegion',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'contract/fetchFinalAccountsDataByRegion',
      payload: {
        time: '2018-10-29'
      }
    });
    dispatch({
      type: 'contract/fetchYsjscytjData',
      payload: {
        time: '2018-10-29'
      }
    });
  }

  paging = (data, page, pageSize) => {
    const pages = totalPages(data.length, pageSize);
    if (page > pages) {
      return false;
    }
    if (page < 0) {
      return false;
    }
    const totalRecord = data.length;
    const records = [];
    for (let i = 0; i < pageSize; i+=1) {
      const index = (page - 1) * pageSize + i;
      if (index >= totalRecord) {
        break;
      }
      records.push(data[index]);
    }
    return records;
  };

  renderYjscy = (data, currentPage = 1, pageSize = 5) => {
    const records = this.paging(data, currentPage, pageSize);
    if (records) {
      return records.map( r => (
        {
          '合同编号': r.htbh,
          '合同额': r.htjk,
          '决算额': -parseFloat(r.jse),
          '差额': r.cha,
        }
      ));
    }
    return [];
  };

  handlePageChange = (pageNumber) => {
    const { contract: { ysjscytj }} = this.props;
    const ycjscytjList = this.renderYjscy(ysjscytj, pageNumber);
    this.setState({
      currentPage: pageNumber,
      ysjscytjList: ycjscytjList
    });
  };

  render() {

    const {
      currentPage,
      ysjscytjList,
    } = this.state;

    const {
      basicInfoLoading,
      contractAmountLoading,
      finalAccountsLoading,
      ysjscytjLoading,
      contract: {
        basicInfo: {
          cbtj = 0,
          countHt = 0,
          countJS = 0,
          dejj = 0,
          gdtj = 0,
          kttj = 0,
          qdjj = 0,
          sumHT = "0",
          sumJS = "0",
          sumxckc = 0,
          tgl = "0",
          xksq = 0,
          xkwj = 0,
          zyss = 0,
          zyzc = 0,
        },
        contractAmountDataByRegion,
        finalAccountsDataByRegion,
        ysjscytj,
      }
    } = this.props;

    const topColResponsiveProps = {xs: 24, sm: 12, md: 12, lg: 12, xl: 6, style: {marginBottom: 12},};

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    // 合同额区域分布
    const htePieData = contractAmountDataByRegion.map( r => ({
      x: r.area,
      y: parseFloat(r.htjk),
      tb: rate(r.htjk, r.ytb), // 月同比
      hb: rate(r.htjk, r.ytb), // 月环比
    }));

    // 决算额区域分布
    const jsePieData = finalAccountsDataByRegion.map( r => ({
      x: r.area,
      y: parseFloat(r.htjk),
      tb: rate(r.htjk, r.ytb), // 月同比
      hb: rate(r.htjk, r.ytb), // 月环比
    }));

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Card loading={basicInfoLoading} title="施工合同备案" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>{countHt}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>合同总额（万元）</p>
                    <p className={styles.topNumber}>{sumHT}</p>
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
                    <p className={styles.topNumber}>{countJS}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总金额（万元）</p>
                    <p className={styles.topNumber}>{sumJS}</p>
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
                    <p className={styles.topNumber}>{xksq}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>办理完结</p>
                    <p className={styles.topNumber}>{xkwj}</p>
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
                    <p className={styles.topNumber}>{sumxckc}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>通过率</p>
                    <p className={styles.topNumber}>{`${parseFloat(tgl).toFixed(2)}%`}</p>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={contractAmountLoading} title="合同额区域分布" bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}>
              <TrendPie
                hasLegend
                subTitle="总额"
                total={() => `${htePieData.reduce((pre, now) => now.y + pre, 0)}万`}
                data={htePieData}
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
                          y: {qdjj}
                        },
                        {
                          x: '定额计价',
                          y: {dejj}
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
                          y: {gdtj}
                        },
                        {
                          x: '可调',
                          y: {kttj}
                        },
                        {
                          x: '成本加酬金',
                          y: {cbtj}
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
                          y: {zyzc}
                        },
                        {
                          x: '诉讼',
                          y: {zyss}
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
            <Card loading={finalAccountsLoading} title="决算额区域分布" bodyStyle={{ minHeight: '300px', padding: '24px 5px' }}>
              <TrendPie
                hasLegend
                subTitle="总额"
                total={() => `${jsePieData.reduce((pre, now) => now.y + pre, 0)}万`}
                data={jsePieData}
                valueFormat={value => `${value}万`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={ysjscytjLoading}
              title="预算与决算差异统计"
              bodyStyle={{ minHeight: '300px', padding: '5px' }}
              extra={
                ysjscytj && ysjscytj.length > 0 && (
                  <Pagination
                    simple
                    current={currentPage}
                    pageSize={5}
                    total={ysjscytj.length}
                    onChange={this.handlePageChange}
                  />
                )
              }
            >
              {
                ysjscytj && ysjscytj.length > 0 ? (
                  <PlusMinusBar
                    id="ysjscytj"
                    height={290}
                    dimensions={['合同编号', '差额', '合同额', '决算额']}
                    data={ysjscytjList.length > 0 ? ysjscytjList : this.renderYjscy(ysjscytj, 1, 5)}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Contract;
