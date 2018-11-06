import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Card,
  Table,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Search.less';

@connect(({ search, loading }) => ({
  search,
  loading: loading.effects['search/fetch'],
}))
class Search extends Component {

  render() {

    const columnsPersonList = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: '10%',
      },
      {
        title: '证件号码',
        dataIndex: 'idCard',
        key: 'idCard',
        width: '30%',
      },
      {
        title: '所在企业',
        dataIndex: 'engName',
        key: 'engName',
        width: '40%',
      },
      {
        title: '更多',
        key: 'more',
        width: '10%',
        render: (_, record) => (
          <div><a href={`/person/${record.id}`} target="_blank">查看</a></div>
        ),
      },
    ];

    const columnsOrgList = [
      {
        title: '名称',
        dataIndex: 'orgName',
      },
      {
        title: '类型',
        dataIndex: 'gender',
      },
      {
        title: '统一编码',
        dataIndex: 'unicode',
      },
      {
        title: '地址',
        dataIndex: 'idCard',
      },
      {
        title: '诚信',
        dataIndex: 'credit',
      },
      {
        title: '详情',
        key: 'more',
      },
    ];

    return (
      <GridContent>
        <Card
          title="人员"
          bodyStyle={{ maxHeight: '484px', padding: '5px 16px' }}
        >
          <Table
            rowKey="id"
            dataSource={[
              {
                id: '420500197501270015',
                name: '陈亮',
                gender: '男',
                idCard: '420581198501180039',
                engName: '湖北升思科技股份有限公司',
              }
            ]}
            columns={columnsPersonList}
            scroll={{ y: 420 }}
          />
        </Card>
        <Card
          style={{marginTop: '10px'}}
          title="企业"
          bodyStyle={{ maxHeight: '484px', padding: '5px 16px' }}
        >
          <Table
            rowKey="id"
            dataSource={[]}
            columns={columnsOrgList}
            scroll={{ y: 420 }}
          />
        </Card>
      </GridContent>
    );
  }
}

export default Search;
