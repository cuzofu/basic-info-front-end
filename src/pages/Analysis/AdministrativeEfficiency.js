import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';

import {
  Card,
  Row,
  Col,
  Radio,
  Table,
  Steps,
  Popover,
  Icon,
  Badge,
} from 'antd';

import {
  Pie,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import styles from './AdministrativeEfficiency.less';
import StackedBar2 from "./Bar/StackedBar2/index";

const { Step } = Steps;

// 左右结构布局参数
const doubleCardColsProps = { lg: 24, xl: 12, style: { marginBottom: 12 } };
// 左右结构布局参数
const leftCardColsProps = { xs: 24, sm: 12, lg: 16, xl: 16, style: { marginBottom: 12 } };
const rightCardColsProps = { xs: 24, sm: 12, lg: 8, xl: 8, style: { marginBottom: 12 } };

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      宜昌福星惠誉房地产有限公司
    </Fragment>
    <div>2018/11/4 15:00:44</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      赵露
    </Fragment>
    <div>
      2018/11/5 9:00:44
    </div>
  </div>
);

const desc3 = (
  <div className={styles.stepDescription}>
    <Fragment>
      盛祖春
    </Fragment>
    <div>
      2018/11/5 9:10:44
    </div>
  </div>
);

const desc4 = (
  <div className={styles.stepDescription}>
    <Fragment>
      王梁
    </Fragment>
    <div>
      2018/11/5 10:00:44
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
class AdministrativeEfficiency extends Component {

  state = {
    xzxksx: 'sgxk',
    stepDirection: 'horizontal',
  };

  // 行政审批总占比
  renderXzspzb = () => {
    return (
      <div>
        <StackedBar2
          fields={['正常', '超期']}
          data={[
            {
              spsx: "总件数",
              "正常": 1470,
              "超期": 154
            },
            {
              spsx: "施工许可",
              "正常": 1015,
              "超期": 105
            },
            {
              spsx: '施工合同备案',
              "正常": 145,
              "超期": 6
            },
            {
              spsx: '竣工验收备案',
              "正常": 50,
              "超期": 10
            },
            {
              spsx: '决算备案',
              "正常": 250,
              "超期": 33
            },
          ]}
        />
      </div>
    );
  };

  renderXzxksx = () => {

    const {
      xzxksx,
    } = this.state;

    let xzxksxData = [
      {
        x: '按期数',
        y: 1015,
      },
      {
        x: '超期数',
        y: 105,
      },
    ];
    switch (xzxksx) {
      case 'sgxk':
        break;
      case 'htba':
        xzxksxData = [
          {
            x: '按期数',
            y: 145,
          },
          {
            x: '超期数',
            y: 6,
          },
        ];
        break;
      case 'ysba':xzxksxData = [
        {
          x: '按期数',
          y: 50,
        },
        {
          x: '超期数',
          y: 10,
        },
      ];
        break;
      case 'jsba':
        xzxksxData = [
          {
            x: '按期数',
            y: 250,
          },
          {
            x: '超期数',
            y: 33,
          },
        ];
        break;
      default:
        break;
    }

    return (
      <div>
        <div className={styles.xzxksxTypeRadio}>
          <Radio.Group value={xzxksx} onChange={this.handleChangeXzxksxType}>
            <Radio.Button value="sgxk">施工许可</Radio.Button>
            <Radio.Button value="htba">施工合同备案</Radio.Button>
            <Radio.Button value="ysba">竣工验收备案</Radio.Button>
            <Radio.Button value="jsba">结算备案</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <Pie
            hasLegend
            subTitle="总件数"
            total={() => `${xzxksxData.reduce((pre, now) => now.y + pre, 0)}件`}
            data={xzxksxData}
            valueFormat={value => `${value}件`}
            height={348}
            inner={0.7}
            padding={40}
          />
        </div>
      </div>
    );
  };

  handleChangeXzxksxType = e => {
    this.setState({
      xzxksx: e.target.value,
    });
  };

  renderXzsksxmxTable = () => {

    const xzxksxList = [
      {
        xzxksx: '施工合同',
        sgxkbh: 'HT180141',
        sqdw: '中国长江三峡集团公司',
        time: 3,
        sfasbj: '按时',
      },
      {
        xzxksx: '施工合同',
        sgxkbh: 'HT180142',
        sqdw: '中国民生银行股份有限公司宜昌分行',
        time: 3,
        sfasbj: '按时',
      },
      {
        xzxksx: '施工合同',
        sgxkbh: 'HT180143',
        sqdw: '宜昌市伍家岗区岳湾路小学',
        time: 3,
        sfasbj: '按时',
      },
      {
        xzxksx: '施工合同',
        sgxkbh: 'HT180144',
        sqdw: '宜昌市伍家岗区白沙小学',
        time: 3,
        sfasbj: '按时',
      },
      {
        xzxksx: '施工合同',
        sgxkbh: 'HT180145',
        sqdw: '宜昌福星惠誉房地产有限公司',
        time: 3,
        sfasbj: '按时',
      },
    ];
    const xzxksxColumns = [
      {
        title: '行政许可事项',
        dataIndex: 'xzxksx',
        width: '15%',
        align: 'center',
      },
      {
        title: '编号',
        dataIndex: 'sgxkbh',
        width: '15%',
        align: 'center',
      },
      {
        title: '申请单位',
        dataIndex: 'sqdw',
        width: '15%',
        align: 'center',
      },
      {
        title: '承诺时长(天)',
        dataIndex: 'time',
        width: '15%',
        align: 'center',
        render: (val) => `${val}天`,
      },
      {
        title: '是否按时办结',
        dataIndex: 'sfasbj',
        width: '15%',
        align: 'center',
      },
      {
        title: '时间轴',
        width: '15%',
        align: 'center',
        render: () => '查看',
      },
    ];

    return (
      <Table
        size="small"
        rowKey="sgxkbh"
        scroll={{ y: 270 }}
        dataSource={xzxksxList}
        columns={xzxksxColumns}
        pagination={{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '50', '100'],
          showSizeChanger: true,
          showTotal: total => `总计 ${total} 件.`,
        }}
      />
    );
  };

  renderXzsksxTimeLine = () => {

    const {
      stepDirection,
    } = this.state;

    return (
      <Row>
        <Col {...leftCardColsProps}>
          <Steps direction={stepDirection} progressDot={customDot} current={3}>
            <Step title="提交申请" description={desc1} />
            <Step title="受理" description={desc2} />
            <Step title="处理" description={desc3} />
            <Step title="办结" description={desc4} />
          </Steps>
        </Col>
        <Col {...rightCardColsProps}>
          <div style={{textAlign: 'center'}}>
            <p>承诺时长(天)：3天</p>
            <p>实际用时(天)：1天</p>
            <p>是否按时办结：按时</p>
          </div>
        </Col>
      </Row>
    );
  };

  render() {

    return (
      <GridContent>
        <Card
          style={{ marginBottom: '12px' }}
          title="行政审批总占比"
          bodyStyle={{ padding: '5px', minHeight: '300px' }}
        >
          {this.renderXzspzb()}
        </Card>
        <Row gutter={12}>
          <Col {...doubleCardColsProps}>
            <Card
              title="行政许可事项比率"
              bodyStyle={{ padding: '5px', minHeight: '400px' }}
            >
              {this.renderXzxksx()}
            </Card>
          </Col>
          <Col {...doubleCardColsProps}>
            <Card
              title="行政许可事项明细"
              bodyStyle={{ padding: '5px', minHeight: '400px' }}
            >
              {this.renderXzsksxmxTable()}
            </Card>
          </Col>
        </Row>
        <Card
          style={{ marginBottom: '12px' }}
          title="时间轴"
          bodyStyle={{ padding: '20px 0' }}
        >
          {this.renderXzsksxTimeLine()}
        </Card>
      </GridContent>
    );
  }
}

export default AdministrativeEfficiency;
