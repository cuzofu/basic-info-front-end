import * as React from 'react';
export interface IStackedBar2Props {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<>;
  fields: Array<string>;
  autoLabel?: boolean;
  style?: React.CSSProperties;
}

export default class StackedBar2 extends React.Component<IStackedBar2Props, any> {}
