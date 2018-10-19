import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/axis';

class PlusMinusBar extends Component {

  componentDidMount() {

    const {
      data = [],
      dimensions = [],
      color = ['#8C8C8C', '#2fc25b', '#1890ff'],
    } = this.props;

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      color,
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        // data:['差额', '合同额', '决算额']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'value',
          axisLabel: {
            formatter: '{value}万元'
          }
        }
      ],
      yAxis : [
        {
          type : 'category',
          axisTick : {show: false},
          // data : ['HT0001','HT0002','HT0003','HT0004','HT0005']
        }
      ],
      series : [
        {
          type:'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
        },
        {
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
        },
        {
          // name:'合同额',
          type:'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
        }
      ],
      dataset: {
        dimensions,
        source: data
      }
    });

    window.addEventListener('resize', () => {myChart.resize()});

  }

  render() {
    const {height} = this.props;
    return (
      <div id="main" style={{ width: '100%', height: height || '100%' }} />
    );
  }
}

export default PlusMinusBar;
