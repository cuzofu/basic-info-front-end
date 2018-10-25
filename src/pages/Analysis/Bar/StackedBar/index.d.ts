import * as React from 'react';
export interface IStackedBarProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<>;
  fields: Array<string>;
  autoLabel?: boolean;
  style?: React.CSSProperties;
}

export default class StackedBar extends React.Component<IStackedBarProps, any> {}
