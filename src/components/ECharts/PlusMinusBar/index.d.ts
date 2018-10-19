import * as React from 'react';
export interface IPlusMinusProps {
  color?: string;
  data: Array<{}>;
  dimensions: Array<String>;
  height?: number;
}

export default class PlusMinusBar extends React.Component<IPlusMinusProps, any> {}
