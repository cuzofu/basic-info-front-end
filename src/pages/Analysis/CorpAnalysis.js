import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Tag, Timeline, Table, Icon } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import Ellipsis from '@/components/Ellipsis';
import {
  CustomPie,
} from '@/components/Charts';
import styles from './CorpAnalysis.less';

const { Description } = DescriptionList;

@connect(({ corpAnalysis, loading }) => ({
  corpAnalysis,
  basicInfoLoading: loading.effects['corpAnalysis/fetchBasicInfo'],
}))
class CorpAnalysis extends Component {

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
      type: 'corpAnalysis/fetchBasicInfo',
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
      corpAnalysis: {
        basicInfo,
      }
    } = this.props;

    const description = (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={4}>
          <Description term="联系人">张三</Description>
          <Description term="电话">0717-6623595</Description>
          <Description term="手机">13123456789</Description>
          <Description term="传真">0717-6623595</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col={2}>
          <Description term="办公所在地">湖北省_宜昌市_西陵区</Description>
          <Description term="办公地址">湖北省宜昌市高新区兰台路13号1号楼</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="经营范围">
            <Ellipsis tooltip lines={3}>房屋建筑工程施工总承包壹级可承担单项建安合同额不超过企业注册资本金5倍的下列房屋建筑工程的施工：（1）40层以下、各类跨度的房屋建筑工程；（2）高度240米及以下的构筑物；（3）建筑面积20万平方米及以下的住宅小区或建筑群体。建筑装修装饰工程专业总承包叁级可承担单位工程造价60万元及以下建筑室内、室外装修装饰工程（建筑幕墙工程除外）的施工。</Ellipsis>
          </Description>
        </DescriptionList>
      </Fragment>
    );

    // 参建方信息 栅格布局参数
    const cjfColsProps = {
      alertType: {
        xs: 24, sm: 24, md: 6, lg: 6, xl: 6, xxl: 6
      },
      alertMessage: {
        xs: 24, sm: 24, md: 14, lg: 14, xl: 14, xxl: 14
      },
      alertDate: {
        xs: 24, sm: 24, md: 4, lg: 4, xl: 4, xxl: 4
      },
    };

    return (
      <PageHeaderWrapper
        title={
          <div>
            <p className={styles.headerTitle}>湖北升思科技股份有限公司</p>
            <div>
              <Tag color="magenta">本地企业</Tag>
              <Tag color="volcano" className={styles.headerTag}>建筑业企业</Tag>
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
                <Ellipsis tooltip lines={1}>XXXXXXXXXXXXXXXX不良行为扣分</Ellipsis>
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
                    <span style={{marginLeft: '12px'}}>参建情况</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>承建项目：10个</Ellipsis>
                <Ellipsis tooltip lines={1}>在建：5个，完工：4个，停工1个</Ellipsis>
              </div>
            </Card>
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Icon type="question-circle" theme="filled" style={{fontSize: '24px', color: 'red'}} />
                    <span style={{marginLeft: '12px'}}>不良行为统计</span>
                  </div>
                }
              />
              <div style={{paddingTop: '12px'}}>
                <Ellipsis tooltip lines={1}>扣分15分，共5次</Ellipsis>
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
          title="预警提醒"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          <div style={{height: 276, overflowY: 'auto'}}>
            <Timeline style={{margin: '10px', width: '95%'}}>
              <Timeline.Item color="#FC0">
                <Row gutter={12}>
                  <Col {...cjfColsProps.alertType}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <Icon type="exclamation-circle" theme="filled" style={{color: '#FC0'}} />
                      <span style={{marginLeft: '10px', color: '#FC0'}}>资质证书到期</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertMessage}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>D123456789    建筑业企业资质_施工总承包_建筑工程_壹级</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertDate}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>2018年10月8日</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="red">
                <Row gutter={12}>
                  <Col {...cjfColsProps.alertType}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <Icon type="close-circle" theme="filled" style={{color: 'red'}} />
                      <span style={{marginLeft: '10px', color: 'red'}}>诚信扣分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertMessage}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>xxxxxxxxxxx扣分：5分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertDate}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>2018年10月1日</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
              <Timeline.Item color="green">
                <Row gutter={12}>
                  <Col {...cjfColsProps.alertType}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <Icon type="check-circle" theme="filled" style={{color: 'green'}} />
                      <span style={{marginLeft: '10px', color: 'green'}}>诚信加分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertMessage}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>xxxxxxxxxxx加分：5分</span>
                    </div>
                  </Col>
                  <Col {...cjfColsProps.alertDate}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span>2018年9月1日</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
            </Timeline>
          </div>
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="不良行为扣分"
          style={{marginTop: 12}}
          bodyStyle={{minHeight: '300px', padding: '12px'}}
        >
          <div className={styles.issueCard}>
            <Row gutter={0}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issuePie}>
                  <CustomPie
                    hasLegend
                    subTitle="扣分次数"
                    total={() => `${[].reduce((pre, now) => now.y + pre, 0)}次`}
                    data={[
                      {
                        x: "质量安全建筑节能管理",
                        y: 2,
                      },
                      {
                        x: "市场行为管理",
                        y: 2,
                      },
                      {
                        x: "其他",
                        y: 1,
                      }
                    ]}
                    valueFormat={value => `${value}次`}
                    height={248}
                    lineWidth={4}
                  />
                </div>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issueRank}>
                  <h4 className={styles.rankingTitle}>问题列表</h4>
                  <ul className={styles.rankingList}>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>1</span>
                      <span className={styles.rankingItemIssue} title="xxxxxxxxxxxxxxxxx">xxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">质量安全建筑节能管理</span>
                      <span className={styles.rankingItemValue}>2个</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>2</span>
                      <span className={styles.rankingItemIssue} title="xxxxxxxxxxxxxxxxx">xxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">市场行为管理</span>
                      <span className={styles.rankingItemValue}>1个</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber} ${styles.active}`}>3</span>
                      <span className={styles.rankingItemIssue} title="xxxxxxxxxxxxxxxxx">xxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">市场行为管理</span>
                      <span className={styles.rankingItemValue}>1个</span>
                    </li>
                    <li>
                      <span className={`${styles.rankingItemNumber}`}>4</span>
                      <span className={styles.rankingItemIssue} title="xxxxxxxxxxxxxxxxx">xxxxxxxxxxxxxxxxx</span>
                      <span className={styles.rankingItemType} title="质量">其他</span>
                      <span className={styles.rankingItemValue}>1个</span>
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
          title="承建工程规模分析"
          style={{marginTop: 12}}
          bodyStyle={{minHeight: '300px', padding: '12px'}}
        >
          <div className={styles.issueCard}>
            <Row gutter={0}>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <div className={styles.issuePie}>
                  <CustomPie
                    hasLegend
                    subTitle="总数量"
                    total={() => `${[].reduce((pre, now) => now.y + pre, 0)}个`}
                    data={[
                      {
                        x: "2万㎡或5000万以上",
                        y: 3,
                      },
                      {
                        x: "1万㎡或3000万以上",
                        y: 3,
                      },
                      {
                        x: "3000㎡或1000万以上",
                        y: 5,
                      },
                      {
                        x: "3000㎡或1000万以下",
                        y: 1,
                      },
                      {
                        x: "其他",
                        y: 0,
                      }
                    ]}
                    valueFormat={value => `${value}个`}
                    height={248}
                    lineWidth={4}
                  />
                </div>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Table
                  loading={basicInfoLoading}
                  size="small"
                  scroll={{ y: 180 }}
                  dataSource={[
                    {
                      key: '1',
                      index: 1,
                      engType: '房建工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 12562,
                    },
                    {
                      key: '2',
                      index: 2,
                      engType: '市政工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 8869,
                      rate: '20%',
                    },
                    {
                      key: '3',
                      index: 3,
                      engType: '房建工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 3150,
                    },
                    {
                      key: '4',
                      index: 4,
                      engType: '房建工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 1728,
                    },
                    {
                      key: '5',
                      index: 5,
                      engType: '房建工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 1000,
                    },
                    {
                      key: '6',
                      index: 6,
                      engType: '市政工程',
                      engName: 'xxxxxxxxxxxxxxxxxxxxxxxx工程',
                      investment: 808,
                    },
                  ]}
                  columns={[
                    {
                      title: '排名',
                      dataIndex: 'index',
                      width: '10%',
                    },
                    {
                      title: '类型',
                      dataIndex: 'engType',
                      width: '20%',
                    },
                    {
                      title: '工程名称',
                      dataIndex: 'engName',
                      width: '50%',
                    },
                    {
                      title: '投资额',
                      dataIndex: 'investment',
                      width: '20%',
                    },
                  ]}
                  pagination={{
                    pageSize: 5,
                    total: 6,
                    current: 1,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: total => `Total ${total} items.`,
                  }}
                />
              </Col>
            </Row>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CorpAnalysis;
