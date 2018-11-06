import React, { Component } from 'react';
import { connect } from 'dva';

import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './AdministrativeEfficiency.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class AdministrativeEfficiency extends Component {

  render() {

    return (
      <GridContent>
        <span>行政审批能效</span>
      </GridContent>
    );
  }
}

export default AdministrativeEfficiency;
