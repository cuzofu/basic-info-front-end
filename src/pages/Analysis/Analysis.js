import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class Analysis extends Component {

  handleTabChange = key => {
    const { match } = this.props;
    router.push(`${match.url}/${key}`);
  };

  render() {

    const { match, children, location } = this.props;

    const tabList = [
      {
        key: 'market',
        tab: '市场分析',
      },
      {
        key: 'construction',
        tab: '建筑业分析',
      },
      {
        key: 'badBehavior',
        tab: '不良行为',
      },
      {
        key: 'intendance',
        tab: '质量安全监督',
      },
      {
        key: 'bidding',
        tab: '招投标',
      },
      {
        key: 'contract',
        tab: '合同',
      },
      {
        key: 'mm',
        tab: '市场监测',
      },
      {
        key: 'ce',
        tab: '建筑业能效',
      },
      {
        key: 'ae',
        tab: '行政审批能效',
      },
      {
        key: 'search',
        tab: '企业人员搜索',
      },
    ];

    return (
      <PageHeaderWrapper
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Analysis;
