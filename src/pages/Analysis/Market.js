import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Divider,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';

import styles from './Market.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class Market extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'analysis/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 12 },
    };

    // 左右结构布局参数
    const doubleCardColsProps = {lg: 24, xl: 12, style: { marginBottom: 12 }};

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Card
              title="企业入库数量"
              bodyStyle={{paddingBottom: '8px'}}
            >
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>1500</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>200</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '12px 0'}} />
              <div style={{textAlign: 'center'}}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              title="活跃企业数量"
              bodyStyle={{paddingBottom: '8px'}}
            >
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标企业数量</p>
                    <p className={styles.topNumber}>300</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标企业数量</p>
                    <p className={styles.topNumber}>200</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '12px 0'}} />
              <div style={{textAlign: 'center'}}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              title="人员入库数量"
              bodyStyle={{paddingBottom: '8px'}}
            >
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>总数量</p>
                    <p className={styles.topNumber}>80000</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>新增数量</p>
                    <p className={styles.topNumber}>2000</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '12px 0'}} />
              <div style={{textAlign: 'center'}}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>增加率</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              title="活跃人员数量"
              bodyStyle={{paddingBottom: '8px'}}
            >
              <div>
                <Row>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>投标人员数量</p>
                    <p className={styles.topNumber}>3000</p>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <p className={styles.item}>中标人员数量</p>
                    <p className={styles.topNumber}>800</p>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '12px 0'}} />
              <div style={{textAlign: 'center'}}>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="up" reverseColor style={{ padding: '0 12px' }}>
                  <span>占比</span>
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="建筑规模与活跃企业诚信等级分析"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="标段与企业明细"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业诚信等级占比"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业活跃度排名"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业资质分析"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="企业资质明细"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="人员资质分析"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="人员活跃度排名"
              bodyStyle={{minHeight: '300px'}}
            />
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Market;
