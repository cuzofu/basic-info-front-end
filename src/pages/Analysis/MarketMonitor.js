import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Card,
  Col,
  Row,
  Table,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import SunburstPie from './Pie/SunburstPie';
import {
  Bar,
} from '@/components/Charts';

import styles from './MarketMonitor.less';

@connect(({ mm, loading }) => ({
  mm,
  loading: loading.effects['mm/fetchData'],
}))
class MarketMonitor extends Component {

  render() {

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="企业诚信等级统计" bodyStyle={{ height: '400px', padding: 0 }}>
              <SunburstPie
                height={400}
                data={[
                  {
                    value: 276,
                    type: '良好行为加分',
                    name: 'A级企业',
                  },
                  {
                    value: 50,
                    type: '不良行为扣分',
                    name: 'A级企业',
                  },
                  {
                    value: 23,
                    type: '未变化企业',
                    name: 'A级企业',
                  },
                  {
                    value: 1986,
                    type: '良好行为加分',
                    name: 'B级企业',
                  },
                  {
                    value: 862,
                    type: '不良行为扣分',
                    name: 'B级企业',
                  },
                  {
                    value: 102,
                    type: '未变化企业',
                    name: 'B级企业',
                  },
                  {
                    value: 0,
                    type: '良好行为加分',
                    name: 'C级企业',
                  },
                  {
                    value: 3,
                    type: '不良行为扣分',
                    name: 'C级企业',
                  },
                  {
                    value: 0,
                    type: '未变化企业',
                    name: 'C级企业',
                  },
                ]}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="本期企业诚信排名"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <Table
                size="large"
                scroll={{ y: 260 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    orgName: '湖北勇胜建设工程有限公司',
                    score: 5,
                    creditScore: 179.5,
                    creditLevel: 'A级',
                  },
                  {
                    key: '2',
                    rank: 2,
                    orgName: '湖北枝江宏宇建设有限责任公司',
                    score: 10,
                    creditScore: 170.5,
                    creditLevel: 'A级',
                  },
                  {
                    key: '3',
                    rank: 3,
                    orgName: '湖北弘扬园林工程有限公司',
                    score: 30,
                    creditScore: 168,
                    creditLevel: 'A级',
                  },
                  {
                    key: '4',
                    rank: 4,
                    orgName: '湖北领驭建设有限公司',
                    score: '-',
                    creditScore: 166.5,
                    creditLevel: 'A级',
                  },
                  {
                    key: '5',
                    rank: 5,
                    orgName: '宜昌凯鑫建筑工程有限公司',
                    score: 8,
                    creditScore: 140,
                    creditLevel: 'A级',
                  },
                ]}
                columns={[
                  {
                    title: '排名',
                    dataIndex: 'rank',
                    width: '10%',
                  },
                  {
                    title: '企业名称',
                    dataIndex: 'orgName',
                    width: '45%',
                  },
                  {
                    title: '本期分数',
                    dataIndex: 'score',
                    width: '15%',
                  },
                  {
                    title: '诚信分数',
                    dataIndex: 'creditScore',
                    width: '15%',
                  },
                  {
                    title: '等级',
                    dataIndex: 'creditLevel',
                    width: '15%',
                  },
                ]}
                pagination={{
                  pageSize: 10,
                  current: 1,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 条记录.`,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card title="企业诚信行为分析" bodyStyle={{ height: '400px', padding: 0 }}>
              <Bar
                data={[
                  {
                    x: '企业入库总数',
                    y: 30250
                  },
                  {
                    x: '企业诚信记分',
                    y: 20134
                  },
                  {
                    x: '良好行为加分',
                    y: 13005
                  },
                  {
                    x: '不良行为扣分',
                    y: 1375
                  },
                  {
                    x: '失信企业',
                    y: 3
                  },
                ]}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="失信企业名单"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <Table
                size="large"
                scroll={{ y: 260 }}
                dataSource={[
                  {
                    key: '1',
                    rank: 1,
                    orgName: '福建省景观园林建筑发展有限公司',
                    creditScore: 58,
                    creditLevel: 'C级',
                  },
                  {
                    key: '2',
                    rank: 2,
                    orgName: '湖北枝江宏宇建设有限责任公司',
                    creditScore: 49,
                    creditLevel: 'C级',
                  },
                  {
                    key: '3',
                    rank: 3,
                    orgName: '湖北弘扬园林工程有限公司',
                    score: 30,
                    creditScore: 40,
                    creditLevel: 'C级',
                  },
                ]}
                columns={[
                  {
                    title: '排名',
                    dataIndex: 'rank',
                    width: '15%',
                  },
                  {
                    title: '企业名称',
                    dataIndex: 'orgName',
                    width: '50%',
                  },
                  {
                    title: '诚信分数',
                    dataIndex: 'creditScore',
                    width: '20%',
                  },
                  {
                    title: '等级',
                    dataIndex: 'creditLevel',
                    width: '15%',
                  },
                ]}
                pagination={{
                  pageSize: 10,
                  current: 1,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 条记录.`,
                }}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default MarketMonitor;
