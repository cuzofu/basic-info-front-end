import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Card,
  Table,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

@connect(({ search, loading }) => ({
  search,
  orgLoading: loading.effects['search/searchOrg'],
  personLoading: loading.effects['search/searchPerson'],
}))
class Search extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'search/searchOrg',
      payload: {}
    });
    dispatch({
      type: 'search/searchPerson',
      payload: {
      }
    });
  }

  renderOrgList = () => {
    const {
      search: {
        orgList,
      }
    } = this.props;

    const columnsOrgList = [
      {
        title: '名称',
        dataIndex: '企业名称',
        width: '25%',
        align: 'left',
      },
      {
        title: '类别',
        dataIndex: '企业类别',
        width: '10%',
        align: 'center',
      },
      {
        title: '机构代码',
        dataIndex: '组织机构代码',
        width: '15%',
        align: 'center',
      },
      {
        title: '地址',
        dataIndex: '办公地址',
        width: '30%',
        align: 'left',
      },
      {
        title: '诚信等级',
        dataIndex: '诚信等级',
        width: '10%',
        align: 'center',
      },
      {
        title: '详情',
        key: 'more',
        width: '10%',
        align: 'center',
        render: (_, record) => (
          <div><a href={`/corporation/${record.id}`} target="_blank">查看</a></div>
        ),
      },
    ];

    return (
      <Table
        rowKey="id"
        dataSource={orgList.data}
        pagination={{
          ...orgList.pagination,
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        columns={columnsOrgList}
        scroll={{ y: 370 }}
        onChange={this.handleOrgListChange}
      />
    );
  };

  renderPersonList = () => {
    const {
      search: {
        personList,
      }
    } = this.props;

    const columnsPersonList = [
      {
        title: '姓名',
        dataIndex: '姓名',
        key: 'name',
        width: '10%',
      },
      {
        title: '性别',
        dataIndex: '性别',
        width: '10%',
      },
      {
        title: '身份证号',
        dataIndex: '身份证号',
        width: '15%',
      },
      {
        title: '入册工龄',
        dataIndex: '入册工龄',
        width: '15%',
        align: 'center'
      },
      {
        title: '所属企业',
        dataIndex: '所属企业',
        width: '25%',
      },
      {
        title: '专业',
        dataIndex: '专业',
        width: '15%',
      },
      {
        title: '更多',
        key: 'more',
        width: '10%',
        render: (_, record) => (
          <div><a href={`/person/${record.身份证号}`} target="_blank">查看</a></div>
        ),
      },
    ];

    return (
      <Table
        rowKey="id"
        dataSource={personList.data}
        pagination={{
          ...personList.pagination,
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        columns={columnsPersonList}
        scroll={{ y: 370 }}
        onChange={this.handlePersonListChange}
      />
    );
  };

  handleOrgListChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/searchOrg',
      payload: {
        currentPage: pagination.current - 1,
        pageSize: pagination.pageSize,
      },
    });
  };

  handlePersonListChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/searchPerson',
      payload: {
        currentPage: pagination.current - 1,
        pageSize: pagination.pageSize,
      },
    });
  };

  render() {

    return (
      <GridContent>
        <Card
          style={{marginTop: '10px'}}
          title="企业"
          bodyStyle={{ maxHeight: '484px', padding: '5px 16px' }}
        >
          {this.renderOrgList()}
        </Card>
        <Card
          title="人员"
          bodyStyle={{ maxHeight: '484px', padding: '5px 16px' }}
        >
          {this.renderPersonList()}
        </Card>
      </GridContent>
    );
  }
}

export default Search;
