import * as React from 'react';
export interface IBarLineProps {
  id: string;
  color?: string;
  data?: Array<{}>;
  dimensions?: Array<String>;
  height?: number;
}

export default class BarLine extends React.Component<IBarLineProps, any> {}
