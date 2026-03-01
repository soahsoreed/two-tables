import {Flex, Typography} from "antd";
import {DeleteFilled} from "@ant-design/icons";
import React from "react";

interface Props {
  comment: string;
  deleteDay: string;
  type: 'product' | 'project';
}

const DeleteWidget:React.FC<Props> = ({type, comment, deleteDay}) => {
  return (
    <Flex vertical={true} align={'center'} gap={8} style={{ width: '100%'}}>
      <Flex vertical={true} gap={16} align={'center'}>
        <Flex
          align={'center'}
          justify={'center'}
          style={{width: '88px', height: '88px',
            background: '#E5E7EB', borderRadius: '999px'}}
        >
          <DeleteFilled
            style={{color: '#6B7280', fontSize: '40px'}}
          />
        </Flex>
        <Typography.Title style={{margin: '0'}} level={2}>{type == 'product' ? 'Продукт' : 'Проект'} удалён</Typography.Title>
      </Flex>
      <Flex
        vertical={true}
        style={{borderRadius: '16px', borderTopLeftRadius: '0', backgroundColor: '#E5E7EB',
          width: '100%', padding: '8px'}}>
        <Typography.Text style={{fontSize: '12px'}} type={'secondary'}>Комментарий:</Typography.Text>
        <Typography.Text style={{color: '#4B5563', fontWeight: 500}}>{comment}</Typography.Text>
        <Typography.Text  style={{fontSize: '12px', textAlign: 'end'}} type={'secondary'}>{deleteDay}</Typography.Text>

      </Flex>
    </Flex>
  );
};

export default DeleteWidget;