import React from 'react';
import {
  Chart,
  Geom,
  Tooltip,
  Coord,
  Label,
  View,
} from 'bizcharts';
import DataSet from '@antv/data-set';

export default class SunburstPie extends React.PureComponent {
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
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
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
      <div>
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
            <Label content="type" offset={-10} />
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
    );
  }
}
