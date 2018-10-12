import React, { Component } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';
import {
  Chart,
  Axis,
  Tooltip,
  Geom,
  Legend,
  G2,
  Coord,
  Label,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from 'bizcharts';

import {
  Row,
  Col,
  Card,
  Table,
  Divider,
} from 'antd';
import {
  Pie,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import MatrixBar from './MatrixBar/MatrixBar';

import styles from './Market.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class Market extends Component {

  state = {
    subPersonZzAnalysisData: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'analysis/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  renderSubPersonZzAnalysisData = (data) => {
    this.setState({
      subPersonZzAnalysisData: data,
    });
  };

  handlerPersonZzPieClick = (ev) => {
    if (!ev || !ev.data || ev.data === undefined || !ev.data._origin) {
      return;
    }
    const {_origin} = ev.data;
    this.renderSubPersonZzAnalysisData(_origin);
  };

  render() {
    const {
      subPersonZzAnalysisData
    } = this.state;
    const {
      analysis: { loading },
    } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 12 },
    };

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    // 标段工程数据列表
    const bdEngListColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '5%',
      },
      {
        title: '标段编号',
        dataIndex: 'bdNo',
        width: '15%',
      },
      {
        title: '标段名称',
        dataIndex: 'bdName',
        width: '20%',
      },
      {
        title: '投资额（万元）',
        dataIndex: 'investment',
        width: '15%',
      },
      {
        title: '面积/公里',
        dataIndex: 'guimo',
        width: '15%',
      },
      {
        title: '中标企业',
        dataIndex: 'orgName',
        width: '20%',
      },
      {
        title: '诚信等级',
        dataIndex: 'creditLevel',
        width: '10%',
      },
    ];

    // 企业资质排名列表
    const orgZzListColumns = [
      {
        title: '排名',
        dataIndex: 'index',
        width: '10%',
      },
      {
        title: '类型',
        dataIndex: 'zzType',
        width: '20%',
      },
      {
        title: '资质类型',
        dataIndex: 'zzSubType',
        width: '40%',
      },
      {
        title: '企业数量',
        dataIndex: 'amountOfOrg',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
      },
    ];

    // 企业活跃度排名列表
    const orgActivityRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'orgName',
        width: '40%',
      },
      {
        title: '中标数量',
        dataIndex: 'amountOfBidding',
        width: '15%',
      },
      {
        title: '本期投资额(万元)',
        dataIndex: 'investment',
        width: '25%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '10%',
      },
    ];

    // 人员活跃度排名列表
    const personActivityRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '25%',
      },
      {
        title: '岗位',
        dataIndex: 'job',
        width: '20%',
      },
      {
        title: '参与项目投资额(万元)',
        dataIndex: 'investment',
        width: '35%',
      },
      {
        title: '项目数量',
        dataIndex: 'amountOfEng',
        width: '10%',
      },
    ];

    const orgZzAnalysisData = [
      {
        x: '施工总承包',
        y: 1000,
      },
      {
        x: '专业承包',
        y: 500,
      },
      {
        x: '劳务资质',
        y: 300,
      },
      {
        x: '园林绿化',
        y: 480,
      },
      {
        x: '监理企业',
        y: 805,
      },
      {
        x: '其他',
        y: 1015,
      },
    ];

    const personZzAnalysisData = [
      {
        x: '注册执业证书',
        y: 189,
        sub: [
          {
            x: '注册执业证书1',
            y: 50,
          },
          {
            x: '注册执业证书2',
            y: 45,
          },
          {
            x: '注册执业证书3',
            y: 81,
          },
          {
            x: '注册执业证书4',
            y: 10,
          },
          {
            x: '注册执业证书5',
            y: 3,
          }
        ]
      },
      {
        x: '管理人员',
        y: 540,
        sub: [
          {
            x: '管理人员1',
            y: 120,
          },
          {
            x: '管理人员2',
            y: 130,
          },
          {
            x: '管理人员3',
            y: 140,
          },
          {
            x: '管理人员4',
            y: 100,
          },
          {
            x: '管理人员5',
            y: 50,
          }
        ]
      },
      {
        x: '施工图审',
        y: 15,
        sub: [
          {
            x: '施工图审1',
            y: 9,
          },
          {
            x: '施工图审2',
            y: 6,
          },
        ]
      },
      {
        x: '见证人证书',
        y: 605,
        sub: [
          {
            x: '见证人证书',
            y: 605,
          }
        ]
      },
      {
        x: '劳务人员证书',
        y: 777,
        sub: [
          {
            x: '劳务人员证书1',
            y: 502,
          },
          {
            x: '劳务人员证书2',
            y: 120,
          },
          {
            x: '劳务人员证书3',
            y: 89,
          },
          {
            x: '劳务人员证书4',
            y: 66,
          }
        ]
      }
    ];

    if (personZzAnalysisData && personZzAnalysisData.length > 0) {
      const d = personZzAnalysisData[0];
      if (!(subPersonZzAnalysisData && subPersonZzAnalysisData.x)) {
        subPersonZzAnalysisData.x = d.x;
        subPersonZzAnalysisData.y = d.y;
        subPersonZzAnalysisData.sub = d.sub;
      }
    }

    const orgCreditLevelData = [
      { group:'企业数量', '企业诚信A级': 2563, '企业诚信B级': 1256, '企业诚信C级' :652, '企业资质诚信A级': 3364, '企业资质诚信B级': 1452, '企业资质诚信C级': 4589 },
      { group:'投标数量', '企业诚信A级': 5625, '企业诚信B级': 2658, '企业诚信C级' :1012, '企业资质诚信A级': 3256, '企业资质诚信B级': 1252, '企业资质诚信C级': 5235 },
      { group:'中标数量', '企业诚信A级': 2302, '企业诚信B级': 2101, '企业诚信C级' :356, '企业资质诚信A级': 3125, '企业资质诚信B级': 1623, '企业资质诚信C级': 4123 },
    ];
    const ds = new DataSet();
    const orgCreditLevelDataTrans = ds.createView().source(orgCreditLevelData);
    orgCreditLevelDataTrans.transform({
      type: 'fold',
      fields: ['企业诚信A级','企业诚信B级','企业诚信C级','企业资质诚信A级','企业资质诚信B级','企业资质诚信C级'], // 展开字段集
      key: '诚信等级', // key字段
      value: '数量', // value字段
    });

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Card title="企业入库数量" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>1500</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>200</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃企业数量" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标企业数量</p>
                    <p className={styles.topNumber}>300</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标企业数量</p>
                    <p className={styles.topNumber}>200</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="人员入库数量" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>80000</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>2000</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃人员数量" bodyStyle={{ paddingBottom: '8px' }}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标人员数量</p>
                    <p className={styles.topNumber}>3000</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标人员数量</p>
                    <p className={styles.topNumber}>800</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="建筑规模与活跃企业诚信等级分析" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <MatrixBar
                height={390}
                padding={[5, 5, 100, 60]}
                data={[
                  {groupY: "2万平米或投资额5千万以上", value: 0.65, groupX: "企业诚信A级"},
                  {groupY: "2万平米或投资额5千万以上", value: 0.35, groupX: "企业诚信B级"},
                  {groupY: "2万平米或投资额5千万以上", value: 0.0, groupX: "企业诚信C级"},
                  {groupY: "2万平米或投资额5千万以上", value: 0.90, groupX: "企业资质诚信A级"},
                  {groupY: "2万平米或投资额5千万以上", value: 0.10, groupX: "企业资质诚信B级"},
                  {groupY: "2万平米或投资额5千万以上", value: 0.0, groupX: "企业资质诚信C级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.50, groupX: "企业诚信A级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.50, groupX: "企业诚信B级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.0, groupX: "企业诚信C级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.60, groupX: "企业资质诚信A级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.40, groupX: "企业资质诚信B级"},
                  {groupY: "1万平米或投资额3千万以上", value: 0.0, groupX: "企业资质诚信C级"},
                  {groupY: "3000平米或投资额1千万以上", value: 0.30, groupX: "企业诚信A级"},
                  {groupY: "3000平米或投资额1千万以上", value: 0.55, groupX: "企业诚信B级"},
                  {groupY: "3000平米或投资额1千万以上", value: 0.15, groupX: "企业诚信C级"},
                  {groupY: "3000平米或投资额1千万以上", value: 0.30, groupX: "企业资质诚信A级"},
                  {groupY: "3000平米或投资额1千万以上", value: 0.50, groupX: "企业资质诚信B级"},
                  {groupY: "3000平米或投资额1千万以上", value: 1, groupX: "企业资质诚信C级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.20, groupX: "企业诚信A级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.60, groupX: "企业诚信B级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.20, groupX: "企业诚信C级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.35, groupX: "企业资质诚信A级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.55, groupX: "企业资质诚信B级"},
                  {groupY: "3000平米或投资额1千万以下", value: 0.10, groupX: "企业资质诚信C级"}
                ]}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="标段与企业明细" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 280 }}
                dataSource={[
                  {
                    key: '1',
                    index: 1,
                    bdNo: 'YCJS(2011)072',
                    bdName: '宜昌市明珠小学科技综合楼新建工程',
                    investment: 10009.837,
                    guimo: 20930,
                    orgName: '宜昌市XXXXXXX企业',
                    creditLevel: 'A级',
                  },
                  {
                    key: '2',
                    index: 2,
                    bdNo: 'YCJS(2011)073',
                    bdName: '宜昌市明珠小学科技综合楼新建工程',
                    investment: 10009.837,
                    guimo: 20930,
                    orgName: '宜昌市XXXXXXX企业',
                    creditLevel: 'A级',
                  },
                  {
                    key: '3',
                    index: 3,
                    bdNo: 'YCJS(2011)073',
                    bdName: '宜昌市明珠小学科技综合楼新建工程',
                    investment: 10009.837,
                    guimo: 20930,
                    orgName: '宜昌市XXXXXXX企业',
                    creditLevel: 'A级',
                  },
                  {
                    key: '4',
                    index: 4,
                    bdNo: 'YCJS(2011)073',
                    bdName: '宜昌市明珠小学科技综合楼新建工程',
                    investment: 10009.837,
                    guimo: 20930,
                    orgName: '宜昌市XXXXXXX企业',
                    creditLevel: 'A级',
                  },
                ]}
                columns={bdEngListColumns}
                pagination={{
                  pageSize: 5,
                  total: 4,
                  current: 1,
                  pageSizeOptions: ['5', '10', '20', '50'],
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => `Total ${total} items.`,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="企业诚信等级占比" bodyStyle={{ minHeight: '300px', padding: '0 5px' }}>
              <Chart height={300} data={orgCreditLevelDataTrans} forceFit>
                <Axis name="诚信等级" />
                <Axis name="数量" />
                <Legend />
                <Tooltip crosshairs={{type : "y"}} />
                <Geom type='interval' position="诚信等级*数量" color="group" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
              </Chart>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业活跃度排名"
              bodyStyle={{ height: '300px', padding: '5px' }}
            >
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={[
                  {
                    key: '1',
                    ranking: 1,
                    orgName: '湖北广盛',
                    amountOfBidding: 18,
                    investment: 230009.837,
                    rate: '30%',
                  },
                  {
                    key: '2',
                    ranking: 2,
                    orgName: '湖北沛菡',
                    amountOfBidding: 13,
                    investment: 110009.837,
                    rate: '20%',
                  },
                  {
                    key: '3',
                    ranking: 3,
                    orgName: '中国建筑',
                    amountOfBidding: 10,
                    investment: 90009.837,
                    rate: '10%',
                  },
                  {
                    key: '4',
                    ranking: 4,
                    orgName: '葛洲坝建设集团',
                    amountOfBidding: 8,
                    investment: 30009.837,
                    rate: '5%',
                  },
                ]}
                columns={orgActivityRankingList}
                pagination={{
                  pageSize: 5,
                  total: 4,
                  current: 1,
                  pageSizeOptions: ['5', '10', '20', '50'],
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => `Total ${total} items.`,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="企业资质分析" bodyStyle={{ minHeight: '300px' }}>
              <Pie
                hasLegend
                subTitle="企业总数"
                total={() => `${orgZzAnalysisData.reduce((pre, now) => now.y + pre, 0)}家`}
                data={orgZzAnalysisData}
                valueFormat={value => `${value}家`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="企业资质明细" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={[
                  {
                    key: '1',
                    index: 1,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_特级',
                    amountOfOrg: 1000,
                    rate: '7%',
                  },
                  {
                    key: '2',
                    index: 2,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_壹级',
                    amountOfOrg: 889,
                    rate: '20%',
                  },
                  {
                    key: '3',
                    index: 3,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_贰级',
                    amountOfOrg: 1129,
                    rate: '33%',
                  },
                  {
                    key: '4',
                    index: 4,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_叁级',
                    amountOfOrg: 1728,
                    rate: '40%',
                  },
                  {
                    key: '5',
                    index: 5,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_叁级',
                    amountOfOrg: 1728,
                    rate: '40%',
                  },
                  {
                    key: '6',
                    index: 6,
                    zzType: '施工总承包',
                    zzSubType: '建筑业企业资质_施工总承包_建筑工程_叁级',
                    amountOfOrg: 1728,
                    rate: '40%',
                  },
                ]}
                columns={orgZzListColumns}
                pagination={{
                  pageSize: 5,
                  total: 6,
                  current: 1,
                  pageSizeOptions: ['5', '10', '20', '50'],
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => `Total ${total} items.`,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="人员资质分析" bodyStyle={{ minHeight: '300px' }}>
              {
                personZzAnalysisData && personZzAnalysisData.length > 0 ?
                  (
                    <Row>
                      <Col span={12}>
                        <Pie
                          subTitle="人员总数"
                          total={() => `${personZzAnalysisData.reduce((pre, now) => now.y + pre, 0)}人`}
                          data={personZzAnalysisData}
                          valueFormat={value => `${value}人`}
                          height={248}
                          padding={40}
                          lineWidth={1}
                          onPlotClick={this.handlerPersonZzPieClick}
                        />
                      </Col>
                      <Col span={12}>
                        {
                          subPersonZzAnalysisData && subPersonZzAnalysisData.sub && subPersonZzAnalysisData.sub.length > 0 ?
                            (
                              <Pie
                                subTitle={subPersonZzAnalysisData.x}
                                total={() => `${subPersonZzAnalysisData.sub && subPersonZzAnalysisData.sub.reduce((pre, now) => now.y + pre, 0)}人`}
                                data={subPersonZzAnalysisData.sub}
                                valueFormat={value => `${value}人`}
                                height={198}
                                lineWidth={4}
                              />) :
                            (
                              <div>无数据</div>
                            )
                        }
                      </Col>
                    </Row>
                  ) :
                  (<div>暂无数据</div>)
              }

            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="人员活跃度排名" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 280 }}
                dataSource={[
                  {
                    key: '1',
                    ranking: 1,
                    name: '张三',
                    job: '项目经理',
                    investment: 674564.837,
                    amountOfEng: 9,
                  },
                  {
                    key: '2',
                    ranking: 2,
                    name: '李四',
                    job: '项目经理',
                    investment: 53309.837,
                    amountOfEng: 6,
                  },
                  {
                    key: '3',
                    ranking: 3,
                    name: '王五',
                    job: '监理员',
                    investment: 33309.837,
                    amountOfEng: 4,
                  },
                  {
                    key: '4',
                    ranking: 4,
                    name: '赵六',
                    job: '施工员',
                    investment: 30009.837,
                    amountOfEng: 3,
                  },
                ]}
                columns={personActivityRankingList}
                pagination={{
                  pageSize: 5,
                  total: 4,
                  current: 1,
                  pageSizeOptions: ['5', '10', '20', '50'],
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => `Total ${total} items.`,
                }}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Market;
