import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { DataSet } from '@antv/data-set';
import { Row, Col, Card, Tag, Timeline } from 'antd';
import Gallery from 'react-grid-gallery';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import JobPie from './JobPie';

import styles from './Person.less';

const { Description } = DescriptionList;

@connect(({ person, loading }) => ({
  person,
  basicInfoLoading: loading.effects['person/fetchBasicInfo'],
  certificateLoading: loading.effects['person/fetchCertificate'],
}))
class Person extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'person/fetchBasicInfo',
    });
    dispatch({
      type: 'person/fetchCertificate',
    });
  }

  dateFormat = (date, format) => {
    const d = moment(date);
    if (d.isValid()) {
      return d.format(format);
    }
    return '未知';
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
            certificate.map( cert => (
              <Timeline.Item key={cert.id}>{cert.name}</Timeline.Item>
            ))
          }
        </Timeline>
      );
    }
    return (<div>暂无数据</div>);
  };

  // 工作经历
  renderCompanyData = (companys) => {
    if (companys && companys.length > 0) {
      return (
        <Timeline style={{margin: '6px', width: '90%'}}>
          {
            companys.map( com => (
              <Timeline.Item key={com.id}>{`${this.dateFormat(com.date, 'YYYY-MM-DD')} ${com.name}(${com.year})`}</Timeline.Item>
            ))
          }
        </Timeline>
      );
    }
    return (<div>暂无数据</div>);
  };

  // 个人诚信记录统计
  renderCreditData = () => {
    const data = [
      { group:'次数', '诚信计分': 7, '良好加分': 5, '不良扣分' : 2 },
      { group:'分值', '诚信计分': 25, '良好加分': 30, '不良扣分' : -5 }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ '诚信计分','良好加分','不良扣分' ], // 展开字段集
      key: '诚信类型', // key字段
      value: '次数', // value字段
    });
    return dv;
  };

  // 个人项目经历
  renderWorkResume = (resume) => {
    if (resume && resume.length > 0) {

      // 工作履历 栅格布局参数
      const resumeColsProps = {
        timeCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 4, xxl: 2},
        engNameCols: {xs: 24, sm: 12, md: 10, lg: 10, xl: 10, xxl: 8},
        jobsCols: {xs: 24, sm: 12, md: 10, lg: 10, xl: 10, xxl: 2},
        isChangedCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 4, xxl: 2},
        statusCols: {xs: 24, sm: 12, md: 4, lg: 4, xl: 4, xxl: 2},
        companyCols: {xs: 24, sm: 12, md: 10, lg: 10, xl: 10, xxl: 8},
      };

      return (
        <Timeline style={{margin: '10px', width: '95%'}}>
          {
            resume.map( data => (
              <Timeline.Item key={data.id} color="green" className={styles.workResume}>
                <Row gutter={12}>
                  <Col {...resumeColsProps.timeCols}>
                    <div className={styles.time}>{this.dateFormat(data.createTime, 'YYYY-MM-DD')}</div>
                  </Col>
                  <Col {...resumeColsProps.engNameCols}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{backgroundColor: '#4D4D4D', padding: '0 5px', borderRadius: '10px', color: 'white'}}>工程</span>
                      <span style={{ marginLeft: '5px' }}>{data.sgxkName}</span>
                    </div>
                  </Col>
                  <Col {...resumeColsProps.jobsCols}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ marginLeft: '5px' }}>{data.job}</span>
                    </div>
                  </Col>
                  <Col {...resumeColsProps.isChangedCols}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ backgroundColor: '#FFB90F', padding: '0 5px', borderRadius: '10px', color: 'white' }}>{data.isChanged ? '有变更' : '未变更'}</span>
                    </div>
                  </Col>
                  <Col {...resumeColsProps.statusCols}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>{data.status}</span>
                    </div>
                  </Col>
                  <Col {...resumeColsProps.companyCols}>
                    <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                      <span style={{ backgroundColor: '#c48000', padding: '0 5px', borderRadius: '10px', color: 'white' }}>隶属</span>
                      <span style={{ marginLeft: '5px' }}>{data.company}</span>
                    </div>
                  </Col>
                </Row>
              </Timeline.Item>
            ))
          }
        </Timeline>
      );
    }
    return (<div>暂无数据</div>);
  };

  render() {

    const {
      certificateLoading,
    } = this.props;

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description>男 | 专科 | 汉族 | 33岁</Description>
        <Description term="入册工龄">5年</Description>
        <Description term="身份证">420581198501180039</Description>
        <Description term="手机号码">13886665321</Description>
      </DescriptionList>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信等级</div>
          <div className={styles.heading}>B级</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信分值</div>
          <div className={styles.heading}>88分</div>
        </Col>
      </Row>
    );

    // 左右结构布局参数
    const doubleCardColsProps = {lg: 24, xl: 12, style: { marginTop: 12 }};
    const cardTimelineLeft = {xs: 24, sm: 5, md: 4, lg: 4, xl: 6, xxl: 5, style: { marginBottom: 12 }};
    const cardTimelineRight = {xs: 24, sm: 19, md: 20, lg: 20, xl: 18, xxl: 19};

    const IMAGES = [
      {
        src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
        thumbnail: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg',
        thumbnailWidth: 271,
        thumbnailHeight: 320,
        caption: '职称证书',
      },
      {
        src: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg',
        thumbnail: 'https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 190,
        caption: '岗位证书',
      },
      {
        src: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg',
        thumbnail: 'https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 148,
        caption: '身份证',
      },
      {
        src: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg',
        thumbnail: 'https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg',
        thumbnailWidth: 320,
        thumbnailHeight: 213,
        caption: '印章',
      },
    ];

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

    const jobData = [
      {
        job: '施工员',
        countOfEng: 9,
        amountOfInvestment: 83423,
      },
      {
        job: '安全员',
        countOfEng: 8,
        amountOfInvestment: 7656456,
      },
      {
        job: '项目经理',
        countOfEng: 2,
        amountOfInvestment: 231232,
      },
      {
        job: '项目总监',
        countOfEng: 2,
        amountOfInvestment: 324344,
      }
    ];

    return (
      <PageHeaderWrapper
        title={
          <div>
            <span className={styles.headerTitle}>陈亮</span>
            <Tag color="magenta" className={styles.headerTag}>
              有社保
            </Tag>
          </div>
        }
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
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
              loading={certificateLoading}
              bordered={false}
              title="个人证书"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <Row>
                <Col {...cardTimelineLeft}>
                  <div style={{textAlign: 'center'}}>
                    <span style={{fontSize: '32px', fontWeight: 'bold', padding: '0'}}>4</span>
                    <span style={{fontSize: '16px', fontWeight: 'bold', padding: '0'}}>项证书</span>
                  </div>
                </Col>
                <Col {...cardTimelineRight}>
                  <div style={{ height: '276px', overflowY: 'auto' }}>
                    {
                      this.renderCertificateData([
                        {
                          id: '1200550',
                          name: '鄂建安B(2014)0334697  考核合格证书类_安全生产考核合格证书_B类',
                        },
                        {
                          id: '56151985',
                          name: '鄂142101008198  注册执业证书_注册建造师_一级',
                        },
                        {
                          id: '8515616',
                          name: '鄂142101008198  注册执业证书_注册建造师_一级',
                        },
                        {
                          id: '343432',
                          name: '鄂142101008198  注册执业证书_注册建造师_一级',
                        },
                        {
                          id: '45345345',
                          name: '鄂142101008198  注册执业证书_注册建造师_一级',
                        },
                        {
                          id: '56455353',
                          name: '鄂142101008198  注册执业证书_注册建造师_一级',
                        },
                      ])
                    }
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={certificateLoading}
              bordered={false}
              title="个人诚信"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <Chart height={276} data={this.renderCreditData()} forceFit>
                <Axis name="诚信类型" />
                <Axis name="次数" />
                <Legend />
                <Tooltip crosshairs={{type : "y"}} />
                <Geom type='interval' position="诚信类型*次数" color="group" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
              </Chart>
            </Card>
          </Col>
        </Row>
        <Card
          loading={certificateLoading}
          bordered={false}
          title="项目经历"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          <div style={{height: 276, overflowY: 'auto'}}>
            {this.renderWorkResume([
              {
                id: '1',
                createTime: '2018-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '项目总监',
                isChanged: true,
                status: '投标',
                company: '中铁三局建设集团中铁三局建设集团中铁三局建设集团中铁三局建设集团中铁三局建设集团'
              },
              {
                id: '2',
                createTime: '2017-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '项目经理',
                isChanged: true,
                status: '中标',
                company: '中铁三局建设集团'
              },
              {
                id: '3',
                createTime: '2015-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '项目经理',
                isChanged: false,
                status: '完工',
                company: '中铁三局建设集团'
              },
              {
                id: '4',
                createTime: '2014-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '施工员',
                isChanged: true,
                status: '完工',
                company: '中铁三局建设集团'
              },
              {
                id: '5',
                createTime: '2013-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '施工员',
                isChanged: false,
                status: '完工',
                company: '中铁三局建设集团'
              },
              {
                id: '6',
                createTime: '2012-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '施工员',
                isChanged: false,
                status: '完工',
                company: '中铁三局建设集团'
              },
              {
                id: '7',
                createTime: '2011-09-12 15:52:12',
                sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
                job: '施工员',
                isChanged: true,
                status: '完工',
                company: '中铁三局建设集团'
              }
            ])}
          </div>
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={certificateLoading}
              bordered={false}
              title="工作经历"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <Row>
                <Col {...cardTimelineLeft}>
                  <div style={{textAlign: 'center'}}>
                    <span style={{fontSize: '32px', fontWeight: 'bold', padding: '0'}}>5</span>
                    <span style={{fontSize: '16px', fontWeight: 'bold', padding: '0'}}>家公司</span>
                  </div>
                </Col>
                <Col {...cardTimelineRight}>
                  <div style={{ height: '276px', overflowY: 'auto' }}>
                    {
                      this.renderCompanyData([
                        {
                          id: '1',
                          date: '2018-07-01',
                          name: '升思公司',
                          year: '1年'
                        },
                        {
                          id: '2',
                          date: '2017-07-01',
                          name: '唐氏公司',
                          year: '2年'
                        },
                        {
                          id: '3',
                          date: '2013-07-01',
                          name: '杨氏公司',
                          year: '3年'
                        },
                        {
                          id: '4',
                          date: '2010-07-01',
                          name: '刘氏公司',
                          year: '3年'
                        },
                        {
                          id: '5',
                          date: '2008-07-01',
                          name: '张氏公司',
                          year: '2年'
                        },
                        {
                          id: '6',
                          date: '2006-07-01',
                          name: '唐氏公司',
                          year: '2年'
                        },
                      ])
                    }
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={certificateLoading}
              bordered={false}
              title="岗位分析"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <JobPie
                hasLegend
                total={() => `参与${jobData.reduce((pre, now) => now.countOfEng + pre, 0)}个工程`}
                data={jobData}
                height={276}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Person;
