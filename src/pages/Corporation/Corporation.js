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
  hyjlLoading: loading.effects['corporation/fetchHyjl'],
  zjgcLoading: loading.effects['corporation/fetchZjgc'],
  creditLoading: loading.effects['corporation/fetchCredit'],
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
        jcxxId: id,
      }
    });
    dispatch({
      type: 'corporation/fetchHyjl',
      payload: {
        jcxxId: id,
      }
    });
    dispatch({
      type: 'corporation/fetchZjgc',
      payload: {
        jcxxId: id,
      }
    });
    dispatch({
      type: 'corporation/fetchCredit',
      payload: {
        jcxxId: id,
      }
    });
  }

  handleMarkerClick = (marker, item) => {
    this.setState({
      infoWindow: this.renderInfoWindow(item),
    });
  };

  // 编辑企业资质数据
  renderZz = (data) => {
    const rtn = [];
    data.forEach( d => {
      const {
        id,
        mx = '{}'
      } = d;
      const {
        证书编号 = '',
        资质等级 = '',
        资质状态 = '',
      } = JSON.parse(mx);
      if (资质状态 !== '注销') {
        rtn.push(<p key={id} style={{margin: 0, padding: 0}}>{`${证书编号} ${资质等级}`} </p>);
      }
    });
    return rtn;
  };

  // 编辑企业负责人数据
  renderFzr = (data) => (
    data.map( (d, index) => {
      const {
        mx = '{}'
      } = d;
      const {
        姓名 = '',
        学历 = '',
        性别 = '',
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

  renderHyjl = (hyjl) => {
    const rtn = [];
    hyjl.forEach(jl => {
      const {
        engMx = '{}'
      } = jl;
      try {
        const engMxJson = JSON.parse(engMx);
        const {
          标段名称 = '',
          工程类型 = '',
          建设单位 = '',
          中标金额 = '',
          中标机构 = '',
          公示时间 = '',
        } = engMxJson;
        rtn.push({
          id: jl.id,
          createTime: 公示时间,
          sgxkName: 标段名称,
          amountOfInvestment: 中标金额,
          area: 120000,
          engType: 工程类型,
          zbjg: 中标机构,
          jsdwName: 建设单位,
        });
      } catch (e) {
        console.log(`解析JSON字符串【${engMx}】出错`);
      }
    });
    return rtn;
  };

  renderZjgcData = (data) => {
    const rtn = [];
    data.forEach(d => {
      const {
        id,
        engMx = '{}'
      } = d;
      try {
        const {
          工程名称,
          经度,
          维度,
          建设单位名称,
          施工总承包名称,
          监理单位名称,
          建设地点,
        } = JSON.parse(engMx);

        rtn.push({
          id,
          engName: 工程名称,
          lng: 经度,
          lat: 维度,
          jsdwName: 建设单位名称,
          sgdwName: 施工总承包名称,
          jldwName: 监理单位名称,
          jsdd: 建设地点,
        });
      } catch (e) {
        console.log(`解析JSON字符串【${engMx}】出错`);
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
            `<div><div>工程名称：${props.engName}</div><div>建设地点：${props.jsdd}</div><div>建设单位：${props.jsdwName}</div><div>施工单位：${props.sgdwName}</div><div>监理单位：${props.jldwName}</div></div>`
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

  // 企业诚信（资质诚信分值）
  renderCertificateData = (credit) => {
    const creditData = [];
    if ('desMap' in credit) {
      const {
        企业专项分 = [],
      } = credit.desMap;
      企业专项分.forEach(d => {
        const {mx = '{}'} = d;
        try {
          const mxJson = JSON.parse(mx);
          creditData.push({
            id: d.id,
            ...mxJson
          });
        } catch (e) {
          console.log(e);
        }
      })
    }

    if (creditData && creditData.length > 0) {
      return creditData.map( cert => (
        <DescriptionList key={cert.id} className={styles.headerList && styles.descriptionMargin} size="small" col="1">
          <Description term={`${cert.资质等级} 专项总分`}>{cert.专项总分}</Description>
        </DescriptionList>
      ));
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  // 诚信记录统计
  renderCreditData = (credit) => {
    const creditData = [];
    if ('desMap' in credit) {
      const {
        企业诚信统计次数和分值 = [],
      } = credit.desMap;
      企业诚信统计次数和分值.forEach(d => {
        const {mx = '{}'} = d;
        try {
          const mxJson = JSON.parse(mx);
          creditData.push(mxJson);
        } catch (e) {
          console.log(e);
        }
      })
    }
    if (creditData && creditData.length > 0) {
      const ds = new DataSet();
      const dv = ds.createView().source(creditData);
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
      )
    }
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
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
    return (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
  };

  renderCreditScore = (credit) => {
    const {
      jcxxMx = '{}',
    } = credit;
    try {
      const jcxxMxJson = JSON.parse(jcxxMx);
      const {诚信总分 = '-'} = jcxxMxJson;
      return 诚信总分 === '-' ? 诚信总分 : `${诚信总分}分`;
    } catch (e) {
      return '-';
    }
  };

  renderCreditLevel = (credit) => {
    const {
      jcxxMx = '{}',
    } = credit;
    console.log(credit);
    try {
      const jcxxMxJson = JSON.parse(jcxxMx);
      const {诚信等级 = '-'} = jcxxMxJson;
      return 诚信等级;
    } catch (e) {
      return '-';
    }
  };

  render() {

    const { infoWindow } = this.state;

    const {
      basicInfoLoading,
      hyjlLoading,
      zjgcLoading,
      creditLoading,
      corporation: {
        basicInfo: {
          jcxxMx = '{}',
          desMap = {},
          docs = [],
        },
        hyjl,
        zjgc,
        credit,
      }
    } = this.props;

    const {
      经营范围 = '-',
      组织机构代码 = '-',
      企业名称 = "-",
      企业登记注册类型 = '-',
      企业类别,
      企业类型,
      办公地址 = '-',
      日常联系人 = '-',
      日常联系电话 = '-',
      联系手机 = '-',
      传真 = '-',
      注册地行政区划 = '-',
      注册时间 = '-',
      注册资本 = '-',
      注净资产 = '-',
      登记人员 = 0,
      登记证编号 = '-',
      开户银行 = '-',
      银行账号 = '-',
      诚信等级 = '-',
      诚信分值 = '-',
    } = JSON.parse(jcxxMx);
    const {
      企业负责人 = [],
      企业资质明细 = [],
    } = desMap;

    const description = (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={4}>
          <Description term="联系人">{日常联系人}</Description>
          <Description term="座机">{日常联系电话}</Description>
          <Description term="手机">{联系手机}</Description>
          <Description term="传真">{传真}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="办公地址">{办公地址}</Description>
        </DescriptionList>
        <DescriptionList className={styles.headerList} size="small" col="1">
          <Description term="经营范围">
            <Ellipsis lines={3}>{经营范围}</Ellipsis>
          </Description>
        </DescriptionList>
      </Fragment>
    );

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信等级</div>
          <div className={styles.heading}>{诚信等级}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>诚信分值</div>
          <div className={styles.heading}>{诚信分值}</div>
        </Col>
      </Row>
    );

    // 左右结构布局参数
    const doubleCardColsProps = {lg: 24, xl: 12, style: { marginTop: 12 }};

    const IMAGES = this.renderFj(docs);

    return (
      <PageHeaderWrapper
        title={
          <div>
            <p className={styles.headerTitle}>{企业名称}</p>
            <div>
              {企业类型 ? (<Tag color="magenta">{企业类型}</Tag>) : null}
              {企业类别 ? (<Tag color="volcano" className={styles.headerTag}>{企业类别}</Tag>) : null}
            </div>
          </div>
        }
        logo={
          <img style={{height: 200, width: 200}} alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
      >
        <Card title="企业附件" loading={basicInfoLoading} bordered={false} bodyStyle={{padding: '12px'}}>
          <div className={styles.imgCardContainer}>
            {IMAGES.length === 0 ? (
              '无附件'
            ) : (
              <Gallery images={IMAGES} enableImageSelection={false} />
            )}
          </div>
        </Card>

        <Card title="基本信息" loading={basicInfoLoading} style={{marginTop: 12}} bordered={false} bodyStyle={{padding: '12px'}}>
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
                <td>{开户银行}</td>
                <th>银行帐户</th>
                <td>{银行账号}</td>
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
                  {this.renderZz(企业资质明细)}
                </td>
              </tr>
            </tbody>
          </table>
          <Card style={{marginTop: 12}} loading={basicInfoLoading} type="inner" title="负责人">
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
          loading={hyjlLoading}
          bordered={false}
          title="活跃经历"
          style={{marginTop: 12}}
          bodyStyle={{height: '300px', padding: '12px'}}
        >
          <div style={{height: 276, overflowY: 'auto'}}>
            {this.renderEngHistoryList(this.renderHyjl(hyjl))}
          </div>
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={creditLoading}
              bordered={false}
              title="企业诚信"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              <div style={{ height: '276px', overflow: 'auto', padding: 'auto 16px' }}>
                <DescriptionList className={styles.headerList && styles.descriptionMargin} size="small" col="2">
                  <Description term="诚信等级"><span className={styles.heading}>{this.renderCreditLevel(credit)}</span></Description>
                  <Description term="诚信总分"><span className={styles.heading}>{this.renderCreditScore(credit)}</span></Description>
                </DescriptionList>
                <Divider />
                <Fragment>
                  {this.renderCertificateData(credit)}
                </Fragment>
              </div>
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={creditLoading}
              bordered={false}
              title="诚信统计"
              bodyStyle={{minHeight: '300px', padding: '12px'}}
            >
              {this.renderCreditData(credit)}
            </Card>
          </Col>
        </Row>
        <Card
          loading={zjgcLoading}
          bordered={false}
          title={<div><span>在建工程分布图</span><span style={{color: 'red', marginLeft: '10px', fontSize: '12px'}}>数值越小，表示时间越近。</span></div>}
          style={{ marginTop: 12 }}
          bodyStyle={{padding: '5px'}}
        >
          <Map center="宜昌" style={{height: '500px'}}>
            {
              this.renderZjgcData(zjgc).map((item, index) => (
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
