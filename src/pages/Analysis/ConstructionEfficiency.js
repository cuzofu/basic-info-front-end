import React, { Component } from 'react';
import { connect } from 'dva';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

import {
  Card,
  Col,
  Row,
  Table,
  Select,
  Timeline,
} from 'antd';

import {
  Pie,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import DescriptionList from '@/components/DescriptionList';

import styles from './ConstructionEfficiency.less';

// 左右结构布局参数
const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

const { Description } = DescriptionList;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

@connect(({ ce, loading }) => ({
  ce,
  blkszzbloading: loading.effects['ce/fetchBlkszzb'],
  blksfxloading: loading.effects['ce/fetchBlksfx'],
  bjmxloading: loading.effects['ce/fetchBjmx'],
  bjrymxloading: loading.effects['ce/fetchBjrymx'],
}))
class ConstructionEfficiency extends Component {

  state = {
    subData: {},
    selectedKsAndYw: {
      ks: '1',
      yw: '1',
    },
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'ce/fetchBlkszzb',
      payload: {}
    });
    dispatch({
      type: 'ce/fetchBlksfx',
      payload: {}
    });
    dispatch({
      type: 'ce/fetchBjmx',
      payload: {
        currentPage: 1,
        pageSize: 10,
      }
    });
    dispatch({
      type: 'ce/fetchBjrymx',
      payload: {}
    });
  }

  handlePieClick = (ev) => {
    if (!ev || !ev.data || ev.data === undefined || !ev.data._origin) {
      return;
    }
    const {_origin} = ev.data;
    this.renderSubData(_origin);
  };

  renderSubData = (data) => {
    this.setState({
      subData: data,
    });
  };

  // 办理科室总占比
  renderBlkszb = () => {

    const {
      subData,
    } =  this.state;
    const {
      ce: {
        blkszzbloading,
        blkszzb
      }
    } = this.props;

    if (blkszzb && blkszzb.length > 0) {
      if (!(subData && subData.x)) {
        subData.x = blkszzb[0].x;
        subData.y = blkszzb[0].y;
        subData.sub = blkszzb[0].sub;
      }
    }

    if (blkszzb && blkszzb.length > 0) {
      return (
        <Row>
          <Col {...doubleCardColsProps}>
            <Pie
              hasLegend
              subTitle="总件数"
              total={() => blkszzb.reduce((pre, now) => now.y + pre, 0)}
              data={blkszzb}
              valueFormat={value => `${value}件`}
              height={300}
              lineWidth={4}
              onPlotClick={this.handlePieClick}
            />
          </Col>
          <Col {...doubleCardColsProps}>
            {
              subData && subData.sub && subData.sub.length > 0 ?
                (
                  <Pie
                    inner={0}
                    hasLegend
                    innerLabel
                    data={subData.sub}
                    valueFormat={value => `${value}件`}
                    height={300}
                  />) :
                (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
            }
          </Col>
        </Row>
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  handleKsChange = (value) => {
    const {selectedKsAndYw} = this.state;
    selectedKsAndYw.ks = value;
    this.setState({
      selectedKsAndYw,
    });
  };

  handleYwChange = (value) => {
    const {selectedKsAndYw} = this.state;
    selectedKsAndYw.yw = value;
    this.setState({
      selectedKsAndYw,
    });
  };

  // 办理科室分析
  renderBlksmxfx = () => {

    const {
      selectedKsAndYw,
    } = this.state;
    const {
      ce: {
        blksfxloading,
        blksfx
      }
    } = this.props;

    if (blksfx.length === 0) {
      return null;
    }
    // 已选择的科室
    const selectedKs = blksfx.find(k => k.id === selectedKsAndYw.ks);

    // 已选择的业务
    let selectedYw = [];
    let ywData = [];
    if (selectedKs) {
      ywData = selectedKs.yws;
      selectedYw = ywData.find(k => k.id === selectedKsAndYw.yw);
    }

    return (
      <div>
        <div>
          <Select
            placeholder="选择科室"
            style={{ width: 120 }}
            value={selectedKsAndYw.ks}
            onChange={this.handleKsChange}
          >
            {blksfx.map(k => <Select.Option key={k.id}>{k.ksName}</Select.Option>)}
          </Select>
          <Select
            placeholder="选择事项"
            style={{ width: 120 }}
            value={selectedKsAndYw.yw}
            onChange={this.handleYwChange}
          >
            {ywData.map(yw => <Select.Option key={yw.id}>{yw.name}</Select.Option>)}
          </Select>
        </div>
        <Pie
          hasLegend
          subTitle="总件数"
          total={() => selectedYw.data.reduce((pre, now) => now.y + pre, 0)}
          data={selectedYw.data}
          valueFormat={value => `${value}件`}
          height={248}
          lineWidth={4}
        />
      </div>
    );

  };

  // 办件人员明细
  renderStaffList = () => {

    const {
      ce: {
        bjrymxloading,
        bjrymx
      }
    } = this.props;

    const staffListColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '10%',
        align: 'center',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '15%',
        align: 'center',
      },
      {
        title: '科室',
        dataIndex: 'ks',
        width: '15%',
        align: 'center',
      },
      {
        title: '办件数量',
        dataIndex: 'count',
        width: '15%',
        align: 'center',
      },
      {
        title: '总时长',
        dataIndex: 'time',
        width: '15%',
        align: 'center',
        render: (val) => `${val}`,
      },
      {
        title: '最短耗时',
        dataIndex: 'minTime',
        width: '15%',
        align: 'center',
        render: (val) => `${val}`,
      },
      {
        title: '最长耗时',
        dataIndex: 'maxTime',
        width: '15%',
        align: 'center',
        render: (val) => `${val}`,
      },
    ];
    return (
      <Table
        loading={bjrymxloading}
        size="small"
        rowKey="index"
        scroll={{ y: 200 }}
        dataSource={bjrymx}
        columns={staffListColumns}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showSizeChanger: true,
          showTotal: total => `总计 ${total} 人.`,
        }}
        onChange={this.handleStaffTableChange}
      />
    );
  };

  renderTime = (data) => {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'ce/saveTimeLine',
      payload: {
          bllx: data.bllx,
          clTime: data.clTime,
          isOnTime: data.isOnTime,
          sjTime: data.sjTime,
          sjz: data.list,
      }
    })
  };

  //  办件明细
  renderBlmx = () => {

    const {
      ce: {
        bjmxloading,
        bjmx: {
          data,
          pagination,
        }
      }
    } = this.props;

    const columns = [
      {
        title: '办理科室',
        dataIndex: 'ksName',
        width: '15%',
        align: 'center',
      },
      {
        title: '办理类型',
        dataIndex: 'ywlx',
        width: '15%',
        align: 'center',
      },
      {
        title: '申请单位',
        dataIndex: 'sqdw',
        width: '15%',
        align: 'center',
      },
      {
        title: '承诺时长(天)',
        dataIndex: 'time',
        width: '15%',
        align: 'center',
      },
      {
        title: '是否按时办结',
        dataIndex: 'asbj',
        width: '15%',
        align: 'center',
      },
      {
        title: '时间轴',
        key: 'more',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <span>
            <a onClick={() => this.renderTime(record)}>查看</a>
          </span>
        ),
      }
    ];

    return (
      <div className={styles.tableList}>
        <Table
          loading={bjmxloading}
          size="small"
          rowKey="index"
          scroll={{ y: 280 }}
          dataSource={data}
          columns={columns}
          pagination={{
            ...pagination,
            size: 'small',
            pageSizeOptions: ['10', '50', '100'],
            showSizeChanger: true,
            showTotal: total => `总计 ${total} 件.`,
          }}
          onChange={this.handleBjmxTableChange}
        />
      </div>
    );
  };

  // 时间轴
  renderTimeLine = () => {

    const {
      ce: {
        timeLine
      }
    } = this.props;
    if (timeLine.sjz !== undefined) {
      return (
        <div>
          <div style={{height: '32px'}}>
            <span>{timeLine.bllx}</span>
          </div>
          <div style={{height: '48px'}}>
            <DescriptionList size="small" col={3}>
              <Description term="承诺时长(天)">{timeLine.clTime}</Description>
              <Description term="实际用时（天）">{timeLine.sjTime}</Description>
              <Description term="是否按时办结">{timeLine.isOnTime}</Description>
            </DescriptionList>
          </div>
          <div style={{height: 300, overflowY: 'auto'}}>
            <Timeline>
              {timeLine.sjz.map(r  => (
                <Timeline.Item key={r.index}>
                  <div>
                    <p>{r.time}</p>
                    <p>{r.type}&nbsp;{r.name}</p>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </div>
      );
    }
  };

  // 办件人员明细翻页
  handleStaffTableChange = () => {

  };

  // 办件明细翻页
  handleBjmxTableChange = (pagination) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'ce/fetchBjmx',
      payload: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {

    const {
      bjmxloading,
    } = this.props;

    return (
      <GridContent>
        <Card
          style={{ marginBottom: '12px' }}
          title="办理科室总占比"
          bodyStyle={{ padding: '5px' }}
        >
          {this.renderBlkszb()}
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="办理科室分析"
              bodyStyle={{ minHeight: '300px', padding: '0 5px' }}
            >
              {this.renderBlksmxfx()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="办件人员明细"
              bodyStyle={{ height: '300px', padding: '5px' }}
            >
              {this.renderStaffList()}
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="办件明细"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              {this.renderBlmx()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={bjmxloading}
              title="时间轴"
              bodyStyle={{ height: '400px', padding: '20px' }}
            >
              {this.renderTimeLine()}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default ConstructionEfficiency;
