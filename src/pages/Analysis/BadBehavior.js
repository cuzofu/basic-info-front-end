import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Card, Table } from 'antd';
import { Pie } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import MatrixBar from './MatrixBar/MatrixBar';

import styles from './BadBehavior.less';

@connect(({ badBehavior, loading }) => ({
  badBehavior,
  blxwJgbmzbLoading: loading.effects['badBehavior/fetchBlxwJgbmzb'], // fetchBlxwXmpm
  blxwJgbmlxzbLoading: loading.effects['badBehavior/fetchBlxwJgbmlxzb'],
  blxwQyxwpmLoading: loading.effects['badBehavior/fetchBlxwQyxwpm'],
  blxwGrxwpmLoading: loading.effects['badBehavior/fetchBlxwGrxwpm'],
  blxwXmpmLoading: loading.effects['badBehavior/fetchBlxwXmpm'],
}))
class BadBehavior extends Component {

  state = {
    blxwQyxwpmPagination: {
      current: 1,
      pageSize: 10,
    },
    blxwGrxwpmPagination: {
      current: 1,
      pageSize: 10,
    },
    blxwXmpmPagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'badBehavior/fetchBlxwJgbmzb',
        payload: {
          time: '2018-01-01'
        }
      });
      dispatch({
        type: 'badBehavior/fetchBlxwJgbmlxzb',
        payload: {
          time: '2018-01-01'
        }
      });
      dispatch({
        type: 'badBehavior/fetchBlxwQyxwpm',
        payload: {
          time: '2018-01-01'
        }
      });
      dispatch({
        type: 'badBehavior/fetchBlxwGrxwpm',
        payload: {
          time: '2018-01-01'
        }
      });
      dispatch({
        type: 'badBehavior/fetchBlxwXmpm',
        payload: {
          time: '2018-01-01'
        }
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'badBehavior/clear',
    });
  }

  // 企业行为排名翻页
  handleBlxwQyxwpmTableChange = (pagination) => {
    this.setState({
      blxwQyxwpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  // 个人行为排名翻页
  handleBlxwGrxwpmTableChange = (pagination) => {
    this.setState({
      blxwGrxwpmPagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    });
  };

  render() {
    const {
      blxwQyxwpmPagination,
      blxwGrxwpmPagination,
    } = this.state;
    const {
      blxwJgbmzbLoading,
      blxwJgbmlxzbLoading,
      blxwQyxwpmLoading,
      blxwGrxwpmLoading,
      badBehavior: {
        blxwJgbmzb,
        blxwJgbmlxzb,
        blxwQyxwpm,
        blxwGrxwpm,
        blxwXmpmLoading,
      },
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
        width: '30%',
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
        dataIndex: 'amountOfBehavior',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '12%',
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
        width: '30%',
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
        width: '15%',
        render: (val) => `${(val * 100).toFixed(2)}%`
      },
    ];

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwJgbmzbLoading} title="机构部门占比" bodyStyle={{ minHeight: '300px' }}>
              {
                blxwJgbmzb && blxwJgbmzb.length > 0 ? (
                  <Pie
                    hasLegend
                    subTitle="总数"
                    total={() => blxwJgbmzb.reduce((pre, now) => now.y + pre, 0)}
                    data={blxwJgbmzb}
                    valueFormat={value => `${value}`}
                    height={248}
                    lineWidth={4}
                  />
                ) : (
                  <div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>
                )
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card title="项目排名占比" bodyStyle={{ height: '300px', padding: '5px' }}>
              <Table
                loading={blxwJgbmzbLoading}
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
                loading={blxwJgbmzbLoading}
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
            <Card loading={blxwQyxwpmLoading} title="企业行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                size="small"
                scroll={{ y: 300 }}
                dataSource={blxwQyxwpm}
                columns={orgBehaviorRankingList}
                pagination={{
                  pageSize: blxwQyxwpmPagination.pageSize,
                  current: blxwQyxwpmPagination.current,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 家企业.`,
                }}
                onChange={this.handleBlxwQyxwpmTableChange}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={blxwGrxwpmLoading} title="个人行为排名占比" bodyStyle={{ height: '400px', padding: '5px' }}>
              <Table
                size="small"
                scroll={{ y: 280 }}
                dataSource={blxwGrxwpm}
                columns={personalBehaviorRankingList}
                pagination={{
                  ...blxwGrxwpmPagination,
                  pageSizeOptions: ['10', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 人.`,
                }}
                onChange={this.handleBlxwGrxwpmTableChange}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default BadBehavior;
