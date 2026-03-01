import React from 'react';
import {Flex, Typography} from "antd";

interface Props {
  title: string;
}

const StatusCircle: React.FC<Props> = ({title}) => {
  const status = () => {
    switch (title.toLowerCase()) {
    case 'in_work':
      return (
        <Flex align={'center'} gap={6}>
          <div
            style={{width: '12px', height: '12px', background: '#FACA15', flexShrink: 0, borderRadius: '999px'}}
          ></div>
          <Typography.Text strong>В работе</Typography.Text>
        </Flex>
      )
    case 'finished':
      return (
        <Flex align={'center'} gap={6}>
          <div
            style={{width: '12px', height: '12px', background: '#0E9F6E', flexShrink: 0, borderRadius: '999px'}}
          ></div>
          <Typography.Text strong>Завершено</Typography.Text>
        </Flex>
      ) ;
    case 'draft':
      return (
        <Flex align={'center'} gap={6}>
          <div
            style={{width: '12px', height: '12px', background: '#959595', flexShrink: 0, borderRadius: '999px'}}
          ></div>
          <Typography.Text strong>Черновик</Typography.Text>
        </Flex>
      );
    case 'delete':
      return (
        <Flex align={'center'} gap={6}>
          <div
            style={{width: '12px', height: '12px', background: '#d32d2d', flexShrink: 0, borderRadius: '999px'}}
          ></div>
          <Typography.Text strong>Удалено</Typography.Text>
        </Flex>
      );
    default:
      return (
        <Flex align={'center'} gap={6}>
          <Typography.Text strong>Неизвестно</Typography.Text>
        </Flex>
      );
    }
  };

  return (
    status()
  );
};

export default StatusCircle;
