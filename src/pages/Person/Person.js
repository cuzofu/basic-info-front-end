import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { DataSet } from '@antv/data-set';
import { Row, Col, Card, Tag, Timeline } from 'antd';
import Gallery from 'react-grid-gallery';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { Map, Marker, InfoWindow } from 'react-bmap';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import JobPie from './JobPie';

import styles from './Person.less';

const { Description } = DescriptionList;

@connect(({ person, loading }) => ({
  person,
  basicInfoLoading: loading.effects['person/fetchBasicInfo'],
  creditLoading: loading.effects['person/fetchCredit'],
  engListLoading: loading.effects['person/fetchEngList'],
  workListLoading: loading.effects['person/fetchWorkList'],
  jobListLoading: loading.effects['person/fetchJobList'],
  ryzjListLoading: loading.effects['person/fetchRyzjList'],
}))
class Person extends Component {

  state = {
    infoWindow: null,
  };

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
      type: 'person/fetchBasicInfo',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'person/fetchCredit',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'person/fetchEngList',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'person/fetchWorkList',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'person/fetchJobList',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'person/fetchRyzjList',
      payload: {
        key: id,
      }
    });
  }

  handleMarkerClick = (marker, item) => {
    this.setState({
      infoWindow: this.renderInfoWindow(item),
    });
  };

  renderInfoWindow = (props) => {
    if (props) {
      return (
        <InfoWindow
          position={{lng: props.lng, lat: props.lat}}
          title={props.sgxkName}
          text={
            `<div><div>${props.job}</div><div>${props.jsdw}</div></div>`
          }
        />
      );
    }
    return null;
  };

  dateFormat = (date, format, defaultRtn = '未知') => {
    const d = moment(date);
    if (d.isValid()) {
      return d.format(format);
    }
    return defaultRtn;
  };

  setCustomTags = i => i.tags.map(t => (
    <div
      key={t.value}
      style={{
        wordWrap: 'break-word',
        display: 'inline-block',
        backgroundColor: 'white',
        height: 'auto',
        fontSize: '75%',
        fontWeight: '600',
        lineHeight: '1',
        padding: '.2em .6em .3em',
        borderRadius: '.25em',
        color: 'black',
        verticalAlign: 'baseline',
        margin: '2px',
      }}
    >
      {t.title}
    </div>
  ));

  // 个人证书数据
  renderCertificateData = (certificate) => {
    if (certificate && certificate.length > 0) {
      return (
        <Timeline style={{margin: '6px', width: '90%'}}>
          {
            certificate.filter( c => {
              const {
                mx = '{}'
              } = c;
              try {
                const {
                  证书状态 = '',
                } = JSON.parse(mx);
                return 证书状态 !== '注销';
              } catch (e) {
                return false;
              }
            }).map( cert => {
              const {
                id,
                mx = '{}'
              } = cert;
              const {
                证书类型 = '',
              } = JSON.parse(mx);
              return <Timeline.Item key={id}>{证书类型}</Timeline.Item>;
            })
          }
        </Timeline>
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 个人证书数量
  renderCertificateCount = (certificate) => {
    if (certificate && certificate.length > 0) {
      return certificate.filter( c => {
        const {
          mx = '{}'
        } = c;
        try {
          const {
            证书状态 = '',
          } = JSON.parse(mx);
          return 证书状态 !== '注销';
        } catch (e) {
          return false;
        }
      }).length;
    }
    return 0;
  };

  renderCreditLevel = (credit) => {
    const {
      jcxxMx = "{}"
    } = credit;
    try {
      const {
        诚信等级 = '未知',
      } = JSON.parse(jcxxMx);
      return 诚信等级;
    } catch (e) {
      return '未知';
    }
  };

  renderCreditScore = (credit) => {
    const {
      jcxxMx = "{}"
    } = credit;
    try {
      const {
        诚信分 = '-',
      } = JSON.parse(jcxxMx);
      return 诚信分;
    } catch (e) {
      return '-';
    }
  };

  // 工作经历
  renderWorkList = (workList) => {

    const works = [];
    if (workList && workList.length > 0) {
      workList.forEach(w => {
        const {
          id,
          gjTime,
          jcxxMx = "{}",
        } = w;
        try {
          works.push({
            id,
            "入职日期": gjTime,
            ...JSON.parse(jcxxMx)
          });
        } catch (e) {
          console.log(e);
        }
      })
    }

    if (works && works.length > 0) {

      const cardTimelineLeft = {xs: 24, sm: 5, md: 4, lg: 4, xl: 6, xxl: 5, style: { marginBottom: 12 }};
      const cardTimelineRight = {xs: 24, sm: 19, md: 20, lg: 20, xl: 18, xxl: 19};

      return (
        <Row>
          <Col {...cardTimelineLeft}>
            <div style={{textAlign: 'center'}}>
              <span style={{fontSize: '32px', fontWeight: 'bold', padding: '0'}}>{works.length}</span>
              <span style={{fontSize: '16px', fontWeight: 'bold', padding: '0'}}>家公司</span>
            </div>
          </Col>
          <Col {...cardTimelineRight}>
            <div style={{ height: '276px', overflowY: 'auto' }}>
              <Timeline style={{margin: '6px', width: '90%'}}>
                {
                  works.map( work => (
                    <Timeline.Item key={work.id}>{`${this.dateFormat(work.入职日期, 'YYYY-MM-DD')} ~ ${this.dateFormat(work.离职日期, 'YYYY-MM-DD', '至今')}，${work.所属企业}`}</Timeline.Item>
                  ))
                }
              </Timeline>
            </div>
          </Col>
        </Row>
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 个人诚信记录统计
  renderCreditData = (credit) => {
    const {
      desMap = {}
    } = credit;
    const {
      个人诚信统计次数和分值 = []
    } = desMap;
    const data = [];
    个人诚信统计次数和分值.forEach(d => {
      const {
        mx = '{}',
      } = d;
      try {
        data.push(JSON.parse(mx));
      } catch (e) {
      }
    });
    if (data && data.length > 0) {

      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: [ '诚信计分','良好加分','不良扣分' ], // 展开字段集
        key: '诚信类型', // key字段
        value: '次数', // value字段
      });

      return (
        <Chart height={276} data={dv} forceFit>
          <Axis name="诚信类型" />
          <Axis name="次数" />
          <Legend />
          <Tooltip crosshairs={{type : "y"}} />
          <Geom type='interval' position="诚信类型*次数" color="group" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
        </Chart>
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 个人项目经历
  renderWorkResume = (resume) => {
    if (resume && resume.length > 0) {

      // 工作履历 栅格布局参数
      const resumeColsProps = {
        timeCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 2, xxl: 2},
        engNameCols: {xs: 24, sm: 12, md: 10, lg: 10, xl: 8, xxl: 8},
        jobsCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 2, xxl: 2},
        isChangedCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 2, xxl: 2},
        statusCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 2, xxl: 2},
        companyCols: {xs: 24, sm: 24, md: 24, lg: 10, xl: 8, xxl: 8},
      };

      return (
        <Timeline style={{margin: '10px', width: '95%'}}>
          {
            resume.map( data => {
              const {
                id,
                time,
                engName,
                job,
                isChanged = false,
                status = '未知状态',
                orgName,
              } = data;
              return (
                <Timeline.Item key={id} color="green" className={styles.workResume}>
                  <Row gutter={12}>
                    <Col {...resumeColsProps.timeCols}>
                      <div className={styles.time}>{this.dateFormat(time, 'YYYY-MM-DD')}</div>
                    </Col>
                    <Col {...resumeColsProps.engNameCols}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span style={{backgroundColor: '#4D4D4D', padding: '0 5px', borderRadius: '10px', color: 'white'}}>工程</span>
                        <span style={{ marginLeft: '5px' }}>{engName}</span>
                      </div>
                    </Col>
                    <Col {...resumeColsProps.jobsCols}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span style={{ marginLeft: '5px' }}>{job}</span>
                      </div>
                    </Col>
                    <Col {...resumeColsProps.isChangedCols}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span style={{ backgroundColor: '#FFB90F', padding: '0 5px', borderRadius: '10px', color: 'white' }}>{isChanged ? '有变更' : '未变更'}</span>
                      </div>
                    </Col>
                    <Col {...resumeColsProps.statusCols}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>{status}</span>
                      </div>
                    </Col>
                    <Col {...resumeColsProps.companyCols}>
                      <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                        <span style={{ backgroundColor: '#c48000', padding: '0 5px', borderRadius: '10px', color: 'white' }}>隶属</span>
                        <span style={{ marginLeft: '5px' }}>{orgName}</span>
                      </div>
                    </Col>
                  </Row>
                </Timeline.Item>
              );
            })
          }
        </Timeline>
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 岗位分析
  renderJobList = (jobList) => {
    const {
      jobMx = []
    } = jobList;
    if (jobMx && jobMx.length > 0) {
      return (
        <JobPie
          hasLegend
          total={() => `参与${jobList.engCount}个工程`}
          data={jobMx}
          height={276}
          lineWidth={4}
        />
      );
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 人员足迹分布
  renderRyzjList = (ryzjList) => {
    const ryzj = [];
    ryzjList.forEach(r => {
      const {
        engId,
        engMx,
      } = r;
      try {
        const eng = JSON.parse(engMx);
        const {
          经度,
          维度,
          报建日期,
          工程名称,
          工程地址,
          建设单位名称 = '',
          施工单位名称 = '',
          监理单位名称 = '',
        } = eng;
        if (经度 && 维度) {
          ryzj.push({
            id: engId,
            createTime: 报建日期,
            sgxkName: 工程名称,
            address: 工程地址,
            job: '项目总监',
            jsdw: 建设单位名称,
            sgdw: 施工单位名称,
            jldw: 监理单位名称,
            lng: 经度,
            lat: 维度
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
    return ryzj.map((item, index) => (
      <Marker
        key={item.id}
        icon={`red${index+1}`}
        position={{
          lng: item.lng,
          lat: item.lat,
        }}
        events={{
          click: (marker) => {
            this.handleMarkerClick(marker, item)
          },
        }}
      />
    ))
  };

  render() {

    const { infoWindow } = this.state;

    const {
      basicInfoLoading,
      person: {
        basicInfo: {
          jcxxMx = '{}',
          desMap = {},
        },
        credit,
        engList, // 项目经历
        workList, // 工作经历
        jobList, // 岗位分析
        ryzjList, // 人员足迹分布
      }
    } = this.props;

    let jcxxMxJson;
    try {
      jcxxMxJson = JSON.parse(jcxxMx)
    } catch (e) {
      jcxxMxJson = {};
    }
    const {
      姓名,
      性别 = '-',
      年龄 = '-',
      学历 = '-',
      民族 = '-',
      入册工龄 = '-',
      身份证号 = '-',
      移动电话 = '-',
      社保状态 = '社保状态未知',
    } = jcxxMxJson;
    const {
      个人证书 = [],
    } = desMap;

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description>{性别} | {学历} | {民族} | {年龄}岁</Description>
        <Description term="入册工龄">{入册工龄}年</Description>
        <Description term="身份证号">{身份证号}</Description>
        <Description term="手机号码">{移动电话}</Description>
      </DescriptionList>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信等级</div>
          <div className={styles.heading}>{this.renderCreditLevel(credit)}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信分值</div>
          <div className={styles.heading}>{this.renderCreditScore(credit)}分</div>
        </Col>
      </Row>
    );

    // 左右结构布局参数
    const doubleCardColsProps = {lg: 24, xl: 12, style: { marginTop: 12 }};
    const cardTimelineLeft = {xs: 24, sm: 5, md: 4, lg: 4, xl: 6, xxl: 5, style: { marginBottom: 12 }};
    const cardTimelineRight = {xs: 24, sm: 19, md: 20, lg: 20, xl: 18, xxl: 19};

    const IMAGES = [];

    IMAGES.map(i => {
      i.customOverlay = (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            maxHeight: '240px',
            overflow: 'hidden',
            position: 'absolute',
            bottom: '0',
            width: '100%',
            color: 'white',
            padding: '2px',
            fontSize: '90%',
          }}
        >
          <div>{i.caption}</div>
          {i.hasOwnProperty('tags') && this.setCustomTags(i)}
        </div>
      );
      return i;
    });

    return (
      <PageHeaderWrapper
        title={
          <div>
            <span className={styles.headerTitle}>{姓名}</span>
            <Tag color="magenta" className={styles.headerTag}>{社保状态}</Tag>
          </div>
        }
        logo={
          <img style={{height: 120, width: 120}} alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
      >
        <Card title="个人附件" bordered={false} bodyStyle={{padding: '12px'}}>
          <div className={styles.imgCardContainer}>
            {IMAGES.length === 0 ? (
              '无附件'
            ) : (
              <Gallery images={IMAGES} enableImageSelection={false} />
            )}
          </div>
        </Card>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="个人证书"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              {
                个人证书.length > 0 ? (
                  <Row>
                    <Col {...cardTimelineLeft}>
                      <div style={{textAlign: 'center'}}>
                        <span style={{fontSize: '32px', fontWeight: 'bold', padding: '0'}}>{this.renderCertificateCount(个人证书)}</span>
                        <span style={{fontSize: '16px', fontWeight: 'bold', padding: '0'}}>项证书</span>
                      </div>
                    </Col>
                    <Col {...cardTimelineRight}>
                      <div style={{ height: '276px', overflowY: 'auto' }}>
                        {this.renderCertificateData(个人证书)}
                      </div>
                    </Col>
                  </Row>
                ) : (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>)
              }
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="个人诚信"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              {this.renderCreditData(credit)}
            </Card>
          </Col>
        </Row>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="项目经历"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          <div style={{height: 276, overflowY: 'auto'}}>
            {this.renderWorkResume(engList)}
          </div>
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="工作经历"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              {this.renderWorkList(workList)}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="岗位分析"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              {this.renderJobList(jobList)}
            </Card>
          </Col>
        </Row>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title={<div><span>足迹分布</span><span style={{color: 'red', marginLeft: '10px', fontSize: '12px'}}>数值越小，表示时间越近，仅显示第一次进入工地的记录。</span></div>}
          style={{ marginTop: 12 }}
        >
          <Map center="宜昌">
            {this.renderRyzjList(ryzjList)}
            {infoWindow}
          </Map>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Person;
