import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Tag, Timeline, Table, Icon, Radio } from 'antd';

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
  rylzLoading: loading.effects['engAnalysis/fetchRylz'],
  zxxxLoading: loading.effects['engAnalysis/fetchZxxx'],
  gcgkLoading: loading.effects['engAnalysis/fetchGcgk'],
  wttjLoading: loading.effects['engAnalysis/fetchWttj'],
  cxtjLoading: loading.effects['engAnalysis/fetchCxtj'],
  wtfxLoading: loading.effects['engAnalysis/fetchWtfx'],
  wtlbLoading: loading.effects['engAnalysis/fetchWtlb'],
  wsfxLoading: loading.effects['engAnalysis/fetchWsfx'],
  wslbLoading: loading.effects['engAnalysis/fetchWslb'],
}))
class EngAnalysis extends Component {

  state = {
    xmbryType: 'js',
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
      type: 'engAnalysis/fetchBasicInfo',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchRylz',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchZxxx',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchGcgk',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchWttj',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchCxtj',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchWtfx',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchWtlb',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchWsfx',
      payload: {
        key: id,
      }
    });
    dispatch({
      type: 'engAnalysis/fetchWslb',
      payload: {
        key: id,
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'engAnalysis/clear',
    });
  }

  dateFormat = (date, format) => {
    const d = moment(date);
    if (d.isValid()) {
      return d.format(format);
    }
    return '未知';
  };

  onXmbryTypeChange = (e) => {
    this.setState({
      xmbryType: e.target.value
    });
  };

  renderXmbry = () => {
    const {
      xmbryType,
    } = this.state;
    const {
      engAnalysis: {
        basicInfo: {
          desMap,
        }
      }
    } = this.props;

    let content = (<div style={{textAlign: 'center', height: '100%', lineHeight: '100%', verticalAlign: 'middle'}}>暂无数据</div>);
    if (!desMap) {
      return content;
    }
    const {
      建设单位人员 = [],
      施工项目部人员 = [],
      监理项目部人员 = [],
    } = desMap;
    const rylb = [];
    switch (xmbryType) {
      case 'js':
        建设单位人员.forEach(r => {
          const {id, mx = '{}'} = r;
          try {
            rylb.push({id, ...JSON.parse(mx)})
          } catch (e) {console.log(e);}
        });
        content = (
          <Table
            scroll={{ y: 200 }}
            rowKey="id"
            columns={[
              {title: '项目负责人', dataIndex: '项目负责人', width: '50%'},
              {title: '联系电话', dataIndex: '联系电话', width: '50%'},
            ]}
            dataSource={rylb}
            pagination={false}
          />
        );
        break;
      case 'sg':
        施工项目部人员.forEach(r => {
          const {id, mx = '{}'} = r;
          try {
            rylb.push({id, ...JSON.parse(mx)})
          } catch (e) {console.log(e);}
        });
        content = (
          <Table
            scroll={{ y: 200 }}
            rowKey="id"
            columns={[
              {title: '姓名', dataIndex: '姓名', width: '20%'},
              {title: '岗位', dataIndex: '岗位', width: '20%'},
              {title: '身份证号', dataIndex: '身份证号', width: '20%'},
              {title: '证书编号', dataIndex: '证书编号', width: '20%'},
              {title: '是否在岗', dataIndex: '是否在岗', width: '20%'},
            ]}
            dataSource={rylb}
            pagination={false}
          />
        );
        break;
      case 'jl':
        监理项目部人员.forEach(r => {
          const {id, mx = '{}'} = r;
          try {
            rylb.push({id, ...JSON.parse(mx)})
          } catch (e) {console.log(e);}
        });
        content = (
          <Table
            scroll={{ y: 200 }}
            rowKey="id"
            columns={[
              {title: '姓名', dataIndex: '姓名', width: '25%'},
              {title: '岗位', dataIndex: '岗位', width: '25%'},
              {title: '证书编号', dataIndex: '证书编号', width: '25%'},
              {title: '是否在岗', dataIndex: '是否在岗', width: '25%'},
            ]}
            dataSource={rylb}
            pagination={false}
          />
        );
        break;
      default:
        break;
    }

    return (
      <div>
        <Radio.Group value={xmbryType} onChange={this.onXmbryTypeChange} style={{ marginBottom: 16 }}>
          <Radio.Button value="js">建设</Radio.Button>
          <Radio.Button value="sg">施工</Radio.Button>
          <Radio.Button value="jl">监理</Radio.Button>
        </Radio.Group>
        {content}
      </div>
    );
  };

  renderZxxx = () => {
    const {
      engAnalysis: {
        zxxx: {
          lxmx = '暂无消息',
          gjTime = this.dateFormat(moment.now(), 'YYYY年MM月DD日'),
        },
      }
    } = this.props;
    return (
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
          <Ellipsis tooltip lines={1}>{lxmx}</Ellipsis>
          <div style={{textAlign: 'right'}}><span title="2018年8月1日">{gjTime}</span></div>
        </div>
      </Card>
    );
  };

  renderGcgk = () => {
    const {
      engAnalysis: {
        gcgk: {
          jiaFen = '无',
          jianFen = '无',
        },
      }
    } = this.props;
    return (
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
          <Ellipsis tooltip lines={1}>{jiaFen}</Ellipsis>
          <Ellipsis tooltip lines={1}>{jianFen}</Ellipsis>
        </div>
      </Card>
    );
  };

  renderWttj = () => {
    const {
      engAnalysis: {
        wttj: {
          jiaFen = '无',
          jianFen = '无',
        },
      }
    } = this.props;
    return (
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
          <Ellipsis tooltip lines={1}>{jiaFen}</Ellipsis>
          <Ellipsis tooltip lines={1}>{jianFen}</Ellipsis>
        </div>
      </Card>
    );
  };

  renderCxtj = () => {
    const {
      engAnalysis: {
        cxtj: {
          jiaFen = '无',
          jianFen = '无',
        },
      }
    } = this.props;
    return (
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
          <Ellipsis tooltip lines={1}>{jiaFen}</Ellipsis>
          <Ellipsis tooltip lines={1}>{jianFen}</Ellipsis>
        </div>
      </Card>
    );
  };

  render() {

    const {
      basicInfoLoading,
      zxxxLoading,
      gcgkLoading,
      wttjLoading,
      cxtjLoading,
      wsfxLoading,
      wslbLoading,
      engAnalysis: {
        basicInfo: {
          engName,
          engMx = '{}',
        },
        wsfx,
        wslb,
      }
    } = this.props;
    const {
      工程地址,
      工程类型,
      计划开工日期,
      计划竣工日期,
      投资类型,
    } = JSON.parse(engMx);

    const description = (
      <Fragment>
        <DescriptionList className={styles.headerList} size="small" col={3}>
          <Description term="建设地点">{工程地址}</Description>
          <Description term="工程类型">{工程类型}</Description>
          <Description term="建筑面积">8888平方</Description>
          <Description term="招标方式">公开招标</Description>
          <Description term="中标价格">928.542126（万元）</Description>
          <Description term="投资类型">{投资类型}</Description>
          <Description term="开工日期">{计划开工日期}</Description>
          <Description term="竣工日期">{计划竣工日期}</Description>
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
            <p className={styles.headerTitle}>{engName}</p>
            <div>
              <Tag color="magenta">房建工程</Tag>
              <Tag color="volcano" className={styles.headerTag}>公开招标</Tag>
            </div>
          </div>
        }
        content={description}
      >
        <Card
          loading={zxxxLoading && gcgkLoading && wttjLoading && cxtjLoading}
          className={styles.messageList}
          bordered={false}
          bodyStyle={{padding: '12px', minHeight: '120px'}}
        >
          <Card.Grid className={styles.messageGrid}>
            {this.renderZxxx()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderGcgk()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderWttj()}
          </Card.Grid>
          <Card.Grid className={styles.messageGrid}>
            {this.renderCxtj()}
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
        <Card
          title="项目部人员"
          loading={basicInfoLoading}
          style={{marginTop: 12}}
          bodyStyle={{ padding: '12px', height: '326px'}}
        >
          {this.renderXmbry()}
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
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="问题分析"
              style={{marginTop: 12}}
              bodyStyle={{ height: '320px', padding: '12px'}}
            >
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
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="问题列表"
              style={{marginTop: 12}}
              bodyStyle={{ height: '320px', padding: '12px'}}
            >
              <Table
                data={[]}
                columns={[
                  {
                    title: '排名',
                    dataIndex: 'rank',
                  },
                  {
                    title: '问题',
                    dataIndex: 'wt',
                  },
                  {
                    title: '类型',
                    dataIndex: 'type',
                  },
                  {
                    title: '分类',
                    dataIndex: 'subType',
                  },
                  {
                    title: '次数',
                    dataIndex: 'count',
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              loading={wsfxLoading}
              bordered={false}
              title="文书分析"
              style={{marginTop: 12}}
              bodyStyle={{height: '300px', padding: '12px'}}
            >
              <Pie
                hasLegend
                subTitle="文书数量"
                total={() => `${wsfx.reduce((pre, now) => now.y + pre, 0)}件`}
                data={wsfx}
                valueFormat={value => `${value}件`}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              loading={basicInfoLoading}
              bordered={false}
              title="文书列表"
              style={{marginTop: 12}}
              bodyStyle={{height: '300px', padding: '6px'}}
            >
              <Table
                dataSource={wslb}
                rowKey="rank"
                columns={[
                  {
                    title: '排名',
                    dataIndex: 'rank',
                    width: '20%',
                    render: (val, r, index) => index + 1,
                  },
                  {
                    title: '文书名称',
                    dataIndex: 'ms',
                    width: '40%',
                  },
                  {
                    title: '类型',
                    dataIndex: 'stype',
                    width: '20%',
                  },
                  {
                    title: '次数',
                    dataIndex: 'count',
                    width: '20%',
                  },
                ]}
                pagination={false}
                scroll={{ y: 220 }}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default EngAnalysis;
