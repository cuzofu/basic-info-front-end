import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Table, Radio } from 'antd';

import SunburstPie from './Pie/SunburstPie';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Intendance.less';
import StackedBar from './Bar/StackedBar';
import BarLine from "./Line/BarLine";

@connect(({ intendance, loading }) => ({
  intendance,
  zfwsksLoading: loading.effects['intendance/fetchZfwsks'],
  zfwstjLoading: loading.effects['intendance/fetchZfwstjData'],
  zlwtpmLoading: loading.effects['intendance/fetchZlwtpmData'],
  zfwsGcpmLoading: loading.effects['intendance/fetchZfwsGcpmData'],
  zfwsQypmLoading: loading.effects['intendance/fetchZfwsQypmData'],
  gczlwtpmLoading: loading.effects['intendance/fetchGczlwtpmData'],
}))
class Intendance extends Component {

  state = {
    qypmType: '全部',
    gcpmType: '全部',
    zfwsGcpmPagination: {
      current: 1,
      pageSize: 10,
    },
    zfwsQypmPagination: {
      current: 1,
      pageSize: 10,
    },
    zlwtpmPagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const {
      qypmType,
      gcpmType,
    } = this.state;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'intendance/fetchZfwsks',
        payload: {}
      });
      dispatch({
        type: 'intendance/fetchZfwstjData',
        payload: {}
      });
      dispatch({
        type: 'intendance/fetchZlwtpmData',
        payload: {}
      });
      dispatch({
        type: 'intendance/fetchZfwsQypmData',
        payload: {
          type: qypmType
        }
      });
      dispatch({
        type: 'intendance/fetchZfwsGcpmData',
        payload: {
          type: gcpmType
        }
      });
      dispatch({
        type: 'intendance/fetchGczlwtpmData',
        payload: {}
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'intendance/clear',
    });
  }

  handleChangeQypmType = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'intendance/fetchZfwsQypmData',
      payload: {
        type: e.target.value
      }
    });
    this.setState({
      qypmType: e.target.value,
      zfwsQypmPagination: {
        current: 1,
        pageSize: 10,
      }
    });
  };

  handleChangeGcpmType = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'intendance/fetchZfwsGcpmData',
      payload: {
        type: e.target.value
      }
    });
    this.setState({
      gcpmType: e.target.value,
      zfwsGcpmPagination: {
        current: 1,
        pageSize: 10,
      }
    });
  };

  renderZfwstj = () => {
    const {
      intendance: {
        zfwstj
      }
    } = this.props;
    if (zfwstj && zfwstj.length > 0) {
      return (
        <BarLine
          id="zfwstj"
          height={390}
          data={zfwstj}
        />
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  handleZfwsGcpmPagination = (pagination) => {
    this.setState({
      zfwsGcpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  handleZfwsQypmPagination = (pagination) => {
    this.setState({
      zfwsQypmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  handleZlwtpmPagination = (pagination) => {
    this.setState({
      zlwtpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  render() {

    const {
      zfwsksLoading,
      zfwstjLoading,
      zfwsGcpmLoading,
      zfwsQypmLoading,
      zlwtpmLoading,
      gczlwtpmLoading,
      intendance: {
        zfwsks,
        zfwsGcpm,
        zfwsQypm,
        zlwtpm,
        gczlwtpm,
      }
    } = this.props;
    const {
      qypmType,
      gcpmType,
      zfwsGcpmPagination,
      zfwsQypmPagination,
      zlwtpmPagination,
    } = this.state;

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    // 常见问题排名
    const issueRankingData = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '问题描述',
        dataIndex: 'issueDes',
        width: '45%',
      },
      {
        title: '问题类型',
        dataIndex: 'issueType',
        width: '15%',
      },
      {
        title: '问题子类',
        dataIndex: 'issueSubType',
        width: '15%',
      },
      {
        title: '问题总数',
        dataIndex: 'count',
        width: '15%',
      },
    ];

    // 企业排名（执法文书）
    const orgZgRankingData = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'orgName',
        width: '60%',
      },
      {
        title: '数量',
        dataIndex: 'count',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
        render: (val) => `${val}%`
      },
    ];

    // 工程排名（执法文书）
    const zfwsGcpmColumns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '工程名称',
        dataIndex: 'engName',
        width: '60%',
      },
      {
        title: '数量',
        dataIndex: 'count',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
        render: (val) => `${val}%`
      },
    ];

    // 执法文书明细按科室
    const zfwsRankingData = [
      {
        title: '科室名称',
        dataIndex: 'ksName',
        align: 'center',
      },
      {
        title: '文书数量',
        dataIndex: '文书数量',
        align: 'center',
      },
      {
        title: '口头整改',
        dataIndex: '口头整改',
        align: 'center',
      },
      {
        title: '整改',
        dataIndex: '整改',
        align: 'center',
      },
      {
        title: '局部停工',
        dataIndex: '局部停工',
        align: 'center',
      },
      {
        title: '不良行为',
        dataIndex: '不良行为记录',
        align: 'center',
      },
      {
        title: '其他',
        dataIndex: '其他',
        align: 'center',
      },
    ];

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="工程常见问题统计" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <SunburstPie
                height={400}
                data={[
                  {
                    value: 251,
                    type: '质量问题',
                    name: '子事例一',
                  },
                  {
                    value: 1048,
                    type: '质量问题',
                    name: '子事例二',
                  },
                  {
                    value: 610,
                    type: '质量问题',
                    name: '子事例三',
                  },
                  {
                    value: 434,
                    type: '安全问题',
                    name: '子事例四',
                  },
                  {
                    value: 335,
                    type: '安全问题',
                    name: '子事例五',
                  },
                  {
                    value: 250,
                    type: '安全问题',
                    name: '子事例六',
                  },
                ]}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="项目排名占比" bodyStyle={{ height: '410px', padding: '5px' }}>
              <Table
                loading={zlwtpmLoading}
                size="small"
                scroll={{ y: 310 }}
                dataSource={zlwtpm}
                columns={issueRankingData}
                pagination={{
                  ...zlwtpmPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 种问题.`,
                }}
                onChange={this.handleZlwtpmPagination}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={gczlwtpmLoading} title="工程排名（按问题）" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              {
                gczlwtpm && gczlwtpm.length > 0 ? (
                  <StackedBar
                    fields={['质量问题', '安全问题']}
                    data={gczlwtpm}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业排名（执法文书）"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <div style={{padding: '10px 0'}}>
                <Radio.Group value={qypmType} onChange={this.handleChangeQypmType}>
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="停工">停工</Radio.Button>
                  <Radio.Button value="整改">整改</Radio.Button>
                </Radio.Group>
              </div>
              <Table
                loading={zfwsQypmLoading}
                size="small"
                scroll={{ y: 260 }}
                dataSource={zfwsQypm}
                columns={orgZgRankingData}
                pagination={{
                  ...zfwsQypmPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 家单位.`,
                }}
                onChange={this.handleZfwsQypmPagination}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={zfwstjLoading} title="执法文书统计" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              {this.renderZfwstj()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="工程排名（执法文书）"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <div style={{padding: '10px 0'}}>
                <Radio.Group value={gcpmType} onChange={this.handleChangeGcpmType}>
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="停工">停工</Radio.Button>
                  <Radio.Button value="整改">整改</Radio.Button>
                </Radio.Group>
              </div>
              <Table
                loading={zfwsGcpmLoading}
                size="small"
                scroll={{ y: 260 }}
                dataSource={zfwsGcpm}
                columns={zfwsGcpmColumns}
                pagination={{
                  ...zfwsGcpmPagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 个工程.`,
                }}
                onChange={this.handleZfwsGcpmPagination}
              />
            </Card>
          </Col>
        </Row>
        <Card
          loading={zfwsksLoading}
          title="执法文书明细按科室"
          bodyStyle={{ minHeight: '300px', padding: '5px' }}
        >
          <Table
            rowKey="ksName"
            dataSource={zfwsks}
            columns={zfwsRankingData}
            pagination={false}
          />
        </Card>
      </GridContent>
    );
  }
}

export default Intendance;
