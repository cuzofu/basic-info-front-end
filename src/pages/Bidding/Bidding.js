import React, {Component} from 'react';
import {connect} from 'dva';

import numeral from 'numeral';

import {
  Row,
  Col,
  Card,
  Tooltip,
  Icon,
} from 'antd';

import {
  ChartCard,
  MiniBar,
  Field,
} from '@/components/Charts';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

@connect(({bidding, loading}) => ({
  bidding,
  basicInfoLoading: loading.effects['bidding/fetchBasicInfo'],
  engTypeLoading: loading.effects['bidding/fetchEngType'],
}))
class Bidding extends Component {

  render() {

    const {
      basicInfoLoading
    } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 12},
    };

    return (
      <GridContent>
        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={basicInfoLoading}
              title="招标数"
              action={
                <Tooltip
                  title="说明"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(1222).format('0,0')}
              footer={
                <Field
                  label="月同比"
                  value="60%"
                />
              }
              contentHeight={46}
            >
              <MiniBar data={[
                {
                  x: '2018-01',
                  y: 45
                },
                {
                  x: '2018-02',
                  y: 69
                },
                {
                  x: '2018-03',
                  y: 108
                },
                {
                  x: '2018-04',
                  y: 88
                },
                {
                  x: '2018-05',
                  y: 79
                },
                {
                  x: '2018-06',
                  y: 99
                },
                {
                  x: '2018-07',
                  y: 112
                },
                {
                  x: '2018-08',
                  y: 69
                }
              ]}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃企业数量" bodyStyle={{paddingBottom: '8px'}}>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="人员入库数量" bodyStyle={{paddingBottom: '8px'}}>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card title="活跃人员数量" bodyStyle={{paddingBottom: '8px'}}>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Bidding;
