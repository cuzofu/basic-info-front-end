import React, { Component } from 'react';
import { connect } from 'dva';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './ConstructionEfficiency.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class ConstructionEfficiency extends Component {

  render() {

    return (
      <GridContent>
        <span>建筑业能效</span>
      </GridContent>
    );
  }
}

export default ConstructionEfficiency;
