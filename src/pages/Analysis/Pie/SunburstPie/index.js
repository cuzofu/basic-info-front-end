import React, { Component } from 'react';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Label,
  View,
} from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import DataSet from "@antv/data-set";
import autoHeight from '../../autoHeight';

@autoHeight()
class SunburstPie extends Component {
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
      height = 400,
      data = [],
    } = this.props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => `${(val * 100).toFixed(2)}%`,
      },
    };
    const dv1 = new DataView();
    dv1.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            height={height}
            data={dv}
            scale={cols}
            padding={[1, 1, 1, 1]}
            forceFit
          >
            <Coord type="theta" radius={0.5} />
            <Tooltip
              showTitle={false}
              itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
            />
            <Geom
              type="intervalStack"
              position="percent"
              color="type"
              tooltip={[
                'type*value*percent',
                (item, value, percent) => ({
                  name: item,
                  value: `${value}个 ${(percent * 100).toFixed(2)}%`,
                }),
              ]}
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
              select={false}
            >
              <Label content="type" offset={-20} />
            </Geom>
            <View data={dv1} scale={cols}>
              <Coord type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
              <Geom
                type="intervalStack"
                position="percent"
                color={[
                  'name',
                  [
                    '#8EE0A1',
                    '#BAF5C4',
                    '#BAE7FF',
                    '#7FC9FE',
                    '#71E3E3',
                    '#ABF5F5',
                  ],
                ]}
                tooltip={[
                  'name*value*percent',
                  (item, value, percent) => ({
                    name: item,
                    value: `${value}个 ${(percent * 100).toFixed(2)}%`,
                  }),
                ]}
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                select={false}
              >
                <Label content="name" />
              </Geom>
            </View>
          </Chart>
        </div>
      </div>
    );
  }
}

export default SunburstPie;
