import React, { Component } from 'react';
import { connect } from 'dva';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Credit.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class Credit extends Component {

  render() {

    return (
      <GridContent>
        <span>诚信分析</span>
      </GridContent>
    );
  }
}

export default Credit;
