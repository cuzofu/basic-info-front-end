import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect()
class Analysis extends Component {

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'market':
        router.push(`${match.url}/market`);
        break;
      case 'construction':
        router.push(`${match.url}/construction`);
        break;
      case 'credit':
        router.push(`${match.url}/credit`);
        break;
      case 'badBehavior':
        router.push(`${match.url}/badBehavior`);
        break;
      case 'intendance':
        router.push(`${match.url}/intendance`);
        break;
      default:
        router.push(`${match.url}/market`);
        break;
    }
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
        key: 'credit',
        tab: '诚信分析',
      },
      {
        key: 'badBehavior',
        tab: '不良行为分析',
      },
      {
        key: 'intendance',
        tab: '质量安全监督',
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
