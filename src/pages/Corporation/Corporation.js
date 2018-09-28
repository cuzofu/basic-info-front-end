import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { DataSet } from '@antv/data-set';
import { Row, Col, Card, Tag, Timeline, Table, Divider } from 'antd';
import Gallery from 'react-grid-gallery';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';
import { Map, Marker, InfoWindow } from 'react-bmap';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import Ellipsis from '../../components/Ellipsis';

import styles from './Corporation.less';

const { Description } = DescriptionList;

@connect(({ corporation, loading }) => ({
  corporation,
  basicInfoLoading: loading.effects['corporation/fetchBasicInfo'],
  certificateLoading: loading.effects['corporation/fetchCertificate'],
}))
class Corporation extends Component {

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
      type: 'corporation/fetchBasicInfo',
      payload: {
        id,
      }
    });
    dispatch({
      type: 'corporation/fetchCertificate',
    });
  }

  handleMarkerClick = (marker, item) => {
    this.setState({
      infoWindow: this.renderInfoWindow(item),
    });
  };

  // 编辑企业负责人数据
  renderFzr = (data) => (
    data.map( (d, index) => {
      const {
        mx = '{}'
      } = d;
      const {
        专业 = '',
        姓名 = '',
        学历 = '',
        性别 = '',
        是否在职 = '',
        离职日期 = '',
        移动电话 = '',
        职务 = '',
        责任类型 = '',
        身份证号码 = ''
      } = JSON.parse(mx);
      return {
        key: index,
        name: 姓名,
        duty: 责任类型,
        job: 职务,
        id: 身份证号码,
        gender: 性别,
        education: 学历,
        title: '',
      }
    })
  );

  renderFj = (docs) => {
    const rtn = [];
    docs.forEach(d => {
      if (d.data) {
        rtn.push({
          src: `data:image/${d.fileext};base64,${d.data}`,
          thumbnail: `data:image/${d.fileext};base64,${d.data}`,
          thumbnailWidth: 320,
          thumbnailHeight: 320,
          caption: d.tag,
          customOverlay: (
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
              <div>{d.tag}</div>
              {d.hasOwnProperty('tags') && this.setCustomTags(d)}
            </div>
          ),
        })
      }
    });
    return rtn;
  };

  renderInfoWindow = (props) => {
    if (props) {
      return (
        <InfoWindow
          position={{lng: props.lng, lat: props.lat}}
          title={props.sgxkName}
          text={
            `<div><div>施工单位：${props.sgdwName}</div><div>建设单位：${props.jsdwName}</div></div>`
          }
        />
      );
    }
    return null;
  };

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
      return certificate.map( cert => (
        <DescriptionList key={cert.id} className={styles.headerList && styles.descriptionMargin} size="small" col="1">
          <Description term={`${cert.name}专项总分`}>{cert.score}</Description>
        </DescriptionList>
      ));
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

  // 诚信记录统计
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

  // 项目经历
  renderEngHistoryList = (engs) => {
    if (engs && engs.length > 0) {

      // 工作履历 栅格布局参数
      const resumeColsProps = {
        time: {
          xs: 24, sm: 24, md: 4, lg: 4, xl: 4, xxl: 2
        },
        context: {
          xs: 24, sm: 24, md: 20, lg: 20, xl: 20, xxl: 22
        },
        engNameCols: {
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 10
        },
        investmentCols: {
          xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 5
        },
        areaCols: {
          xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 5
        },
        engTypeCols: {
          xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 4
        },
      };

      return (
        <Timeline style={{margin: '10px', width: '95%'}}>
          {
            engs.map( data => (
              <Timeline.Item key={data.id} color="green" className={styles.workResume}>
                <Row gutter={12}>
                  <Col {...resumeColsProps.time}>
                    <div className={styles.time}>{this.dateFormat(data.createTime, 'YYYY-MM-DD')}</div>
                  </Col>
                  <Col {...resumeColsProps.context}>
                    <Row gutter={12}>
                      <Col {...resumeColsProps.engNameCols}>
                        <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                          <span style={{backgroundColor: '#4D4D4D', padding: '0 5px', borderRadius: '10px', color: 'white'}}>工程</span>
                          <span style={{ marginLeft: '5px' }}>{data.sgxkName}</span>
                        </div>
                      </Col>
                      <Col {...resumeColsProps.investmentCols}>
                        <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                          <span style={{ backgroundColor: '#FFB90F', padding: '0 5px', borderRadius: '10px', color: 'white' }}>投资额</span>
                          <span>{data.amountOfInvestment}万元</span>
                        </div>
                      </Col>
                      <Col {...resumeColsProps.areaCols}>
                        <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                          <span style={{ backgroundColor: '#52c41a', padding: '0 5px', borderRadius: '10px', color: 'white' }}>工程规模</span>
                          <span>{data.area}平方米</span>
                        </div>
                      </Col>
                      <Col {...resumeColsProps.companyCols}>
                        <div style={{lineHeight: '24px', verticalAlign: 'middle'}}>
                          <span style={{ backgroundColor: '#c48000', padding: '0 5px', borderRadius: '10px', color: 'white' }}>工程类型</span>
                          <span style={{ marginLeft: '5px' }}>{data.engType}</span>
                        </div>
                      </Col>
                    </Row>
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

    const { infoWindow } = this.state;

    const {
      basicInfoLoading,
      certificateLoading,
      corporation: {
        basicInfo: {
          jcxxMx = '{}',
          desMap = {},
          docs = [],
        }
      }
    } = this.props;
    const {
      座机 = '-',
      手机 = '-',
      传真 = '-',
      经营范围 = '-',
      组织机构代码 = '-',
      企业名称 = "-",
      企业登记注册类型 = '-',
      企业类别 = '-',
      企业类型 = '-',
      企业经济性质 = '-',
      企业隶属关系 = '-',
      办公地址 = '-',
      办公所在地行政区划 = '-',
      审核时间 = "",
      审核状态 = '-',
      日常联系人 = '-',
      日常联系电话 = '-',
      日常联系手机 = '-',
      注册地行政区划 = '-',
      注册地详细地址 = '-',
      注册时间 = '-',
      注册资本 = '-',
      注净资产 = '-',
      登记人员 = 0,
      登记所在地 = '-',
      登记证编号 = '-',
    } = JSON.parse(jcxxMx);
    const {
      企业负责人 = []
    } = desMap;

    const description = (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={4}>
          <Description term="联系人">{日常联系人}</Description>
          <Description term="座机">{日常联系电话}</Description>
          <Description term="手机">{日常联系手机}</Description>
          <Description term="传真">{传真}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="办公地址">{办公地址}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="经营范围">
            <Ellipsis tooltip lines={3}>{经营范围}</Ellipsis>
          </Description>
        </DescriptionList>
      </Fragment>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信等级</div>
          <div className={styles.heading}>A级</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信分值</div>
          <div className={styles.heading}>188分</div>
        </Col>
      </Row>
    );

    // 左右结构布局参数
    const doubleCardColsProps = {lg: 24, xl: 12, style: { marginTop: 12 }};

    const IMAGES = this.renderFj(docs);

    const engHistoryList = [
      {
        id: '1',
        createTime: '2018-09-12 15:52:12',
        sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
        amountOfInvestment: 5689.2568,
        area: 120000,
        engType: '房建项目',
        sgdwName: '中铁三局',
        jsdwName: '升思科技',
        lng: '111.351723',
        lat: '30.720449',
        zj: true
      },
      {
        id: '2',
        createTime: '2018-09-12 15:52:12',
        sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
        amountOfInvestment: 5689.2568,
        area: 120000,
        engType: '房建项目',
        sgdwName: '中铁三局',
        jsdwName: '升思科技',
        lng: '111.336295',
        lat: '30.721462',
        zj: true
      },
      {
        id: '3',
        createTime: '2018-09-12 15:52:12',
        sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
        amountOfInvestment: 5689.2568,
        area: 120000,
        engType: '房建项目',
        sgdwName: '中铁三局',
        jsdwName: '升思科技',
        lng: '111.30737',
        lat: '30.706746',
        zj: false
      },
      {
        id: '4',
        createTime: '2018-09-12 15:52:12',
        sgxkName: 'YCJS(2011)073  湖北升思科技大厦',
        amountOfInvestment: 5689.2568,
        area: 120000,
        engType: '房建项目',
        sgdwName: '中铁三局',
        jsdwName: '升思科技',
        lng: '111.338415',
        lat: '30.691841',
        zj: false
      },
    ];

    return (
      <PageHeaderWrapper
        title={
          <div>
            <p className={styles.headerTitle}>{企业名称}</p>
            <div>
              <Tag color="magenta">{企业类型}</Tag>
              <Tag color="volcano" className={styles.headerTag}>{企业类别}</Tag>
            </div>
          </div>
        }
        logo={
          <img style={{height: 200, width: 200}} alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
      >
        <Card title="企业附件" bordered={false} bodyStyle={{padding: '12px'}}>
          <div className={styles.imgCardContainer}>
            {IMAGES.length === 0 ? (
              '无附件'
            ) : (
              <Gallery images={IMAGES} enableImageSelection={false} />
            )}
          </div>
        </Card>

        <Card title="基本信息" style={{marginTop: 12}} bordered={false} bodyStyle={{padding: '12px'}}>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>统一信用代码</th>
                <td>{组织机构代码}</td>
                <th>系统编号</th>
                <td>{登记证编号}</td>
              </tr>
              <tr>
                <th>注册时间</th>
                <td>{注册时间}</td>
                <th>企业登记注册类型</th>
                <td>{企业登记注册类型}</td>
              </tr>
              <tr>
                <th>注册资本</th>
                <td>{注册资本}</td>
                <th>注净资产</th>
                <td>{注净资产}</td>
              </tr>
              <tr>
                <th>开户银行</th>
                <td>工商银行</td>
                <th>银行帐户</th>
                <td>5465651651616516</td>
              </tr>
              <tr>
                <th>注册地行政区划</th>
                <td>{注册地行政区划}</td>
                <th>登机机关</th>
                <td>宜昌市工商局宜昌高新技术产业开发区分局</td>
              </tr>
              <tr>
                <th>信息登记人员</th>
                <td colSpan={3}>{登记人员}人</td>
              </tr>
              <tr>
                <th>企业资质</th>
                <td colSpan={3}>
                  <p style={{margin: 0, padding: 0}}>D123456789  建筑业企业资质_施工总承包_建筑工程_壹级</p>
                  <p style={{margin: 0, padding: 0}}>D223456789  建筑业企业资质_施工总承包_市政公用工程_贰级</p>
                  <p style={{margin: 0, padding: 0}}>D323456789  建筑业企业资质_专业承包_起重设备安装工程_贰级</p>
                </td>
              </tr>
            </tbody>
          </table>
          <Card style={{marginTop: 12}} type="inner" title="负责人">
            <Table
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'name',
                },
                {
                  title: '责任类型',
                  dataIndex: 'duty',
                },
                {
                  title: '职务',
                  dataIndex: 'job',
                },
                {
                  title: '证件号码',
                  dataIndex: 'id',
                },
                {
                  title: '性别',
                  dataIndex: 'gender',
                },
                {
                  title: '文化程度',
                  dataIndex: 'education',
                },
                {
                  title: '职称',
                  dataIndex: 'title',
                }
              ]}
              dataSource={this.renderFzr(企业负责人)}
              pagination={false}
            />
          </Card>
        </Card>
        <Card
          loading={basicInfoLoading}
          bordered={false}
          title="活跃经历"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          <div style={{height: 276, overflowY: 'auto'}}>
            {this.renderEngHistoryList(engHistoryList)}
          </div>
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={certificateLoading}
              bordered={false}
              title="企业诚信"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <div style={{ height: '276px', overflow: 'auto', padding: 'auto 16px' }}>
                <DescriptionList className={styles.headerList && styles.descriptionMargin} size="small" col="2">
                  <Description term="诚信等级"><span className={styles.heading}>A级</span></Description>
                  <Description term="诚信总分"><span className={styles.heading}>155分</span></Description>
                </DescriptionList>
                <Divider />
                <Fragment>
                  {
                    this.renderCertificateData([
                      {
                        id: '1',
                        name: '建筑业企业资质_施工总承包_市政公用工程_壹级',
                        score: '130',
                      },
                      {
                        id: '2',
                        name: '建筑业企业资质_施工总承包_建筑工程_壹级',
                        score: '100',
                      },
                      {
                        id: '3',
                        name: '建筑业企业资质_施工总承包_公路工程_壹级',
                        score: '80',
                      },
                      {
                        id: '4',
                        name: '建筑业企业资质_施工总承包_铁路工程_壹级',
                        score: '80',
                      },
                      {
                        id: '5',
                        name: '建筑业企业资质_施工总承包_水利水电工程_壹级',
                        score: '80',
                      },
                      {
                        id: '6',
                        name: '建筑业企业资质_施工总承包_矿山工程_壹级',
                        score: '80',
                      },
                    ])
                  }
                </Fragment>
              </div>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={certificateLoading}
              bordered={false}
              title="诚信统计"
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
          title={<div><span>在建工程分布图</span><span style={{color: 'red', marginLeft: '10px', fontSize: '12px'}}>数值越小，表示时间越近。</span></div>}
          style={{ marginTop: 12 }}
        >
          <Map center="宜昌">
            {
              engHistoryList.filter( i => i.zj).map((item, index) => (
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
            }
            {infoWindow}
          </Map>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Corporation;
