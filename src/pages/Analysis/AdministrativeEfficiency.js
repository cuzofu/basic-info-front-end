import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';

import {
  Card,
  Row,
  Col,
  Radio,
  Table,
  Steps,
  Popover,
  Icon,
  Badge,
} from 'antd';

import {
  Pie,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './AdministrativeEfficiency.less';
import StackedBar2 from "./Bar/StackedBar2/index";

const { Step } = Steps;

// 左右结构布局参数
const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };
// 左右结构布局参数
const leftCardColsProps = { xs: 24, sm: 12, lg: 16, xl: 16, style: { marginBottom: 12 } };
const rightCardColsProps = { xs: 24, sm: 12, lg: 8, xl: 8, style: { marginBottom: 12 } };

const customDot = (dot, { status }) => dot;

@connect(({ ae, loading }) => ({
  ae,
  xzspzzbloading: loading.effects['ae/fetchXzspzzb'],
  xzxksxmxloading: loading.effects['ae/fetchXzxksxmx'],
}))
class AdministrativeEfficiency extends Component {

  state = {
    xzxksx: '总件数',
    stepDirection: 'horizontal',
    pagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'ae/fetchXzspzzb',
      payload: {}
    })
    dispatch({
      type: 'ae/fetchXzxksxmx',
      payload: {}
    })
  }

  // 行政审批总占比
  renderXzspzb = () => {

    const {
      xzspzzbloading,
      ae: {
        xzspzzb
      }
    } = this.props;

    return (
      <div>
        <StackedBar2
          fields={['按期数', '超期数']}
          data={xzspzzb}
        />
      </div>
    );
  };

// 行政许可事项比率
  renderXzxksx = () => {
    const {
      xzxksx,
    } = this.state;
    const {
      ae: {
        xzspzzb
      }
    } = this.props;
    let xzxksxData = [];
    xzspzzb.filter(r => r.spsx === xzxksx).forEach(r => {
      xzxksxData = [
        {
          x: '按期数',
          y: r.按期数,
        },
        {
          x: '超期数',
          y: r.超期数,
        }
      ];
    });

    return (
      <div>
        <div className={styles.xzxksxTypeRadio}>
          <Radio.Group value={xzxksx} onChange={this.handleChangeXzxksxType}>
            {
              xzspzzb.map(r => (
                <Radio.Button key={r.spsx} value={r.spsx}>{r.spsx}</Radio.Button>
              ))
            }
          </Radio.Group>
        </div>
        <div>
          <Pie
            hasLegend
            subTitle="总件数"
            total={() => `${xzxksxData.reduce((pre, now) => now.y + pre, 0)}件`}
            data={xzxksxData}
            valueFormat={value => `${value}件`}
            height={348}
            inner={0.7}
            padding={40}
          />
        </div>
      </div>
    );
  };

  handleChangeXzxksxType = e => {
    this.setState({
      xzxksx: e.target.value,
    });
  };

  renderTimeLine = (data) => {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'ae/saveTimeLine',
      payload: {
        clTime: data.clTime,
        isOnTime: data.isOnTime,
        sjTime: data.sjTime,
        sjz: data.sjz,
      }
    })
  };

  // 行政许可事项明细
  renderXzsksxmxTable = () => {

    const {
      pagination,
    } = this.state;
    const {
      xzxksxmxloading,
      ae: {
        xzxksxmx
      }
    } = this.props;

    const xzxksxColumns = [
      {
        title: '行政许可事项',
        dataIndex: 'xzxksx',
        width: '15%',
        align: 'center',
      },
      {
        title: '编号',
        dataIndex: 'sgxkbh',
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
        render: (val) => `${val}天`,
      },
      {
        title: '是否按时办结',
        dataIndex: 'sfasbj',
        width: '15%',
        align: 'center',
      },
      {
        title: '时间轴',
        width: '15%',
        align: 'center',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.renderTimeLine(record)}>查看</a>
          </span>
        ),
      },
    ];

    return (
      <Table
        size="small"
        rowKey="index"
        scroll={{ y: 270 }}
        dataSource={xzxksxmx}
        columns={xzxksxColumns}
        pagination={{
          ...pagination,
          pageSizeOptions: ['10', '20', '50'],
          showSizeChanger: true,
          showTotal: total => `总计 ${total} 条记录.`,
        }}
        onChange={this.handleEngZtbTableChange}
      />
    );
  };

  // 翻页
  handleEngZtbTableChange = (pagination) => {
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  //  时间轴
  renderXzsksxTimeLine = () => {

    const {
      stepDirection,
    } = this.state;
    const {
      xzxksxmxloading,
      ae: {
        timeLine,
      }
    } = this.props;

    if (timeLine.sjz !== undefined) {
      return (
        <Row>
          <Col {...leftCardColsProps}>
            <Steps direction={stepDirection} progressDot={customDot} current={3}>
              {
                timeLine.sjz.map(r => (
                  <Step
                    key={r.index}
                    title={r.type}
                    description={(
                      <div className={styles.stepDescription}>
                        <Fragment>
                          {r.name}
                        </Fragment>
                        <div>
                          {r.time}
                        </div>
                      </div>
                    )}
                  />
                ))
              }
            </Steps>
          </Col>
          <Col {...rightCardColsProps}>
            <div style={{textAlign: 'center'}}>
              <p>承诺时长(天)：{timeLine.clTime}天</p>
              <p>实际用时(天)：{timeLine.sjTime}天</p>
              <p>是否按时办结：{timeLine.isOnTime}</p>
            </div>
          </Col>
        </Row>
      );
    }

  };

  render() {

    const {
      xzspzzbloading
    } = this.props;

    return (
      <GridContent>
        <Card
          style={{ marginBottom: '12px' }}
          title="行政审批总占比"
          bodyStyle={{ padding: '5px', minHeight: '300px' }}
        >
          {this.renderXzspzb()}
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="行政许可事项比率"
              bodyStyle={{ padding: '5px', minHeight: '400px' }}
            >
              { xzspzzbloading ? null : this.renderXzxksx()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="行政许可事项明细"
              bodyStyle={{ padding: '5px', minHeight: '400px' }}
            >
              {this.renderXzsksxmxTable()}
            </Card>
          </Col>
        </Row>
        <Card
          style={{ marginBottom: '12px' }}
          title="时间轴"
          bodyStyle={{ padding: '20px 0' }}
        >
          {this.renderXzsksxTimeLine()}
        </Card>
      </GridContent>
    );
  }
}

export default AdministrativeEfficiency;
