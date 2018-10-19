import * as React from 'react';
export interface IScatterChartProps {
  color?: string;
  data?: Array<{}>;
  dimensions?: Array<String>;
  height?: number;
}

export default class InvestmentChart extends React.Component<IScatterChartProps, any> {}
