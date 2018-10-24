import * as React from 'react';
export interface IInvestmentScatterChartProps {
  id: string;
  color?: string;
  data?: Array<{}>;
  dimensions?: Array<String>;
  height?: number;
}

export default class InvestmentScatterChart extends React.Component<IInvestmentScatterChartProps, any> {}
