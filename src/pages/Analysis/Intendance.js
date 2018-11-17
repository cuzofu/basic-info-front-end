import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Table, Radio, DatePicker } from 'antd';

import SunburstPie from './Pie/SunburstPie';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Intendance.less';
import StackedBar from './Bar/StackedBar';
import BarLine from "./Line/BarLine";

import { getTimeDistance } from '@/utils/utils';

const { RangePicker } = DatePicker;

@connect(({ intendance, loading }) => ({
  intendance,
  wttjLoading: loading.effects['intendance/fetchWttj'],
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
    },
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const {
      gcpmType,
      qypmType,
    } = this.state;
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'intendance/fetchWttj',
        payload: {}
      });
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
          tag: qypmType,
        }
      });
      dispatch({
        type: 'intendance/fetchZfwsGcpmData',
        payload: {
          tag: gcpmType,
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

    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");

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

  };

  handleChangeQypmType = e => {
    this.setState({
      qypmType: e.target.value,
      zfwsQypmPagination: {
        current: 1,
        pageSize: 10,
      }
    });

    const {dispatch} = this.props;
    dispatch({
      type: 'intendance/fetchZfwsQypmData',
      payload: {
        tag: e.target.value
      }
    });
  };

  handleChangeGcpmType = e => {
    this.setState({
      gcpmType: e.target.value,
      zfwsGcpmPagination: {
        current: 1,
        pageSize: 10,
      }
    });

    const {dispatch} = this.props;
    dispatch({
      type: 'intendance/fetchZfwsGcpmData',
      payload: {
        tag: e.target.value
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
        <BarLine id="zfwstj" height={390} data={zfwstj} />
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

  // 项目排名占比翻页
  handleZlwtpmPagination = (pagination) => {
    this.setState({
      zlwtpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 项目排名占比
  renderZlwtpmzb = () => {
    const {
      zlwtpmPagination
    } = this.state;
    const {
      zlwtpmLoading,
      intendance: {
        zlwtpm,
      }
    } = this.props;

    const columns = [
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

    return (
      <Table
        loading={zlwtpmLoading}
        size="small"
        scroll={{ y: 310 }}
        dataSource={zlwtpm}
        columns={columns}
        pagination={{
          ...zlwtpmPagination,
          pageSizeOptions: ['10', '20', '50'],
          showSizeChanger: true,
          showTotal: total => `总计 ${total} 种问题.`,
        }}
        onChange={this.handleZlwtpmPagination}
      />
    );
  };

  // 工程排名（按问题）
  renderGczlwtpm = () => {
    const {
      intendance: {
        gczlwtpm,
      }
    } = this.props;
    if (gczlwtpm && gczlwtpm.length > 0) {
      return (
        <StackedBar fields={['质量问题', '安全问题']} data={gczlwtpm} />
      );
    }
    return (
      <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
    )
  };

  // 企业排名（执法文书）
  renderZfwsQypm = () => {
    const {
      qypmType,
      zfwsQypmPagination,
    } = this.state;
    const {
      zfwsQypmLoading,
      intendance: {
        zfwsQypm,
      }
    } = this.props;

    const columns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'cioName',
        width: '60%',
      },
      {
        title: '数量',
        dataIndex: 'sum',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
        render: (val) => `${val}%`
      },
    ];

    return (
      <div>
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
          dataSource={qypmType === '全部' ? zfwsQypm : zfwsQypm.filter(r => r.type === qypmType)}
          columns={columns}
          pagination={{
            ...zfwsQypmPagination,
            pageSizeOptions: ['10', '20', '50'],
            showSizeChanger: true,
            showTotal: total => `总计 ${total} 家单位.`,
          }}
          onChange={this.handleZfwsQypmPagination}
        />
      </div>
    );
  };

  // 工程排名（执法文书）
  renderZfwsGcpm = () => {
    const {
      gcpmType,
      zfwsGcpmPagination,
    } = this.state;
    const {
      zfwsGcpmLoading,
      intendance: {
        zfwsGcpm,
      }
    } = this.props;

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

    return (
      <div>
        <div style={{padding: '10px 0'}}>
          <Radio.Group value={gcpmType} onChange={this.handleChangeGcpmType}>
            <Radio.Button value="全部">全部</Radio.Button>
            <Radio.Button value="停工">停工</Radio.Button>
            <Radio.Button value="整改">整改</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          rowKey="rank"
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
      </div>
    );
  };

  // 执法文书明细按科室
  renderZfwsaks = () => {
    const {
      zfwsksLoading,
      intendance: {
        zfwsks,
      }
    } = this.props;

    const columns = [
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
        dataIndex: '不良行为',
        align: 'center',
      },
    ];

    return (
      <Table loading={zfwsksLoading} rowKey="ksName" dataSource={zfwsks} columns={columns} pagination={false} />
    );
  };

  render() {

    const {
      wttjLoading,
      zfwsksLoading,
      zfwstjLoading,
      gczlwtpmLoading,
      intendance: {wttj}
    } = this.props;

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    return (
      <GridContent>
        {this.renderRangePicker()}
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={wttjLoading} title="工程常见问题统计" bodyStyle={{ minHeight: '400px', padding: '5px' }}><SunburstPie height={400} data={wttj} /></Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="项目排名占比" bodyStyle={{ height: '410px', padding: '5px' }}>{this.renderZlwtpmzb()}</Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={gczlwtpmLoading} title="工程排名（按问题）" bodyStyle={{ minHeight: '400px', padding: '5px' }}>{this.renderGczlwtpm()}</Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="企业排名（执法文书）" bodyStyle={{ height: '400px', padding: '5px' }}>{this.renderZfwsQypm()}</Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={zfwstjLoading} title="执法文书统计" bodyStyle={{ minHeight: '400px', padding: '5px' }}>{this.renderZfwstj()}</Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="工程排名（执法文书）" bodyStyle={{ height: '400px', padding: '5px' }}>{this.renderZfwsGcpm()}</Card>
          </Col>
        </Row>
        <Card loading={zfwsksLoading} title="执法文书明细按科室" bodyStyle={{ minHeight: '300px', padding: '5px' }}>{this.renderZfwsaks()}</Card>
      </GridContent>
    );
  }
}

export default Intendance;
