import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/scatter';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markArea';
import 'echarts/lib/component/markPoint';

class DimensionsScatterChart extends Component {

  componentDidMount() {

    const {id, data} = this.props;
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
      },
      tooltip : {
        showDelay : 0,
        formatter: (params) => {
          if (params.value.length > 1) {
            if (params.seriesName === '投资额/面积') {
              return `${params.seriesName}<br/>投资额：${params.value[1]}万元<br/>面积：${params.value[0]}㎡ `;
            }
            return `${params.seriesName}<br/>投资额：${params.value[1]}万元<br/>公里数：${params.value[0]}m `
          }
          return `投资额/${params.data.seriesName}<br/>${params.name} : ${params.value}万元`;
        },
        axisPointer:{
          show: true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          }
        }
      },
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          }
        }
      },
      brush: {
      },
      legend: {
        data: ['投资额/面积','投资额/公里数'],
        left: 'center'
      },
      xAxis : [
        {
          name: '面积/公里数',
          nameLocation: 'center',
          nameGap: 20,
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: (value) => `${value}(㎡/m)`
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: '{value} 万元'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series : [
        {
          name:'投资额/面积',
          type:'scatter',
          data: data.listmje,
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              name: '面积分布区域',
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          },
          markPoint : {
            data : [
              {type : 'max', name: '最大投资额', seriesName: '面积'},
              {type : 'min', name: '最小投资额', seriesName: '面积'}
            ]
          },
        },
        {
          name:'投资额/公里数',
          type:'scatter',
          data: data.listgls,
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              name: '公里分布区域',
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          },
          markPoint : {
            data : [
              {type : 'max', name: '最大投资额', seriesName: '公里数'},
              {type : 'min', name: '最小投资额', seriesName: '公里数'}
            ]
          },
        }
      ]
    });

    window.addEventListener('resize', () => {myChart.resize()});

  }

  init = () => {

    const {
      id,
      data,
    } = this.props;
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
      },
      tooltip : {
        showDelay : 0,
        formatter: (params) => {
          if (params.value.length > 1) {
            if (params.seriesName === '投资额/面积') {
              return `${params.seriesName}<br/>投资额：${params.value[0]}万元<br/>面积：${params.value[1]}㎡ `;
            }
            return `${params.seriesName}<br/>投资额：${params.value[0]}万元<br/>公里：${params.value[1]}km `
          }
          return `投资额/${params.data.seriesName}<br/>${params.name} : ${params.value}万元`;
        },
        axisPointer:{
          show: true,
          type : 'cross',
          lineStyle: {
            type : 'dashed',
            width : 1
          }
        }
      },
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          }
        }
      },
      brush: {
      },
      legend: {
        data: ['投资额/面积','投资额/公里'],
        left: 'center'
      },
      xAxis : [
        {
          name: '面积/公里',
          nameLocation: 'center',
          nameGap: 20,
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: (value) => `${value}(㎡/km)`
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          scale:true,
          axisLabel : {
            formatter: '{value} 万元'
          },
          splitLine: {
            show: false
          }
        }
      ],
      series : [
        {
          name:'投资额/面积',
          type:'scatter',
          data: data.listmje,
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              name: '面积分布区域',
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          },
          markPoint : {
            data : [
              {type : 'max', name: '最大投资额', seriesName: '面积'},
              {type : 'min', name: '最小投资额', seriesName: '面积'}
            ]
          },
        },
        {
          name:'投资额/公里',
          type:'scatter',
          data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
            [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
            [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
            [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
            [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
            [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
            [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
            [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
            [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
            [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
            [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
            [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
            [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
            [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
            [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
            [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
            [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
            [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
            [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
            [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
            [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
            [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
            [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
            [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
            [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
            [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
            [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
            [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
            [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
          ],
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              name: '公里分布区域',
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          },
          markPoint : {
            data : [
              {type : 'max', name: '最大投资额', seriesName: '公里'},
              {type : 'min', name: '最小投资额', seriesName: '公里'}
            ]
          },
        }
      ]
    });

    window.addEventListener('resize', () => {myChart.resize()});

  };

  render() {
    const {id, height} = this.props;
    return (
      <div id={id} style={{ width: '100%', height: height || '100%' }} />
    );
  }
}

export default DimensionsScatterChart;
