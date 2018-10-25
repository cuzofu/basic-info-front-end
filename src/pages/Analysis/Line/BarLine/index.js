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
    } = this.props;

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
      tooltip : {
        trigger: 'axis',
        formatter: (params) => `${params[0].seriesName} : ${params[0].value}<br />${params[1].seriesName} : ${params[1].value}`
      },
      legend: {
        data:['质量', '安全'],
        selectedMode:false
      },
      xAxis : [
        {
          type : 'category',
          data : ['限期整改','局部停工','停工整改','不良行为','其他']
        }
      ],
      yAxis : [
        {
          type : 'value',
        }
      ],
      series : [
        {
          name:'质量',
          type:'line',
          data:[400, 374, 251, 300, 420]
        },
        {
          name:'安全',
          type:'line',
          data:[320, 332, 301, 334, 360]
        },
        {
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
          data:[320, 332, 251, 300, 360]
        },
        {
          name:'diff',
          type:'bar',
          stack: '1',
          data:[
            80, 42,
            {value : 50, itemStyle:{ normal:{color:'red'}}},
            {value : 34, itemStyle:{ normal:{color:'red'}}},
            60
          ]
        }
      ]
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
