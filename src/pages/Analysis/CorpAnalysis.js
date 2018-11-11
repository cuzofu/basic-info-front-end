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

const dateFormat = (date, format) => {
  const d = moment(date);
  if (d.isValid()) {
    return d.format(format);
  }
  return '未知';
};

// 左右结构布局参数
const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };

@connect(({ corpAnalysis, loading }) => ({
  corpAnalysis,
  basicInfoLoading: loading.effects['corpAnalysis/fetchBasicInfo'],
  zxxxLoading: loading.effects['corpAnalysis/fetchZxxx'],
  cjqkLoading: loading.effects['corpAnalysis/fetchCjqk'],
  blxwtjLoading: loading.effects['corpAnalysis/fetchBlxwtj'],
  cxtjLoading: loading.effects['corpAnalysis/fetchCxtj'],
  blxwkfLoading: loading.effects['corpAnalysis/fetchBlxwkf'],
  wtlbLoading: loading.effects['corpAnalysis/fetchWtlb'],
  gcgmfxLoading: loading.effects['corpAnalysis/fetchGcgmfx'],
  gcgmfxlbLoading: loading.effects['corpAnalysis/fetchGcgmfxlb'],
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
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchZxxx',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchCjqk',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchBlxwtj',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchCxtj',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchBlxwkf',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchWtlb',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchGcgmfx',
      payload: {
        key: id
      }
    });
    dispatch({
      type: 'corpAnalysis/fetchGcgmfxlb',
      payload: {
        key: id
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

  renderCorpTitleInfo = () => {
    const {
      corpAnalysis: {
        basicInfo: {
          glsj = '-',
          jcxxMx = '{}',
        },
      }
    } = this.props;
    const {
      企业类型 = '-',
      企业类别 = '-',
    } = JSON.parse(jcxxMx);
    return (
      <div>
        <p className={styles.headerTitle}>{glsj}</p>
        <div>
          {企业类型 ? (<Tag color="magenta">{企业类型}</Tag>) : null}
          {企业类别 ? (<Tag color="volcano" className={styles.headerTag}>{企业类别}</Tag>) : null}
        </div>
      </div>
    )
  };

  renderDescription = () => {

    const {
      corpAnalysis: {
        basicInfo: {
          jcxxMx = '{}',
        },
      }
    } = this.props;
    const {
      经营范围 = '-',
      办公地址 = '-',
      日常联系人 = '-',
      日常联系电话 = '-',
      联系手机 = '-',
      传真 = '-',
      办公所在地行政区划 = '-',
    } = JSON.parse(jcxxMx);
    return (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={4}>
          <Description term="联系人">{日常联系人}</Description>
          <Description term="电话">{日常联系电话}</Description>
          <Description term="手机">{联系手机}</Description>
          <Description term="传真">{传真}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col={2}>
          <Description term="办公所在地">{办公所在地行政区划}</Description>
          <Description term="办公地址">{办公地址}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="经营范围">
            <Ellipsis tooltip lines={3}>{经营范围}</Ellipsis>
          </Description>
        </DescriptionList>
      </Fragment>
    );
  };

  renderZxxx = () => {
    const {
      zxxxLoading,
      corpAnalysis: {
        zxxx,
      }
    } = this.props;

    let content = (
      <div>
        <Ellipsis tooltip lines={1}>暂无消息</Ellipsis>
        <div style={{textAlign: 'right'}}><span title="2018年8月1日">{dateFormat(Date.now(), 'YYYY日MM月DD日')}</span></div>
      </div>
    );
    if (zxxx.length > 0) {
      const {
        yjms,
        time,
      } = zxxx[0];
      content = (
        <div>
          <Ellipsis tooltip lines={1}>{`${yjms}`}</Ellipsis>
          <div style={{textAlign: 'right'}}><span title="2018年8月1日">{dateFormat(time, 'YYYY日MM月DD日')}</span></div>
        </div>
      )
    }
    return (
      <Card loading={zxxxLoading} bodyStyle={{ padding: 0 }} bordered={false}>
        <Card.Meta
          title={
            <div className={styles.cardTitle}>
              <Icon type="message" theme="filled" style={{fontSize: '24px', color: 'green'}} />
              <span style={{marginLeft: '12px'}}>最新消息</span>
            </div>
          }
        />
        <div style={{paddingTop: '12px'}}>
          {content}
        </div>
      </Card>
    );
  };

  renderCjqk = () => {
    const {
      cjqkLoading,
      corpAnalysis: {
        cjqk: {
          sumNum = 0,
          wanCheng = 0,
          weiGui = 0,
          zaiJian = 0,
        },
      }
    } = this.props;

    return (
      <Card loading={cjqkLoading} bodyStyle={{ padding: 0 }} bordered={false}>
        <Card.Meta
          title={
            <div className={styles.cardTitle}>
              <Icon type="project" theme="filled" style={{fontSize: '24px', color: 'chocolate'}} />
              <span style={{marginLeft: '12px'}}>参建情况</span>
            </div>
          }
        />
        <div style={{paddingTop: '12px'}}>
          <Ellipsis tooltip lines={1}>承建项目：{sumNum}个</Ellipsis>
          <Ellipsis tooltip lines={1}>在建：{wanCheng}个，完工：{weiGui}个，停工{zaiJian}个</Ellipsis>
        </div>
      </Card>
    );
  };

  renderBlxwtj = () => {
    const {
      blxwtjLoading,
      corpAnalysis: {
        blxwtj
      }
    } = this.props;
    let content = (
      <div>
        <Ellipsis tooltip lines={1}>扣分0分，共0次</Ellipsis>
        <Ellipsis tooltip lines={1}>暂无不良行为记录</Ellipsis>
      </div>
    );
    if (blxwtj && blxwtj.length > 0) {
      const {
        wtType = '无',
        ciShu = 0,
        sum = 0,
      } = blxwtj[0];
      content = (
        <div>
          <Ellipsis tooltip lines={1}>扣分{sum}分，共{ciShu}次</Ellipsis>
          <Ellipsis tooltip lines={1}>突出问题：{wtType}</Ellipsis>
        </div>
      );
    }
    return (
      <Card loading={blxwtjLoading} bodyStyle={{ padding: 0 }} bordered={false}>
        <Card.Meta
          title={
            <div className={styles.cardTitle}>
              <Icon type="question-circle" theme="filled" style={{fontSize: '24px', color: 'red'}} />
              <span style={{marginLeft: '12px'}}>不良行为统计</span>
            </div>
          }
        />
        <div style={{paddingTop: '12px'}}>{content}</div>
      </Card>
    );
  };

  renderCxtj = () => {
    const {
      cxtjLoading,
      corpAnalysis: {
        cxtj: {
          jiaFen = '',
          jianFen = '',
        },
      }
    } = this.props;
    return (
      <Card loading={cxtjLoading} bodyStyle={{ padding: 0 }} bordered={false}>
        <Card.Meta
          title={
            <div className={styles.cardTitle}>
              <Icon type="credit-card" theme="filled" style={{fontSize: '24px', color: 'deepskyblue'}} />
              <span style={{marginLeft: '12px'}}>诚信统计</span>
            </div>
          }
        />
        <div style={{paddingTop: '12px'}}>
          <Ellipsis tooltip lines={1}>{jiaFen}</Ellipsis>
          <Ellipsis tooltip lines={1}>{jianFen}</Ellipsis>
        </div>
      </Card>
    );
  };

  renderYjtx = () => {
    const {
      corpAnalysis: {
        zxxx,
      }
    } = this.props;
    if (zxxx.length <= 0) {
      return (<div>暂无消息</div>)
    }

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
      <div style={{height: 276, overflowY: 'auto'}}>
        <Timeline style={{margin: '10px', width: '95%'}}>
          {
            zxxx.map(r => {

              let color = '#FC0';
              switch (r.type) {
                case '证书预警':
                  color = '#FC0';
                  break;
                case '诚信加分':
                  color = 'green';
                  break;
                case '诚信扣分':
                  color = 'red';
                  break;
                case '人员预警':
                  color = '#FC0';
                  break;
                default:
                  color = '#FC0';
                  break;
              }
              return (
                <Timeline.Item color={color}>
                  <Row gutter={12}>
                    <Col {...cjfColsProps.alertType}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <Icon type="exclamation-circle" theme="filled" style={{color}} />
                        <span style={{marginLeft: '10px', color}}>{r.type}</span>
                      </div>
                    </Col>
                    <Col {...cjfColsProps.alertMessage}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span>{r.yjms}</span>
                      </div>
                    </Col>
                    <Col {...cjfColsProps.alertDate}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span>{r.time}</span>
                      </div>
                    </Col>
                  </Row>
                </Timeline.Item>
              );
            })
          }
        </Timeline>
      </div>
    );
  };

  render() {

    const {
      basicInfoLoading,
      blxwkfLoading,
      wtlbLoading,
      gcgmfxLoading,
      gcgmfxlbLoading,
      corpAnalysis: {
        blxwkf,
        wtlb,
        gcgmfx,
        gcgmfxlb,
      }
    } = this.props;

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
        title={this.renderCorpTitleInfo()}
        content={this.renderDescription()}
      >
        <Card
          className={styles.messageList}
          loading={basicInfoLoading}
          bordered={false}
          bodyStyle={{padding: '12px', minHeight: '120px'}}
        >
          <Card.Grid className={styles.messageGrid}>
            {this.renderZxxx()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderCjqk()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderBlxwtj()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderCxtj()}
          </Card.Grid>
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="预警提醒"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          {this.renderYjtx()}
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={blxwkfLoading}
              bordered={false}
              title="不良行为扣分"
              style={{marginTop: 12}}
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <div className={styles.issuePie}>
                <CustomPie
                  hasLegend
                  subTitle="扣分次数"
                  total={() => `${blxwkf.reduce((pre, now) => now.y + pre, 0)}次`}
                  data={blxwkf}
                  valueFormat={value => `${value}次`}
                  height={248}
                  lineWidth={4}
                />
              </div>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={wtlbLoading}
              bordered={false}
              title="问题列表"
              style={{marginTop: 12}}
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <div className={styles.issueCard}>
                <div className={styles.issueRank}>
                  {
                    wtlb && wtlb.length > 0 ? (
                      <ul className={styles.rankingList}>
                        {wtlb.map((r, index) => (
                          <li key={r.wtType+r.wtTypeNum}>
                            {
                              index < 3 ?
                                (<span className={`${styles.rankingItemNumber} ${styles.active}`}>{index+1}</span>)
                                :
                                (<span className={`${styles.rankingItemNumber}`}>{index+2}</span>)
                            }
                            <span className={styles.rankingItemIssue} title={r.wtType}>{r.wtType}</span>
                            <span className={styles.rankingItemType} title={r.wtTypeXW}>{r.wtTypeXW}</span>
                            <span className={styles.rankingItemValue}>{r.wtTypeNum}个</span>
                          </li>
                        ))}
                      </ul>
                    ) : (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>)
                  }
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={gcgmfxLoading}
              bordered={false}
              title="承建工程规模分析"
              style={{marginTop: 12}}
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <CustomPie
                hasLegend
                subTitle="总数量"
                total={() => `${gcgmfx.reduce((pre, now) => now.y + pre, 0)}个`}
                data={gcgmfx}
                valueFormat={value => `${value}个`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={gcgmfxlbLoading}
              bordered={false}
              title="工程列表"
              style={{marginTop: 12}}
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <Table
                loading={gcgmfxlbLoading}
                size="small"
                scroll={{ y: 180 }}
                dataSource={gcgmfxlb.list}
                columns={[
                  {
                    title: '序号',
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
                  ...gcgmfxlb.pagination,
                  pageSizeOptions: ['10', '20', '50'],
                  showSizeChanger: true,
                  showTotal: total => `总计 ${total} 个工程.`,
                }}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default CorpAnalysis;
