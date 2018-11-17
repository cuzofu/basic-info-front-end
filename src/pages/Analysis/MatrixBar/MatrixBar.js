import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  Shape,
} from "bizcharts";

class MatrixBar extends React.Component {
  render() {
    const {
      height = 50,
      padding = [0],
      scale,
      data = [],
    } = this.props;

    // 自定义带有宽度的色块
    Shape.registerShape('polygon', 'custom', {
      draw: function(cfg, container) {
        const points = this.parsePoints(cfg.points);
        const startX = points[1].x;
        const startY = points[1].y;
        const size = cfg.size || 0;
        const shapeWidth = (points[2].x - points[1].x);
        const shapeHeight = Math.abs(points[1].y - points[0].y);
        // 绘制背景
        container.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: shapeWidth,
            height: shapeHeight
          }
        });
        // 绘制色块
        return container.addShape('rect', {
          attrs: {
            x: startX,
            y: startY,
            width: shapeWidth * size,
            height: shapeHeight,
            fill: cfg.color,
            stroke: '#fff'
          }
        });
      }
    });

    const label = {
      // 设置文本的显示样式，还可以是个回调函数，回调函数的参数为该坐标轴对应字段的数值
      textStyle: {
        textAlign: 'end', // 文本对齐方向，可取值为： start center end
        fill: '#404040', // 文本的颜色
        fontSize: '12', // 文本大小
        // fontWeight: 'bold', // 文本粗细
        textBaseline: 'middle',
        whiteSpace: 'normal',
        width: '100px',
      }
    };

    const cols = {
      groupX: {
        type: "cat"
      },
      value: {
        alias: "占比",
        type: "linear",
        formatter: (value) => `${(value * 100).toFixed(2)}%`,
        min: 0,
        max: 1
      }
    };
    return (
      <div>
        <Chart
          height={height}
          data={data}
          scale={cols}
          padding={padding}
          forceFit
        >
          <Axis name="groupY" label={label} />
          <Axis name="groupX" />
          <Tooltip />
          <Legend
            slidable={false}
            width={165}
            itemFormatter={val => `${val.slice(0, val.indexOf("."))}%`}
          />
          <Geom
            type="polygon"
            position="groupX*groupY"
            color={[
              "value",
              "rgb(44, 123, 182)-rgb(0, 166, 202)-rgb(0, 204, 188)-rgb(144, 235, 157)-rgb(255, 255, 140)-rgb(249, 208, 87)-rgb(242, 158, 46)-rgb(231, 104, 24)-rgb(215, 25, 28)"
            ]}
            size={["value", (size) => size]}
            shape="custom"
            style={{lineWidth: 1, stroke: "#fff"}}
          />
        </Chart>
      </div>
    );
  }
}

export default MatrixBar;
