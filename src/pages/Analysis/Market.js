import React, { Component } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';
import {
  Chart,
  Axis,
  Tooltip,
  Geom,
  Legend,
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

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ market, loading }) => ({
  market,
  loading: loading.effects['market/fetchQyAndRyCount'],
  qyzzfxLoading: loading.effects['market/fetchQyzzfxData'],
  bdqymxLoading: loading.effects['market/fetchBdqymxData'],
  qyhydpmLoading: loading.effects['market/fetchQyhydpmData'],
  ryzzfxLoading: loading.effects['market/fetchRyzzfxData'],
  ryhydpmLoading: loading.effects['market/fetchRyhydpmData'],
  jzgmHyqycxfxLoading: loading.effects['market/fetchJzgmHyqycxfxData'],
  qycxdjzbLoading: loading.effects['market/fetchQycxdjzbData'],
  qyzzmxLoading: loading.effects['market/fetchQyzzmxData'],
}))
class Market extends Component {

  state = {
    subPersonZzAnalysisData: {},
    ryhydpmPagination: {
      current: 1,
      pageSize: 50,
    },
    qyhydpmPagination: {
      current: 1,
      pageSize: 50,
    },
    qyzzmxPagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'market/fetchQyAndRyCount',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchQycxdjzbData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchJzgmHyqycxfxData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchQyzzfxData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchRyzzfxData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchBdqymxData',
        payload: {
          pageSize: 10,
          currentPage: 0,
          sort: 'gjTime',
          direction: 'descend',
        }
      });
      dispatch({
        type: 'market/fetchQyhydpmData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchRyhydpmData',
        payload: {
        }
      });
      dispatch({
        type: 'market/fetchQyzzmxData',
        payload: {
        }
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'market/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  renderSubPersonZzAnalysisData = (data) => {
    this.setState({
      subPersonZzAnalysisData: data,
    });
  };

  handlePersonZzPieClick = (ev) => {
    if (!ev || !ev.data || ev.data === undefined || !ev.data._origin) {
      return;
    }
    const {_origin} = ev.data;
    this.renderSubPersonZzAnalysisData(_origin);
  };

  renderQyzzfx = (qyzzfx) => {
    const orgZzAnalysisData = [];
    if (qyzzfx && qyzzfx.length > 0) {
      qyzzfx.forEach( r => {
        orgZzAnalysisData.push({
          x: r.nameZZ,
          y: r.numZZ,
        });
      });

      return (
        <Pie
          hasLegend
          subTitle="企业总数"
          total={() => `${orgZzAnalysisData.reduce((pre, now) => now.y + pre, 0)}家`}
          data={orgZzAnalysisData}
          valueFormat={value => `${value}家`}
          height={248}
          lineWidth={4}
        />
      );
    }

    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 企业诚信等级占比
  renderQycxdjzb = (data) => {
    if (data && data.length > 0) {

      const destData = [
        {
          group: '企业数量',
        },
        {
          group: '投标数量',
        },
        {
          group: '中标数量',
        }
      ];

      data.forEach( d => {
        switch (d.groupY) {
          case '企业入库数量':
            destData[0][d.groupX] = parseInt(d.value, 0);
            break;
          case '投标数量':
            destData[1][d.groupX] = parseInt(d.value, 0);
            break;
          case '中标数量':
            destData[2][d.groupX] = parseInt(d.value, 0);
            break;
          default:
            break;
        }
      });

      const ds = new DataSet();
      const dv = ds.createView().source(destData);
      dv.transform({
        type: 'fold',
        fields: ['企业诚信A级','企业诚信B级','企业诚信C级','企业资质诚信A级','企业资质诚信B级','企业资质诚信C级'], // 展开字段集
        key: '诚信等级', // key字段
        value: '数量', // value字段
      });
      return (
        <Chart height={300} data={dv} forceFit>
          <Axis name="诚信等级" />
          <Axis name="数量" />
          <Legend />
          <Tooltip crosshairs={{type : "y"}} />
          <Geom type='interval' position="诚信等级*数量" color="group" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
        </Chart>
      );
    }

    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 建筑规模与活跃企业诚信等级分析
  renderJzgmHyqycxfx = () => {
    const {
      market: {
        jzgmHyqycxfx,
      }
    } = this.props;
    if (jzgmHyqycxfx && jzgmHyqycxfx.length > 0) {
      return (
        <MatrixBar
          height={390}
          padding={[10, 10, 100, 90]}
          data={jzgmHyqycxfx}
        />
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 标段与企业明细翻页
  handleBdqymxTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current - 1,
      pageSize: pagination.pageSize,
    };
    if (sorter.field) {
      params.sort = sorter.field;
      params.direction = sorter.order;
    } else {
      params.sort = 'gjTime';
      params.direction = 'descend';
    }
    dispatch({
      type: 'market/fetchBdqymxData',
      payload: params,
    });
  };

  // 企业资质明细翻页
  handleQyzzmxTableChange = (pagination) => {
    this.setState({
      qyzzmxPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 人员活跃度排名翻页
  handleRyhydpmTableChange = (pagination) => {
    this.setState({
      ryhydpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 企业活跃度排名翻页
  handleQyhydpmTableChange = (pagination) => {
    this.setState({
      qyhydpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  render() {
    const {
      subPersonZzAnalysisData,
      ryhydpmPagination,
      qyhydpmPagination,
      qyzzmxPagination,
    } = this.state;
    const {
      loading,
      qyzzfxLoading,
      ryhydpmLoading,
      qyhydpmLoading,
      jzgmHyqycxfxLoading,
      qycxdjzbLoading,
      qyzzmxLoading,
      bdqymxLoading,
      ryzzfxLoading,
      market: {
        qyAndRyCount: {
          addQYRK = 0,
          addRKRY = 0,
          countTBS = 0,
          countZBS = 0,
          ratioQYRK = 0.00,
          ratioTBS = 0.00,
          ratioZBS = 0.00,
          ratioUser = 0.00,
          sumQYRK = 0,
          sumRKRY = 0,
          ratioRKRY = 0.00,
          userBiLi = 0.00,
          userTBS = 0,
          userZBS = 0,
        },
        qyzzfx,
        bdqymx,
        ryhydpm,
        qyhydpm,
        ryzzfx, // 人员资质分析
        qycxdjzb, // 企业诚信占比
        qyzzmx, // 企业资质明细
      },
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
        render: (val, r, index) => ((bdqymx.pagination.current - 1) === 0 ? (1 + index) : ((bdqymx.pagination.current - 1) * (bdqymx.pagination.pageSize) + 1 + index)),
      },
      {
        title: '标段编号',
        dataIndex: 'bdCode',
        width: '15%',
      },
      {
        title: '标段名称',
        dataIndex: 'bdName',
        width: '20%',
      },
      {
        title: '投资额（万元）',
        dataIndex: 'bdTZE',
        width: '15%',
        render: (val) => val || '未知'
      },
      {
        title: '面积(㎡)/公里(km)',
        dataIndex: 'bdMJ',
        width: '15%',
        render: (val) => val || '-'
      },
      {
        title: '中标企业',
        dataIndex: 'zbqyName',
        width: '20%',
        render: (val) => val || '未知'
      },
      {
        title: '诚信等级',
        dataIndex: 'qyzxdj',
        width: '10%',
        render: (val) => val || '未知'
      },
    ];

    // 企业资质排名列表
    const orgZzListColumns = [
      {
        title: '排名',
        dataIndex: 'index',
        width: '10%',
        render: (val, r, index) => ((qyzzmxPagination.current - 1) === 0 ? (1 + index) : ((qyzzmxPagination.current - 1) * (qyzzmxPagination.pageSize) + 1 + index)),
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '20%',
      },
      {
        title: '资质类型',
        dataIndex: 'nameZZ',
        width: '40%',
      },
      {
        title: '企业数量',
        dataIndex: 'numZZ',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'ratio',
        width: '15%',
        render: (val) => `${val}%`
      },
    ];

    // 企业活跃度排名列表
    const orgActivityRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
        render: (val, r, index) => ((qyhydpmPagination.current - 1) === 0 ? (1 + index) : ((qyhydpmPagination.current - 1) * (qyhydpmPagination.pageSize) + 1 + index)),
      },
      {
        title: '企业名称',
        dataIndex: 'estaName',
        width: '40%',
      },
      {
        title: '中标数量',
        dataIndex: 'bidNum',
        width: '15%',
      },
      {
        title: '本期投资额(万元)',
        dataIndex: 'sumTZE',
        width: '25%',
      },
      {
        title: '占比',
        dataIndex: 'zhanbi',
        width: '10%',
        render: (val) => `${(parseFloat(val) * 100).toFixed(2)}%`
      },
    ];

    // 人员活跃度排名列表
    const personActivityRankingList = [
      {
        title: '排名',
        dataIndex: 'index',
        width: '10%',
        align: 'center',
        render: (val, r, index) => ((ryhydpmPagination.current - 1) === 0 ? (1 + index) : ((ryhydpmPagination.current - 1) * (ryhydpmPagination.pageSize) + 1 + index)),
      },
      {
        title: '姓名',
        dataIndex: 'userName',
        width: '20%',
        align: 'center',
      },
      {
        title: '证件号码',
        dataIndex: 'userId',
        width: '25%',
        align: 'center',
      },
      {
        title: '参与项目投资额(万元)',
        dataIndex: 'tze',
        width: '35%',
        align: 'center',
      },
      {
        title: '项目数量',
        dataIndex: 'jobNum',
        width: '10%',
        align: 'center',
      },
    ];

    if (ryzzfx && ryzzfx.length > 0) {
      const d = ryzzfx[0];
      if (!(subPersonZzAnalysisData && subPersonZzAnalysisData.x)) {
        subPersonZzAnalysisData.x = d.x;
        subPersonZzAnalysisData.y = d.y;
        subPersonZzAnalysisData.sub = d.sub;
      }
    }

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Card title="企业入库数量" bodyStyle={{ paddingBottom: '8px' }} loading={loading}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>{sumQYRK}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>{addQYRK}</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>{`${(ratioQYRK * 100).toFixed(2)}%`}</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃企业数量" bodyStyle={{ paddingBottom: '8px' }} loading={loading}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标企业数量</p>
                    <p className={styles.topNumber}>{countTBS}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标企业数量</p>
                    <p className={styles.topNumber}>{countZBS}</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 6px 0 0' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>{`${(ratioTBS * 100).toFixed(2)}%`}</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 0 0 6px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>{`${(ratioZBS * 100).toFixed(2)}%`}</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="人员入库数量" bodyStyle={{ paddingBottom: '8px' }} loading={loading}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>{sumRKRY}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>{addRKRY}</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>{`${(ratioRKRY * 100).toFixed(2)}%`}</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃人员数量" bodyStyle={{ paddingBottom: '8px' }} loading={loading}>
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标人员数量</p>
                    <p className={styles.topNumber}>{userTBS}</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标人员数量</p>
                    <p className={styles.topNumber}>{userZBS}</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ textAlign: 'center' }}>
                <Trend flag="up" reverseColor style={{ padding: '0 6px 0 0' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>{`${(ratioUser * 100).toFixed(2)}%`}</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 0 0 6px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>{`${(userBiLi * 100).toFixed(2)}%`}</span>
                </Trend>
              </div>
            </Card>
          </Col>
        </Row>
        <Card
          loading={jzgmHyqycxfxLoading}
          style={{ marginBottom: '12px' }}
          title="建筑规模与活跃企业诚信等级分析"
          bodyStyle={{ minHeight: '400px', padding: '5px' }}
        >
          {this.renderJzgmHyqycxfx()}
        </Card>
        <Card
          style={{ marginBottom: '12px' }}
          title="标段与企业明细"
          bodyStyle={{
            minHeight: '200px',
            maxHeight: '400px',
            padding: '5px',
          }}
        >
          <Table
            rowKey="bdCode"
            loading={bdqymxLoading}
            size="small"
            scroll={{ y: 300 }}
            dataSource={bdqymx.list}
            columns={bdEngListColumns}
            pagination={{
              ...bdqymx.pagination,
              pageSizeOptions: ['10', '20', '50'],
              showSizeChanger: true,
              showTotal: total => `总计 ${total} 条记录.`,
            }}
            onChange={this.handleBdqymxTableChange}
          />
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={qycxdjzbLoading}
              title="企业诚信等级占比"
              bodyStyle={{ minHeight: '300px', padding: '0 5px' }}
            >
              {this.renderQycxdjzb(qycxdjzb)}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业活跃度排名"
              bodyStyle={{ height: '300px', padding: '5px' }}
            >
              <Table
                loading={qyhydpmLoading}
                size="small"
                rowKey="estaName"
                scroll={{ y: 200 }}
                dataSource={qyhydpm}
                columns={orgActivityRankingList}
                pagination={{
                  ...qyhydpmPagination,
                  pageSizeOptions: ['10', '50', '100'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 家企业.`,
                }}
                onChange={this.handleQyhydpmTableChange}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="企业资质分析" bodyStyle={{ minHeight: '300px' }} loading={qyzzfxLoading}>
              {this.renderQyzzfx(qyzzfx)}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={qyzzmxLoading} title="企业资质明细" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                rowKey="typeId"
                size="small"
                scroll={{ y: 200 }}
                dataSource={qyzzmx}
                columns={orgZzListColumns}
                pagination={{
                  ...qyzzmxPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 项资质.`,
                }}
                onChange={this.handleQyzzmxTableChange}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={ryzzfxLoading} title="人员资质分析" bodyStyle={{ minHeight: '300px' }}>
              {
                ryzzfx && ryzzfx.length > 0 ?
                  (
                    <Row>
                      <Col span={12}>
                        <Pie
                          subTitle="人员总数"
                          total={() => `${ryzzfx.reduce((pre, now) => now.y + pre, 0)}人`}
                          data={ryzzfx}
                          valueFormat={value => `${value}人`}
                          height={248}
                          padding={40}
                          lineWidth={1}
                          onPlotClick={this.handlePersonZzPieClick}
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
                              <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                            )
                        }
                      </Col>
                    </Row>
                  ) :
                  (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>)
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={ryhydpmLoading} title="人员活跃度排名" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                size="small"
                rowKey="userId"
                scroll={{ y: 180 }}
                dataSource={ryhydpm}
                columns={personActivityRankingList}
                pagination={{
                  ...ryhydpmPagination,
                  pageSizeOptions: ['10', '50', '100'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 人.`,
                }}
                onChange={this.handleRyhydpmTableChange}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Market;
