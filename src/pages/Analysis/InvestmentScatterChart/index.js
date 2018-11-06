import React, {Component} from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/scatter';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/markPoint';

class InvestmentScatterChart extends Component {

  componentDidMount() {

    const {
      id,
      data,
    } = this.props;
    const seriesOpts = [];
    const legendData = [];
    data.forEach(d => {
      seriesOpts.push({
        name: d.type,
        type: 'scatter',
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const date = new Date(params.value[0]);
            return `${params.seriesName}（${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}）<br />${params.value[3]}, ${params.value[2]}`;
          },
          axisPointer: {
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        symbolSize: (value) => Math.round(value[2] / 10),
        data: d.list.map( r => ([
          new Date(2014, 9, 1, 0, Math.round(Math.random() * 10000)),
          (r.tze - 0),
          100,
          r.engName,
        ])),
      });
      legendData.push(d.type);
    });
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      dataZoom: {
        show: true,
        start: 0,
        end: 100
      },
      legend: {
        data: legendData
      },
      grid: {
        y2: 80,
        left: '15%',
      },
      xAxis: [
        {
          type: 'time',
          splitNumber: 10
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel : {
            formatter: '{value}万'
          },
        }
      ],
      animation: false,
      series: seriesOpts
    });

    window.addEventListener('resize', () => {
      myChart.resize()
    });

  }

  render() {
    const {height, id} = this.props;
    return (
      <div id={id} style={{width: '100%', height: height || '100%'}} />
    );
  }
}

export default InvestmentScatterChart;
