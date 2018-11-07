import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import DataSet from "@antv/data-set";

import {
  Row,
  Col,
  Divider,
} from 'antd';

import autoHeight from '../../autoHeight';

import styles from './index.less';

// 左右结构布局参数
const leftCardColsProps = { xs: 24, sm: 12, lg: 16, xl: 16, style: { marginBottom: 12 } };
const rightCardColsProps = { xs: 24, sm: 12, lg: 8, xl: 8, style: { marginBottom: 12 } };

@autoHeight()
class StackedBar2 extends Component {
  state = {
    autoHideXLabels: false,
    legendData: [],
  };

  componentDidMount() {
    window.addEventListener(
      'resize',
      () => {
        this.requestRef = requestAnimationFrame(() => this.resize());
      },
      { passive: true }
    );
  }

  componentDidUpdate(preProps) {
    const { data } = this.props;
    if (data !== preProps.data) {
      // because of charts data create when rendered
      // so there is a trick for get rendered time
      this.getLegendData();
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.requestRef);
    window.removeEventListener('resize', this.resize);
    this.resize.cancel();
  }

  handleRoot = n => {
    this.root = n;
  };

  getG2Instance = chart => {
    this.chart = chart;
    requestAnimationFrame(() => {
      this.getLegendData();
      this.resize();
    });
  };

  // for custom lengend view
  getLegendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    if (!geom) return;
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map(item => {
      /* eslint no-underscore-dangle:0 */
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      return origin;
    });

    this.setState({
      legendData,
    });
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      height = 300,
      forceFit = true,
      padding,
      data = [],
      fields,
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields,
      // 展开字段集
      key: "x",
      // key字段
      value: "y" // value字段
    });

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <Row gutter={12}>
          <Col {...leftCardColsProps}>
            <div ref={this.handleRef}>
              <Chart
                height={height}
                forceFit={forceFit}
                data={dv}
                padding={padding || 'auto'}
              >
                <Legend />
                <Axis
                  name="spsx"
                  title={false}
                  label={{
                    offset: 12
                  }}
                />
                <Axis name="y" />
                <Tooltip />
                <Geom
                  type="intervalStack"
                  position="spsx*y"
                  color="x"
                  tooltip={['spsx*x*y', (spsx, x, y) => ({
                    title: spsx,
                    name: x,
                    value: y
                  })]}
                />
              </Chart>
            </div>
          </Col>
          <Col {...rightCardColsProps}>
            <div style={{height, padding: '20px'}}>
              <ul className={styles.legend}>
                {[
                  {
                    x: '施工许可',
                    y: 1120,
                    percent: 0.694,
                  },
                  {
                    x: '施工合同备案',
                    y: 151,
                    percent: 0.093,
                  },
                  {
                    x: '竣工验收备案',
                    y: 60,
                    percent: 0.037,
                  },
                  {
                    x: '决算备案',
                    y: 283,
                    percent: 0.175,
                  },
                ].map((item) => (
                  <li key={item.x}>
                    <span className={styles.legendTitle}>{item.x}</span>
                    <Divider type="vertical" />
                    <span className={styles.percent}>
                      {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                    </span>
                    <Divider type="vertical" />
                    <span className={styles.value}>{item.y}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StackedBar2;
