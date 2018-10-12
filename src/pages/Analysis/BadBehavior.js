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
  loading: loading.effects['badBehavior/fetch'],
}))
class BadBehavior extends Component {

  state = {
    subPersonZzAnalysisData: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'badBehavior/fetch',
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
      type: 'badBehavior/clear',
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
        render: (value) => `${value}%`
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

    // 企业行为排名占比
    const orgBehaviorRankingList = [
      {
        title: '排名',
        dataIndex: 'ranking',
        width: '10%',
      },
      {
        title: '企业名称',
        dataIndex: 'name',
        width: '35%',
      },
      {
        title: '信用等级',
        dataIndex: 'job',
        width: '10%',
      },
      {
        title: '信用分',
        dataIndex: 'investment',
        width: '10%',
      },
      {
        title: '不良行为数量',
        dataIndex: 'amountOfEng',
        width: '15%',
      },
      {
        title: '占比',
        dataIndex: 'rate',
        width: '10%',
      },
    ];

    const orgZzAnalysisData = [
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
          <Col {...doubleCardColsProps}>
            <Card title="机构部门占比" bodyStyle={{ minHeight: '300px' }}>
              <Pie
                hasLegend
                subTitle="总数"
                total={() => orgZzAnalysisData.reduce((pre, now) => now.y + pre, 0)}
                data={orgZzAnalysisData}
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
                  {groupY: "建设", value: 0.5, groupX: "城建管理科"},
                  {groupY: "建设", value: 0.2, groupX: "质量安全站"},
                  {groupY: "建设", value: 0.33, groupX: "市场站"},
                  {groupY: "建设", value: 0.11, groupX: "招投标"},
                  {groupY: "建设", value: 0.65, groupX: "其他"},

                  {groupY: "施工", value: 0.09, groupX: "城建管理科"},
                  {groupY: "施工", value: 0.99, groupX: "质量安全站"},
                  {groupY: "施工", value: 0.05, groupX: "市场站"},
                  {groupY: "施工", value: 0.15, groupX: "招投标"},
                  {groupY: "施工", value: 0.25, groupX: "其他"},

                  {groupY: "监理", value: 0.22, groupX: "城建管理科"},
                  {groupY: "监理", value: 0.33, groupX: "质量安全站"},
                  {groupY: "监理", value: 0.44, groupX: "市场站"},
                  {groupY: "监理", value: 0.55, groupX: "招投标"},
                  {groupY: "监理", value: 0.77, groupX: "其他"},

                  {groupY: "勘察", value: 0.88, groupX: "城建管理科"},
                  {groupY: "勘察", value: 0.66, groupX: "质量安全站"},
                  {groupY: "勘察", value: 0.44, groupX: "市场站"},
                  {groupY: "勘察", value: 0.22, groupX: "招投标"},
                  {groupY: "勘察", value: 0.11, groupX: "其他"},

                  {groupY: "设计", value: 0.09, groupX: "城建管理科"},
                  {groupY: "设计", value: 0.89, groupX: "质量安全站"},
                  {groupY: "设计", value: 0.05, groupX: "市场站"},
                  {groupY: "设计", value: 0.15, groupX: "招投标"},
                  {groupY: "设计", value: 0.25, groupX: "其他"},

                  {groupY: "商混", value: 0.09, groupX: "城建管理科"},
                  {groupY: "商混", value: 0.89, groupX: "质量安全站"},
                  {groupY: "商混", value: 0.05, groupX: "市场站"},
                  {groupY: "商混", value: 0.15, groupX: "招投标"},
                  {groupY: "商混", value: 0.25, groupX: "其他"},

                  {groupY: "装饰装修", value: 0.09, groupX: "城建管理科"},
                  {groupY: "装饰装修", value: 0.89, groupX: "质量安全站"},
                  {groupY: "装饰装修", value: 0.05, groupX: "市场站"},
                  {groupY: "装饰装修", value: 0.15, groupX: "招投标"},
                  {groupY: "装饰装修", value: 0.25, groupX: "其他"},

                  {groupY: "起重设备", value: 0.09, groupX: "城建管理科"},
                  {groupY: "起重设备", value: 0.89, groupX: "质量安全站"},
                  {groupY: "起重设备", value: 0.05, groupX: "市场站"},
                  {groupY: "起重设备", value: 0.15, groupX: "招投标"},
                  {groupY: "起重设备", value: 0.25, groupX: "其他"},

                  {groupY: "造价/招标", value: 0.09, groupX: "城建管理科"},
                  {groupY: "造价/招标", value: 0.89, groupX: "质量安全站"},
                  {groupY: "造价/招标", value: 0.05, groupX: "市场站"},
                  {groupY: "造价/招标", value: 0.15, groupX: "招投标"},
                  {groupY: "造价/招标", value: 0.25, groupX: "其他"},

                  {groupY: "劳务分包", value: 0.09, groupX: "城建管理科"},
                  {groupY: "劳务分包", value: 0.89, groupX: "质量安全站"},
                  {groupY: "劳务分包", value: 0.05, groupX: "市场站"},
                  {groupY: "劳务分包", value: 0.15, groupX: "招投标"},
                  {groupY: "劳务分包", value: 0.25, groupX: "其他"},

                  {groupY: "节能/检测/图审", value: 0.09, groupX: "城建管理科"},
                  {groupY: "节能/检测/图审", value: 0.89, groupX: "质量安全站"},
                  {groupY: "节能/检测/图审", value: 0.05, groupX: "市场站"},
                  {groupY: "节能/检测/图审", value: 0.15, groupX: "招投标"},
                  {groupY: "节能/检测/图审", value: 0.25, groupX: "其他"},
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
                    rate: 11
                  },
                  {
                    key: '2',
                    index: 2,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 27,
                    rate: 9
                  },
                  {
                    key: '3',
                    index: 3,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 21,
                    rate: 7
                  },
                  {
                    key: '4',
                    index: 4,
                    behaviorNo: 'YCJS(2011)072',
                    behaviorType: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
                    countOfEng: 9,
                    rate: 3
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
      </GridContent>
    );
  }
}

export default BadBehavior;
