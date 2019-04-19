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
  qycxxwfxLoading: loading.effects['mm/fetchQycxxwfx'],
  sxqymdLoading: loading.effects['mm/fetchSxqymd'],
  qycxdjtjLoading: loading.effects['mm/fetchQycxdjtj'],
  bqqycxpmLoading: loading.effects['mm/fetchBqqycxpm'],
}))
class MarketMonitor extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'mm/fetchQycxxwfx',
      payload: {}
    });
    dispatch({
      type: 'mm/fetchSxqymd',
      payload: {}
    });
    dispatch({
      type: 'mm/fetchQycxdjtj',
      payload: {}
    });
    dispatch({
      type: 'mm/fetchBqqycxpm',
      payload: {
        currentPage: 0,
        pageSize: 10,
      }
    });
  }

  // 本期企业诚信排名翻页
  handleBqqycxpmTableChange = (pagination) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'mm/fetchBqqycxpm',
      payload: {
        currentPage: pagination.current - 1,
        pageSize: pagination.pageSize,
      }
    });
  };

  render() {

    const {
      qycxxwfxLoading,
      sxqymdLoading,
      qycxdjtjLoading,
      bqqycxpmLoading,
      mm: {
        qycxxwfx,
        sxqymd,
        bqqycxpm:{
          data,
          pagination,
        },
        qycxdjtj,
      }
    } = this.props;

    // 左右结构布局参数
    const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };



    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={qycxdjtjLoading} title="企业诚信等级统计" bodyStyle={{ height: '400px', padding: 0 }}>
              <SunburstPie
                height={400}
                data={qycxdjtj}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card loading={bqqycxpmLoading} title="本期企业诚信排名" bodyStyle={{ height: '400px', padding: '5px' }} >
              <Table
                size="large"
                scroll={{ y: 260 }}
                dataSource={data}
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
                  ...pagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  size: 'small',
                  showTotal: total => `总计 ${total} 条记录.`,
                }}
                onChange={this.handleBqqycxpmTableChange}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card loading={qycxxwfxLoading} title="企业诚信行为分析" bodyStyle={{ height: '400px', padding: 0 }}>
              <Bar data={qycxxwfx} />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="失信企业名单"
              bodyStyle={{ height: '400px', padding: '5px' }}
            >
              <Table
                loading={sxqymdLoading}
                size="large"
                rowKey="rank"
                scroll={{ y: 260 }}
                dataSource={sxqymd}
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
                  size: 'small',
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
