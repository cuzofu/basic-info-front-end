import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Card,
  Table,
  Radio,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

const EngType = ['招投标', '施工合同', '施工许可', '质量安全监督'];

@connect(({ search, loading }) => ({
  search,
  engLoading: loading.effects['search/searchEng'],
}))
class Search extends Component {

  state = {
    engType: '招投标',
  };

  componentDidMount() {
    const {dispatch} = this.props;

    const {
      engType,
    } = this.state;

    dispatch({
      type: 'search/searchEng',
      payload: {
        type: engType,
      }
    });
  }

  renderEngList = () => {
    const {
      engListLoading,
      search: {
        engList,
      }
    } = this.props;

    console.log(engList);
    const {
      engType,
    } = this.state;

    let columns = [];
    const columnsZTBList = [
      {
        title: '标段名称',
        dataIndex: '标段名称',
        key: 'name',
        width: '20%',
      },
      {
        title: '工程地址',
        dataIndex: '工程地址',
        width: '20%',
      },
      {
        title: '招标方式',
        dataIndex: '招标组织形式',
        width: '10%',
      },
      {
        title: '建设单位',
        dataIndex: '建设单位',
        width: '15%',
        align: 'center'
      },
      {
        title: '工程类型',
        dataIndex: '工程类型',
        width: '10%',
      },
      {
        title: '中标机构',
        dataIndex: '中标机构',
        width: '15%',
      },
      {
        title: '中标金额',
        dataIndex: '中标金额',
        width: '10%',
      },
    ];
    const columnsSGXKList = [
      {
        title: '工程名称',
        dataIndex: '工程名称',
        width: 200,
      },
      {
        title: '许可证号',
        dataIndex: '施工许可证号',
        width: 200,
      },
      {
        title: '工程类型',
        dataIndex: '工程类型',
        width: 100,
      },
      {
        title: '建设地点',
        dataIndex: '建设地点',
        width: 200,
      },
      {
        title: '开工日期',
        dataIndex: '开工日期',
        width: 150,
      },
      {
        title: '建设单位',
        dataIndex: '建设单位名称',
        width: 200,
      },
      {
        title: '施工单位',
        dataIndex: '施工总承包名称',
        width: 200,
      },
      {
        title: '监理单位',
        dataIndex: '监理单位名称',
        width: 200,
      },
      {
        title: '竣工日期',
        dataIndex: '竣工日期',
        width: 150,
      },
      {
        title: '合同价款',
        dataIndex: '合同价款',
        width: 150,
      },
    ];

    const columnsJDGCList = [
      {
        title: '工程名称',
        dataIndex: '工程名称',
        width: 200,
      },
      {
        title: '工程地址',
        dataIndex: '工程地址',
        width: 200,
      },
      {
        title: '工程概况',
        dataIndex: '工程概况',
        width: 100,
        align: 'center',
      },
      {
        title: '工程类型',
        dataIndex: '工程类型',
        width: 150,
        align: 'center',
      },
      {
        title: '建设单位',
        dataIndex: '建设单位名称',
        width: 200,
      },
      {
        title: '施工单位',
        dataIndex: '施工单位名称',
        width: 200,
      },
      {
        title: '监理单位',
        dataIndex: '监理单位名称',
        width: 200,
      },
      {
        title: '报建日期',
        dataIndex: '报建日期',
        width: 150,
        align: 'center',
      },
      {
        title: '计划开工日期',
        dataIndex: '计划开工日期',
        width: 150,
        align: 'center',
      },
      {
        title: '计划竣工日期',
        dataIndex: '计划竣工日期',
        width: 150,
        align: 'center',
      },
    ];

    switch (engType) {
      case '招投标':
        columns = columnsZTBList;
        break;
      case '施工许可':
        columns = columnsSGXKList;
        break;
      case '质量安全监督':
        columns = columnsJDGCList;
        break;
      default:
        break;
    }

    const scrollX = columns.reduce((pre, now) => pre + now.width, 0);

    const pagination = engList.pagination && {
      ...engList.pagination,
      pageSizeOptions: ['10', '20', '50'],
      showQuickJumper: true,
      showSizeChanger: true,
      position: 'top',
      showTotal: total => `总计 ${total} 个工程.`,
    };

    return (
      <Table
        loading={engListLoading}
        rowKey="id"
        dataSource={engList.data}
        pagination={pagination}
        columns={columns}
        scroll={{ x: scrollX, y: 486 }}
        onChange={this.handleEngListChange}
      />
    );
  };

  handleChangeEngType = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'search/searchEng',
      payload: {
        type: e.target.value,
      },
    });
    this.setState({
      engType: e.target.value,
    });
  };

  handleEngListChange = (pagination) => {
    const { dispatch } = this.props;
    const { engType } = this.state;
    dispatch({
      type: 'search/searchEng',
      payload: {
        currentPage: pagination.current - 1,
        pageSize: pagination.pageSize,
        type: engType,
      },
    });
  };

  render() {

    const {
      engType,
    } = this.state;

    return (
      <GridContent>
        <Card
          title={
            <div>
              <Radio.Group defaultValue={engType} buttonStyle="solid" onChange={this.handleChangeEngType}>
                {EngType.map(t => (<Radio.Button key={t} value={t}>{t}</Radio.Button>))}
              </Radio.Group>
            </div>
          }
          bodyStyle={{ maxHeight: '600px', padding: '5px 16px' }}
        >
          {this.renderEngList()}
        </Card>
      </GridContent>
    );
  }
}

export default Search;
