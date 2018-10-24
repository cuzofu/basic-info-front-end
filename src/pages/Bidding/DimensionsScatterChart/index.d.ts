import * as React from 'react';
export interface IDimensionsScatterChartProps {
  id: string;
  color?: string;
  data?: Array<{}>;
  dimensions?: Array<String>;
  height?: number;
}

export default class DimensionsScatterChart extends React.Component<IDimensionsScatterChartProps, any> {}
