import * as React from 'react';
export interface ISunburstPieProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<>;
  fields: Array<string>;
  autoLabel?: boolean;
  style?: React.CSSProperties;
}

export default class SunburstPie extends React.Component<ISunburstPieProps, any> {}
