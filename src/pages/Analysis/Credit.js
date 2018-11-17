import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Row,
  Col,
  Card,
} from 'antd';

import { Pie } from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './Credit.less';

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class Credit extends Component {

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6,
    };

    return (
      <GridContent>
        <Row gutter={6}>
          <Col {...topColResponsiveProps}>
            <Card title="诚信企业总数" bodyStyle={{ paddingBottom: '8px' }}>
              <div className={styles.topNumber}>
                <p>1000</p>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="诚信A级总数" bodyStyle={{ paddingBottom: '8px' }}>
              <div className={styles.topNumber}>
                <p>800</p>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="诚信B级总数" bodyStyle={{ paddingBottom: '8px' }}>
              <div className={styles.topNumber}>
                <p>197</p>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="诚信C级总数" bodyStyle={{ paddingBottom: '8px' }}>
              <div className={styles.topNumber}>
                <p>3</p>
              </div>
            </Card>
          </Col>
        </Row>
        <Card title="企业本地外地占比图" bodyStyle={{ padding: 5 }} style={{marginTop: 12}}>
          <Row gutter={5}>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{padding: 0}}>
                <div style={{backgroundColor: '#FCFCFC'}}>
                  <p style={{textAlign: 'center'}}>全部企业</p>
                  <Pie percent={59.58} subTitle="本地企业" total="59.58%" height={140} />
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{padding: 0}}>
                <p style={{textAlign: 'center'}}>A级企业</p>
                <Pie percent={66.32} subTitle="本地企业" total="66.32%" height={140} />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{padding: 0}}>
                <p style={{textAlign: 'center'}}>B级企业</p>
                <Pie percent={44.59} subTitle="本地企业" total="44.59%" height={140} />
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card bodyStyle={{padding: 0}}>
                <p style={{textAlign: 'center'}}>C级企业</p>
                <Pie percent={100} subTitle="本地企业" total="100%" height={140} />
              </Card>
            </Col>
          </Row>
        </Card>
      </GridContent>
    );
  }
}

export default Credit;
