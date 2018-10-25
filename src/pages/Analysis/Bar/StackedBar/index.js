import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend, Coord } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import DataSet from "@antv/data-set";
import autoHeight from '../../autoHeight';

@autoHeight()
class StackedBar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
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
      value: "y",
      // value字段
      retains: ["rank", 'engName'] // 保留字段集，默认为除fields以外的所有字段
    });

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
          >
            <Legend />
            <Coord transpose />
            <Axis
              name="rank"
              title={false}
              label={{
                offset: 12
              }}
            />
            <Axis name="y" />
            <Tooltip />
            <Geom
              type="intervalStack"
              position="rank*y"
              color="x"
              tooltip={['engName*x*y', (engName, x, y) => ({
                title: engName,
                name: x,
                value: y
              })]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default StackedBar;
