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
}))
class Intendance extends Component {

  state = {
    zgType1: '全部',
    zgType2: '全部',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'intendance/fetchZfwsks',
        payload: {
          time: '2018-01-01'
        }
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'intendance/clear',
    });
  }

  handleChange1 = e => {
    this.setState({
      zgType1: e.target.value,
    });
  };

  handleChange2 = e => {
    this.setState({
      zgType2: e.target.value,
    });
  };

  render() {

    const {
      zfwsksLoading,
      intendance: {
        zfwsks,
      }
    } = this.props;
    const {
      zgType1,
      zgType2
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
      },
    ];

    // 工程排名（执法文书）
    const engZgRankingData = [
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
                size="small"
                scroll={{ y: 310 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    issueDes: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 17,
                  },
                  {
                    key: '2',
                    rank: 2,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 16,
                  },
                  {
                    key: '3',
                    rank: 3,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 14,
                  },
                  {
                    key: '4',
                    rank: 4,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 13,
                  },
                  {
                    key: '5',
                    rank: 5,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 11,
                  },
                  {
                    key: '6',
                    rank: 6,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 8,
                  },
                  {
                    key: '7',
                    rank: 7,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 8,
                  },
                  {
                    key: '8',
                    rank: 8,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 8,
                  },
                  {
                    key: '9',
                    rank: 9,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 8,
                  },
                  {
                    key: '10',
                    rank: 10,
                    issueDes: 'xxxxxxxxxxxxxxxx',
                    issueType: '质量',
                    issueSubType: '行为类',
                    count: 8,
                  },
                ]}
                columns={issueRankingData}
                pagination={{
                  pageSize: 10,
                  total: 6,
                  current: 1,
                  pageSizeOptions: ['10', '20', '50'],
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
            <Card title="工程排名（按问题）" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <StackedBar
                fields={['质量问题', '安全问题']}
                data={[
                  {
                    rank: 'No.1',
                    engName: "XXXXXXXXXXXXXXXXXXXXX工程1",
                    "质量问题": 40,
                    "安全问题": 40
                  },
                  {
                    rank: 'No.2',
                    engName: "XXXXXXXXXXXXXXXXXXXXX工程2",
                    "质量问题": 30,
                    "安全问题": 40
                  },
                  {
                    rank: 'No.3',
                    engName: "XXXXXXXXXXXXXXXXXXXXX工程3",
                    "质量问题": 32,
                    "安全问题": 30
                  },
                  {
                    rank: 'No.4',
                    engName: "XXXXXXXXXXXXXXXXXXXXX工程4",
                    "质量问题": 30,
                    "安全问题": 18
                  },
                  {
                    rank: 'No.5',
                    engName: "XXXXXXXXXXXXXXXXXXXXX工程5",
                    "质量问题": 15,
                    "安全问题": 30
                  }
                ].reverse()}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业排名（执法文书）"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <div style={{padding: '10px 0'}}>
                <Radio.Group value={zgType1} onChange={this.handleChange1}>
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="停工">停工</Radio.Button>
                  <Radio.Button value="整改">整改</Radio.Button>
                </Radio.Group>
              </div>
              <Table
                size="small"
                scroll={{ y: 260 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    orgName: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    count: 17,
                    rate: 15,
                  },
                  {
                    key: '2',
                    rank: 2,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 16,
                    rate: 10,
                  },
                  {
                    key: '3',
                    rank: 3,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 14,
                    rate: 8,
                  },
                  {
                    key: '4',
                    rank: 4,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 13,
                    rate: 5,
                  },
                  {
                    key: '5',
                    rank: 5,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 11,
                    rate: 4,
                  },
                  {
                    key: '6',
                    rank: 6,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '7',
                    rank: 7,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '8',
                    rank: 8,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '9',
                    rank: 9,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '10',
                    rank: 10,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    count: 8,
                    rate: 3,
                  },
                ]}
                columns={orgZgRankingData}
                pagination={{
                  pageSize: 10,
                  total: 10,
                  current: 1,
                  pageSizeOptions: ['10', '20', '50'],
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
            <Card title="执法文书统计" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <BarLine
                id="zfws"
                height={390}
                data={{
                  '质量': {
                    '限期整改': 400,
                    '局部停工': 374,
                    '停工整改': 251,
                    '不良行为': 300,
                    '其他': 420,
                  },
                  '安全': {
                    '限期整改': 320,
                    '局部停工': 332,
                    '停工整改': 301,
                    '不良行为': 334,
                    '其他': 360,
                  }
                }}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="工程排名（执法文书）"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <div style={{padding: '10px 0'}}>
                <Radio.Group value={zgType2} onChange={this.handleChange2}>
                  <Radio.Button value="全部">全部</Radio.Button>
                  <Radio.Button value="停工">停工</Radio.Button>
                  <Radio.Button value="整改">整改</Radio.Button>
                </Radio.Group>
              </div>
              <Table
                size="small"
                scroll={{ y: 260 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 17,
                    rate: 15,
                  },
                  {
                    key: '2',
                    rank: 2,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 16,
                    rate: 10,
                  },
                  {
                    key: '3',
                    rank: 3,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 14,
                    rate: 8,
                  },
                  {
                    key: '4',
                    rank: 4,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 13,
                    rate: 5,
                  },
                  {
                    key: '5',
                    rank: 5,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 11,
                    rate: 4,
                  },
                  {
                    key: '6',
                    rank: 6,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '7',
                    rank: 7,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '8',
                    rank: 8,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '9',
                    rank: 9,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 8,
                    rate: 3,
                  },
                  {
                    key: '10',
                    rank: 10,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    count: 8,
                    rate: 3,
                  },
                ]}
                columns={engZgRankingData}
                pagination={{
                  pageSize: 10,
                  total: 10,
                  current: 1,
                  pageSizeOptions: ['10', '20', '50'],
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: total => `Total ${total} items.`,
                }}
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
