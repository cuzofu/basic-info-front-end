import React, { Component } from 'react';
import { connect } from 'dva';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './MarketMonitor.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class MarketMonitor extends Component {

  render() {

    return (
      <GridContent>
        <span>市场监测</span>
      </GridContent>
    );
  }
}

export default MarketMonitor;
