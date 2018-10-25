import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Tag, Timeline, Table, Icon, Avatar } from 'antd';

import {
  Pie,
} from '@/components/Charts';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import Ellipsis from '../../components/Ellipsis';

import styles from './EngAnalysis.less';
import SunburstPie from "./Pie/SunburstPie";

const { Description } = DescriptionList;

@connect(({ engAnalysis, loading }) => ({
  engAnalysis,
  basicInfoLoading: loading.effects['engAnalysis/fetchBasicInfo'],
}))
class EngAnalysis extends Component {

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: {
          id
        }
      }
    } = this.props;
    dispatch({
      type: 'engAnalysis/fetchBasicInfo',
      payload: {
        id,
      }
    });
  }

  dateFormat = (date, format) => {
    const d = moment(date);
    if (d.isValid()) {
      return d.format(format);
    }
    return '未知';
  };

  render() {

    const {
      basicInfoLoading,
      engAnalysis: {
        basicInfo,
      }
    } = this.props;

    const description = (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={3}>
          <Description term="建设地点">宜昌市</Description>
          <Description term="工程类型">房建工程</Description>
          <Description term="建筑面积">8888平方</Description>
          <Description term="招标方式">公开招标</Description>
          <Description term="中标价格">928.542126（万元）</Description>
          <Description term="政府投资项目">非政府投资项目</Description>
          <Description term="开工日期">2017-12-25</Description>
          <Description term="竣工日期">2018-04-04</Description>
          <Description term="合同价款">928.542126（万元）</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="建设规模">
            <Ellipsis tooltip lines={3}>总建设面积104695平方米，其中地上建筑面积86950平方米（住宅建筑面积81348平方米，配套公建面积5602平方米），地下建筑面积17745平方米。</Ellipsis>
          </Description>
        </DescriptionList>
      </Fragment>
    );

    // 左右结构布局参数
    const doubleCardColsProps = {sm: 24, md: 24, lg: 12, style: { marginTop: 12 }};
    const cardColsLayoutProps = {sm: 24, md: 24, lg: 12};

    // 参建方信息 栅格布局参数
    const cjfColsProps = {
      cjf: {
        xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 8
      },
      creditLevel: {
        xs: 24, sm: 24, md: 12, lg: 12, xl: 4, xxl: 4
      },
      creditRecord: {
        xs: 24, sm: 24, md: 12, lg: 12, xl: 6, xxl: 6
      },
      fzr: {
        xs: 24, sm: 24, md: 12, lg: 12, xl: 6, xxl: 6
      },
    };

    return (
      <PageHeaderWrapper
        title={
          <div>
            <p className={styles.headerTitle}>万豪公园里房地产开发项目5#楼（施工）</p>
            <div>
              <Tag color="magenta">房建工程</Tag>
              <Tag color="volcano" className={styles.headerTag}>公开招标</Tag>
            </div>
          </div>
        }
        content={description}
      >
        <Card
          className={styles.messageList}
          loading={basicInfoLoading}
          bordered={false}
          bodyStyle={{padding: '12px', minHeight: '120px'}}
        >
          <Card.Grid className={styles.messageGrid}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Icon type="message" theme="filled" style={{fontSize: '24px', color: 'green'}} />
                    <span style={{marginLeft: '12px'}}>最新消息</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>XXXXXXXXXXXXXXXX整改通知</Ellipsis>
                <div style={{textAlign: 'right'}}><span title="2018年8月1日">2018年8月1日</span></div>
              </div>
            </Card>
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Icon type="project" theme="filled" style={{fontSize: '24px', color: 'chocolate'}} />
                    <span style={{marginLeft: '12px'}}>工程概况</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>建设周期：311天</Ellipsis>
                <Ellipsis tooltip lines={1}>形象进度：主体完工</Ellipsis>
              </div>
            </Card>
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Icon type="question-circle" theme="filled" style={{fontSize: '24px', color: 'red'}} />
                    <span style={{marginLeft: '12px'}}>问题统计</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>质量问题10起，安全问题5起</Ellipsis>
                <Ellipsis tooltip lines={1}>突出问题：xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Ellipsis>
              </div>
            </Card>
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Icon type="credit-card" theme="filled" style={{fontSize: '24px', color: 'deepskyblue'}} />
                    <span style={{marginLeft: '12px'}}>诚信统计</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>诚信加分20分，共5次</Ellipsis>
                <Ellipsis tooltip lines={1}>诚信扣分5分，共1次</Ellipsis>
              </div>
            </Card>
          </Card.Grid>
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="参建方信息"
          style={{marginTop: 12}}
          bodyStyle={{padding: '12px'}}
        >
          <div>
            <Timeline style={{margin: '10px', width: '95%'}}>
              <Timeline.Item color="green">
                <Row gutter={12}>
                  <Col {...cjfColsProps.cjf}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>建设单位</span>
                      <span style={{ marginLeft: '5px' }}>宜昌国闰房地产有限公司</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.creditLevel}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>A级</span>
                      <span style={{ marginLeft: '5px' }}>388分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.creditRecord}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>加分</span>
                      <span style={{ marginRight: '5px'}}>20分</span>
                      <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white', marginLeft: '5px' }}>次数</span>
                      <span>5次</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.fzr}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>项目负责人：张三</span>
                      <span style={{ marginLeft: '5px' }}>131123456789</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="red">
                <Row gutter={12}>
                  <Col {...cjfColsProps.cjf}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>施工单位</span>
                      <span style={{ marginLeft: '5px' }}>宜昌国闰房地产有限公司</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.creditLevel}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>A级</span>
                      <span style={{ marginLeft: '5px' }}>388分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.creditRecord}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>加分</span>
                      <span style={{ marginRight: '5px'}}>20分</span>
                      <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white', marginLeft: '5px' }}>次数</span>
                      <span>5次</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.fzr}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginRight: '5px'}}>项目负责人：张三</span>
                      <span style={{ marginLeft: '5px' }}>131123456789</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
            </Timeline>
          </div>
        </Card>
        <Card title="人员履职" loading={basicInfoLoading} style={{marginTop: 12}} bordered={false} bodyStyle={{padding: '12px'}}>
          <Table
            columns={[
              {
                title: '类型',
                dataIndex: 'type',
              },
              {
                title: '姓名',
                dataIndex: 'name',
              },
              {
                title: '职责分工',
                dataIndex: 'job',
              },
              {
                title: '资格证书编号',
                dataIndex: 'zsbb',
              },
              {
                title: '检查日期',
                dataIndex: 'rq',
              },
              {
                title: '文书编号',
                dataIndex: 'gender',
              },
              {
                title: '问题说明',
                dataIndex: 'illustrate',
              },
            ]}
            dataSource={[]}
            pagination={false}
          />
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="问题分析"
          style={{marginTop: 12}}
          bodyStyle={{padding: '12px'}}
        >
          <div className={styles.issueCard}>
            <Row gutter={0}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issuePie}>
                  <SunburstPie
                    height={300}
                    data={[
                      {
                        value: 251,
                        type: '质量',
                        name: '子事例一',
                      },
                      {
                        value: 1048,
                        type: '质量',
                        name: '子事例二',
                      },
                      {
                        value: 610,
                        type: '质量',
                        name: '子事例三',
                      },
                      {
                        value: 434,
                        type: '安全',
                        name: '子事例四',
                      },
                      {
                        value: 335,
                        type: '安全',
                        name: '子事例五',
                      },
                      {
                        value: 250,
                        type: '安全',
                        name: '子事例六',
                      },
                    ]}
                  />
                </div>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issueRank}>
                  <h4 className={styles.rankingTitle}>问题列表</h4>
                  <ul className={styles.rankingList}>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>1</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">质量 行为类</span>
                      <span className={styles.rankingItemType} title="质量">质量</span>
                      <span className={styles.rankingItemType} title="行为类">行为类</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>2</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>3</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>4</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>5</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>6</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>7</span>
                      <span className={styles.rankingItemIssue} title="质量 行为类">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">安全</span>
                      <span className={styles.rankingItemType} title="行为类">施工升降机</span>
                      <span className={styles.rankingItemValue}>2次</span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="文书分析"
          style={{marginTop: 12}}
          bodyStyle={{minHeight: '300px', padding: '12px'}}
        >
          <div className={styles.issueCard}>
            <Row gutter={0}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issuePie}>
                  <Pie
                    hasLegend
                    subTitle="文书数量"
                    total={() => `${[].reduce((pre, now) => now.y + pre, 0)}件`}
                    data={[
                      {
                        x: "质量整改通知",
                        y: 3,
                      },
                      {
                        x: "安全整改通知",
                        y: 1,
                      }
                    ]}
                    valueFormat={value => `${value}件`}
                    height={248}
                    lineWidth={4}
                  />
                </div>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issueRank}>
                  <h4 className={styles.rankingTitle}>文书列表</h4>
                  <ul className={styles.rankingList}>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>1</span>
                      <span className={styles.rankingItemIssue} title="质量整改通知书">质量整改通知书</span>
                      <span className={styles.rankingItemType} title="质量">质量</span>
                      <span className={styles.rankingItemType} title="整改通知书">整改通知书</span>
                      <span className={styles.rankingItemValue}>2件</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>2</span>
                      <span className={styles.rankingItemIssue} title="安全整改通知书">安全整改通知书</span>
                      <span className={styles.rankingItemType} title="安全">安全</span>
                      <span className={styles.rankingItemType} title="整改通知书">整改通知书</span>
                      <span className={styles.rankingItemValue}>2件</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>3</span>
                      <span className={styles.rankingItemIssue} title="质量局部停工通知书">质量局部停工通知书</span>
                      <span className={styles.rankingItemType} title="质量">质量</span>
                      <span className={styles.rankingItemType} title="局部停工通知书">局部停工通知书</span>
                      <span className={styles.rankingItemValue}>2件</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>4</span>
                      <span className={styles.rankingItemIssue} title="xxxxxxxx">xxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="其他">其他</span>
                      <span className={styles.rankingItemType} title="其他">其他</span>
                      <span className={styles.rankingItemValue}>2件</span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default EngAnalysis;
