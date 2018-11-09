import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/axis';

class BarLine extends Component {

  componentDidMount() {

    const {
      id,
      data,
    } = this.props;

    const xAxis = [];
    const legend = [];
    data.forEach( r => {
      if (xAxis.indexOf(r.x) === -1) {
        xAxis.push(r.x);
      }
      if (legend.indexOf(r.y) === -1) {
        legend.push(r.y);
      }
    });
    const data1 = [];
    legend.forEach( x => {
      data1[x] = data.filter( r => r.y === x).reduce((pre, now) => ({...pre, [now.x]: now.value}), {});
    });
    const diffData = xAxis.map(x => data1[legend[0]][x] - data1[legend[1]][x]);
    const minData = xAxis.map(x => {
      const v1 = data1[legend[0]][x];
      const v2 = data1[legend[1]][x];
      return v1 > v2 ? v2 : v1;
    });
    const seriesData = legend.map( l => ({
      name: l,
      type: 'line',
      data: xAxis.map( x => data1[l][x])
    }));
    seriesData.push({
      name:'min',
      type:'bar',
      stack: '1',
      barWidth: 6,
      itemStyle:{
        normal:{
          color:'rgba(0,0,0,0)'
        },
        emphasis:{
          color:'rgba(0,0,0,0)'
        }
      },
      data: minData
    });
    seriesData.push({
      name:'diff',
      type:'bar',
      stack: '1',
      data: diffData.map( d => d >= 0 ? d : ({value: -d, itemStyle:{ normal:{color:'red'}}})),
    });

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
      tooltip : {
        trigger: 'axis',
        formatter: (params) => `${params[0].seriesName} : ${params[0].value}<br />${params[1].seriesName} : ${params[1].value}`
      },
      legend: {
        data: legend,
        selectedMode: false
      },
      xAxis : [
        {
          type : 'category',
          data : xAxis.map(x=> x.substr(0, 4)),
        }
      ],
      yAxis : [
        {
          type : 'value',
        }
      ],
      series : seriesData
    });

    window.addEventListener('resize', () => {myChart.resize()});

  }

  render() {
    const {id, height} = this.props;
    return (
      <div id={id} style={{ width: '100%', height: height || '100%' }} />
    );
  }
}

export default BarLine;
