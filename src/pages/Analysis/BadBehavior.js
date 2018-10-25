import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Table } from 'antd';
import { Pie } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import MatrixBar from './MatrixBar/MatrixBar';

import styles from './BadBehavior.less';

@connect(({ badBehavior, loading }) => ({
  badBehavior,
  loading: loading.effects['badBehavior/fetch'],
}))
class BadBehavior extends Component {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'badBehavior/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({});
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'badBehavior/clear',
    });
  }

  render() {
    const {
      badBehavior: { loading },
    } = this.props;

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    // 行为类型排名占比
    const behaviorListColumns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: '10%',
        align: 'center',
      },
      {
        title: '行为编码',
        dataIndex: 'behaviorNo',
        width: '25%',
      },
      {
        title: '行为类型',
        dataIndex: 'behaviorType',
        width: '25%',
      },
      {
        title: '总项目数',
        dataIndex: 'countOfEng',
        width: '20%',
        align: 'center',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '20%',
        render: value => `${value}%`,
      },
    ];

    // 项目排名占比
    const projectRankingData = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: '10%',
      },
      {
        title: '项目名称',
        dataIndex: 'engName',
        width: '30%',
      },
      {
        title: '记录(企业)',
        dataIndex: 'countEng',
        width: '15%',
      },
      {
        title: '记录(人员)',
        dataIndex: 'countPerson',
        width: '15%',
      },
      {
        title: '总记录',
        dataIndex: 'count',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '15%',
      },
    ];

    // 个人行为排名占比
    const personalBehaviorRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '8%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
      },
      {
        title: '所属企业',
        dataIndex: 'orgName',
        width: '32%',
      },
      {
        title: '信用等级',
        dataIndex: 'creditLevel',
        width: '15%',
      },
      {
        title: '信用分',
        dataIndex: 'creditScore',
        width: '10%',
      },
      {
        title: '不良行为',
        dataIndex: 'countOfBehavior',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '10%',
      },
    ];

    // 企业行为排名占比
    const orgBehaviorRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'orgName',
        width: '35%',
      },
      {
        title: '信用等级',
        dataIndex: 'creditLevel',
        width: '15%',
      },
      {
        title: '信用分',
        dataIndex: 'creditScore',
        width: '15%',
      },
      {
        title: '不良行为',
        dataIndex: 'amountOfBehavior',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '10%',
      },
    ];

    // 机构部门占比
    const orgAnalysisData = [
      {
        x: '城建管理科',
        y: 1000,
      },
      {
        x: '质量安全站',
        y: 500,
      },
      {
        x: '市场站',
        y: 300,
      },
      {
        x: '招投标',
        y: 480,
      },
      {
        x: '其他',
        y: 1015,
      },
    ];

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="机构部门占比" bodyStyle={{ minHeight: '300px' }}>
              <Pie
                hasLegend
                subTitle="总数"
                total={() => orgAnalysisData.reduce((pre, now) => now.y + pre, 0)}
                data={orgAnalysisData}
                valueFormat={value => `${value}`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="项目排名占比" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 12,
                    countPerson: 5,
                    count: 17,
                    rate: '7%',
                  },
                  {
                    key: '2',
                    rank: 2,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 11,
                    countPerson: 5,
                    count: 16,
                    rate: '5%',
                  },
                  {
                    key: '3',
                    rank: 3,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 10,
                    countPerson: 4,
                    count: 14,
                    rate: '4%',
                  },
                  {
                    key: '4',
                    rank: 4,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 9,
                    countPerson: 4,
                    count: 13,
                    rate: '3%',
                  },
                  {
                    key: '5',
                    rank: 5,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 9,
                    countPerson: 2,
                    count: 11,
                    rate: '3%',
                  },
                  {
                    key: '6',
                    rank: 5,
                    engName: 'xxxxxxxxxxxxxxxx工程',
                    countEng: 6,
                    countPerson: 2,
                    count: 8,
                    rate: '2%',
                  },
                ]}
                columns={projectRankingData}
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
            <Card title="机构部门类型占比" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <MatrixBar
                height={390}
                padding={[5, 5, 100, 60]}
                data={[
                  { groupY: '建设', value: 0.5, groupX: '城建管理科' },
                  { groupY: '建设', value: 0.2, groupX: '质量安全站' },
                  { groupY: '建设', value: 0.33, groupX: '市场站' },
                  { groupY: '建设', value: 0.11, groupX: '招投标' },
                  { groupY: '建设', value: 0.65, groupX: '其他' },

                  { groupY: '施工', value: 0.09, groupX: '城建管理科' },
                  { groupY: '施工', value: 0.99, groupX: '质量安全站' },
                  { groupY: '施工', value: 0.05, groupX: '市场站' },
                  { groupY: '施工', value: 0.15, groupX: '招投标' },
                  { groupY: '施工', value: 0.25, groupX: '其他' },

                  { groupY: '监理', value: 0.22, groupX: '城建管理科' },
                  { groupY: '监理', value: 0.33, groupX: '质量安全站' },
                  { groupY: '监理', value: 0.44, groupX: '市场站' },
                  { groupY: '监理', value: 0.55, groupX: '招投标' },
                  { groupY: '监理', value: 0.77, groupX: '其他' },

                  { groupY: '勘察', value: 0.88, groupX: '城建管理科' },
                  { groupY: '勘察', value: 0.66, groupX: '质量安全站' },
                  { groupY: '勘察', value: 0.44, groupX: '市场站' },
                  { groupY: '勘察', value: 0.22, groupX: '招投标' },
                  { groupY: '勘察', value: 0.11, groupX: '其他' },

                  { groupY: '设计', value: 0.09, groupX: '城建管理科' },
                  { groupY: '设计', value: 0.89, groupX: '质量安全站' },
                  { groupY: '设计', value: 0.05, groupX: '市场站' },
                  { groupY: '设计', value: 0.15, groupX: '招投标' },
                  { groupY: '设计', value: 0.25, groupX: '其他' },

                  { groupY: '商混', value: 0.09, groupX: '城建管理科' },
                  { groupY: '商混', value: 0.89, groupX: '质量安全站' },
                  { groupY: '商混', value: 0.05, groupX: '市场站' },
                  { groupY: '商混', value: 0.15, groupX: '招投标' },
                  { groupY: '商混', value: 0.25, groupX: '其他' },

                  { groupY: '装饰装修', value: 0.09, groupX: '城建管理科' },
                  { groupY: '装饰装修', value: 0.89, groupX: '质量安全站' },
                  { groupY: '装饰装修', value: 0.05, groupX: '市场站' },
                  { groupY: '装饰装修', value: 0.15, groupX: '招投标' },
                  { groupY: '装饰装修', value: 0.25, groupX: '其他' },

                  { groupY: '起重设备', value: 0.09, groupX: '城建管理科' },
                  { groupY: '起重设备', value: 0.89, groupX: '质量安全站' },
                  { groupY: '起重设备', value: 0.05, groupX: '市场站' },
                  { groupY: '起重设备', value: 0.15, groupX: '招投标' },
                  { groupY: '起重设备', value: 0.25, groupX: '其他' },

                  { groupY: '造价/招标', value: 0.09, groupX: '城建管理科' },
                  { groupY: '造价/招标', value: 0.89, groupX: '质量安全站' },
                  { groupY: '造价/招标', value: 0.05, groupX: '市场站' },
                  { groupY: '造价/招标', value: 0.15, groupX: '招投标' },
                  { groupY: '造价/招标', value: 0.25, groupX: '其他' },

                  { groupY: '劳务分包', value: 0.09, groupX: '城建管理科' },
                  { groupY: '劳务分包', value: 0.89, groupX: '质量安全站' },
                  { groupY: '劳务分包', value: 0.05, groupX: '市场站' },
                  { groupY: '劳务分包', value: 0.15, groupX: '招投标' },
                  { groupY: '劳务分包', value: 0.25, groupX: '其他' },

                  { groupY: '节能/检测/图审', value: 0.09, groupX: '城建管理科' },
                  { groupY: '节能/检测/图审', value: 0.89, groupX: '质量安全站' },
                  { groupY: '节能/检测/图审', value: 0.05, groupX: '市场站' },
                  { groupY: '节能/检测/图审', value: 0.15, groupX: '招投标' },
                  { groupY: '节能/检测/图审', value: 0.25, groupX: '其他' },
                ]}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="行为类型排名占比" bodyStyle={{ minHeight: '400px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 280 }}
                dataSource={[
                  {
                    key: '1',
                    index: 1,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 33,
                    rate: 11,
                  },
                  {
                    key: '2',
                    index: 2,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 27,
                    rate: 9,
                  },
                  {
                    key: '3',
                    index: 3,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 21,
                    rate: 7,
                  },
                  {
                    key: '4',
                    index: 4,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 9,
                    rate: 3,
                  },
                ]}
                columns={behaviorListColumns}
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
            <Card title="企业行为排名占比" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={[
                  {
                    key: '1',
                    ranking: 1,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    creditLevel: 'A',
                    creditScore: 120,
                    amountOfBehavior: 9,
                    rate: 30,
                  },
                  {
                    key: '2',
                    ranking: 2,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    creditLevel: 'A',
                    creditScore: 120,
                    amountOfBehavior: 9,
                    rate: 30,
                  },
                  {
                    key: '3',
                    ranking: 3,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    creditLevel: 'A',
                    creditScore: 120,
                    amountOfBehavior: 9,
                    rate: 30,
                  },
                  {
                    key: '4',
                    ranking: 4,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    creditLevel: 'A',
                    creditScore: 120,
                    amountOfBehavior: 9,
                    rate: 30,
                  },
                  {
                    key: '5',
                    ranking: 5,
                    orgName: 'xxxxxxxxxxxxxxxx',
                    creditLevel: 'A',
                    creditScore: 120,
                    amountOfBehavior: 9,
                    rate: 30,
                  },
                ]}
                columns={orgBehaviorRankingList}
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
          <Col {...doubleCardColsProps}>
            <Card title="个人行为排名占比" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={loading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={[
                  {
                    key: '1',
                    ranking: 1,
                    name: '张叁',
                    orgName: '湖北广盛',
                    creditLevel: 'A',
                    creditScore: 238,
                    amountOfBehavior: 18,
                    rate: '30%',
                  },
                  {
                    key: '2',
                    ranking: 2,
                    name: '李四',
                    orgName: '湖北沛函',
                    creditLevel: 'A',
                    creditScore: 211,
                    amountOfBehavior: 11,
                    rate: '20%',
                  },
                  {
                    key: '3',
                    ranking: 3,
                    name: '王五',
                    orgName: '中国建筑',
                    creditLevel: 'A',
                    creditScore: 180,
                    amountOfBehavior: 9,
                    rate: '10%',
                  },
                  {
                    key: '4',
                    ranking: 4,
                    name: '赵六',
                    orgName: '葛洲坝建设集团',
                    creditLevel: 'A',
                    creditScore: 146,
                    amountOfBehavior: 13,
                    rate: '5%',
                  },
                  {
                    key: '5',
                    ranking: 5,
                    name: '赵六',
                    orgName: '葛洲坝建设集团',
                    creditLevel: 'A',
                    creditScore: 146,
                    amountOfBehavior: 13,
                    rate: '5%',
                  },
                  {
                    key: '6',
                    ranking: 6,
                    name: '赵六',
                    orgName: '葛洲坝建设集团',
                    creditLevel: 'A',
                    creditScore: 146,
                    amountOfBehavior: 13,
                    rate: '5%',
                  },
                ]}
                columns={personalBehaviorRankingList}
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

export default BadBehavior;
