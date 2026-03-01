import React from 'react';
import {Typography} from "antd";
interface LabelProps {
  text: string;
}

const BoldLabel:React.FC<LabelProps> = ({text}) => {
  return (
    <Typography.Text strong>{text}</Typography.Text>
  );
};

export default BoldLabel;