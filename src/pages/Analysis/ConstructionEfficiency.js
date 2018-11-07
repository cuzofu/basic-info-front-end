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

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class ConstructionEfficiency extends Component {

  state = {
    subData: {},
    selectedKsAndYw: {
      ks: '1',
      yw: '1',
    }
  };

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

  renderBlkszb = () => {

    const {
      subData,
    } =  this.state;
    const data = [
      {
        x: '建管科',
        y: 3005,
        sub: [
          {
            x: '按期',
            y: 2338,
          },
          {
            x: '超期',
            y: 667,
          }
        ],
      },
      {
        x: '窗口',
        y: 190,
        sub: [
          {
            x: '按期',
            y: 190,
          },
          {
            x: '超期',
            y: 0,
          }
        ],
      },
      {
        x: '定额站',
        y: 447,
        sub: [
          {
            x: '按期',
            y: 400,
          },
          {
            x: '超期',
            y: 47,
          }
        ],
      },
      {
        x: '市政监督室',
        y: 321,
        sub: [
          {
            x: '按期',
            y: 321,
          },
          {
            x: '超期',
            y: 0,
          }
        ],
      },
      {
        x: '质监一室',
        y: 430,
        sub: [
          {
            x: '按期',
            y: 400,
          },
          {
            x: '超期',
            y: 30,
          }
        ],
      },
      {
        x: '质监二室',
        y: 289,
        sub: [
          {
            x: '按期',
            y: 277,
          },
          {
            x: '超期',
            y: 12,
          }
        ],
      },
      {
        x: '安监一室',
        y: 256,
        sub: [
          {
            x: '按期',
            y: 250,
          },
          {
            x: '超期',
            y: 6,
          }
        ],
      },
      {
        x: '安监二室',
        y: 180,
        sub: [
          {
            x: '按期',
            y: 179,
          },
          {
            x: '超期',
            y: 1,
          }
        ],
      },
    ];

    if (data && data.length > 0) {
      if (!(subData && subData.x)) {
        subData.x = data[0].x;
        subData.y = data[0].y;
        subData.sub = data[0].sub;
      }
    }

    if (data && data.length > 0) {
      return (
        <Row>
          <Col {...doubleCardColsProps}>
            <Pie
              hasLegend
              subTitle="总件数"
              total={() => data.reduce((pre, now) => now.y + pre, 0)}
              data={data}
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

    const ksData = [
      {
        id: '1',
        ksName: '监督一室',
        yws: [
          {
            id: '1',
            name: '现场踏勘',
            data: [
              {
                x: '按期',
                y: 280,
              },
              {
                x: '超期',
                y: 20,
              }
            ]
          },
          {
            id: '2',
            name: '竣工备案',
            data: [
              {
                x: '按期',
                y: 180,
              },
              {
                x: '超期',
                y: 1,
              }
            ]
          }
        ],
      },
      {
        id: 'zh',
        ksName: '综合室',
        yws: [
          {
            id: '1',
            name: '监督登记',
            data: [
              {
                x: '按期',
                y: 1180,
              },
              {
                x: '超期',
                y: 131,
              }
            ]
          },
          {
            id: '2',
            name: '施工许可',
            data: [
              {
                x: '按期',
                y: 999,
              },
              {
                x: '超期',
                y: 12,
              }
            ]
          }
        ],
      }
    ];

    // 已选择的科室
    const selectedKs = ksData.find(k => k.id === selectedKsAndYw.ks);
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
            {ksData.map(k => <Select.Option key={k.id}>{k.ksName}</Select.Option>)}
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

  renderStaffList = () => {

    const staffList = [
      {
        index: 1,
        name: '吴登峰',
        ks: '监督一室',
        count: 110,
        time: 400,
        minTime: 1,
        maxTime: 2,
      },
      {
        index: 2,
        name: '汪家毅',
        ks: '监督一室',
        count: 140,
        time: 28,
        minTime: 1,
        maxTime: 1,
      },
      {
        index: 3,
        name: '谭建华',
        ks: '监督一室',
        count: 140,
        time: 28,
        minTime: 1,
        maxTime: 1,
      },
      {
        index: 4,
        name: '左亚',
        ks: '监督一室',
        count: 140,
        time: 28,
        minTime: 1,
        maxTime: 3,
      },
    ];
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
        render: (val) => `${val}天`,
      },
      {
        title: '最段耗时',
        dataIndex: 'minTime',
        width: '15%',
        align: 'center',
        render: (val) => `${val}小时`,
      },
      {
        title: '最长耗时',
        dataIndex: 'maxTime',
        width: '15%',
        align: 'center',
        render: (val) => `${val}天`,
      },
    ];
    return (
      <Table
        size="small"
        rowKey="index"
        scroll={{ y: 200 }}
        dataSource={staffList}
        columns={staffListColumns}
        pagination={{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showSizeChanger: true,
          showTotal: total => `总计 ${total} 人.`,
        }}
        onChange={this.handleStaffTableChange}
      />
    );
  };

  renderBlmx = () => {

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
        render: (_, record) => (
          <span>查看</span>
        ),
      }
    ];

    const data = [
      {
        key: '1',
        ksName: '监督一室',
        ywlx: '现场踏勘',
        sqdw: '宜昌国闰房地产有限公司',
        time: 2,
        asbj: '按时',
      },
      {
        key: '2',
        ksName: '定额站',
        ywlx: '招投标',
        sqdw: '湖北兴焱工程咨询有限公司',
        time: 2,
        asbj: '超时',
      },
      {
        key: '3',
        ksName: '建管科',
        ywlx: '良好行为申请',
        sqdw: '湖北枝江宏宇建设有限责任公司',
        time: 1,
        asbj: '按时',
      },
    ];

    return (
      <div className={styles.tableList}>
        <Table
          size="small"
          rowKey="key"
          scroll={{ y: 315 }}
          dataSource={data}
          columns={columns}
          pagination={{
            current: 1,
            pageSize: 10,
            pageSizeOptions: ['10', '50', '100'],
            showSizeChanger: true,
            showTotal: total => `总计 ${total} 件.`,
          }}
        />
      </div>
    );
  };

  renderTimeLine = () => {
    return (
      <div>
        <div style={{height: '32px'}}>
          <span>现场踏勘</span>
        </div>
        <div style={{height: '48px'}}>
          <DescriptionList size="small" col={3}>
            <Description term="承诺时长(天)：">2</Description>
            <Description term="实际用时（天）">2</Description>
            <Description term="是否按时办结">按时</Description>
          </DescriptionList>
        </div>
        <div style={{height: 300, overflowY: 'auto'}}>
          <Timeline>
            <Timeline.Item>
              <div>
                <p>2018-09-14 14:56</p>
                <p>提交申请 宜昌国闰房地产有限公司</p>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <div>
                <p>2018-09-14 15:31</p>
                <p>受理人 李晨青（监督一室）</p>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              <div>
                <p>2018-09-15 11:05</p>
                <p>办结人 陈宫厚（监督一室）</p>
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    );
  };

  // 办件人员明细翻页
  handleStaffTableChange = () => {

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
