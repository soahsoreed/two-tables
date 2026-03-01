import React from 'react';
import { Flex } from "antd";

interface UserCircleProps {
  name: string;
  status?: string;
}

const UserCircle: React.FC<UserCircleProps> = ({ status, name }) => {
  const nameNormalized = (name ?? '').trim().toUpperCase();
  const [firstName, lastName] = nameNormalized.split(/\s+/);

  const firstLetter = firstName?.[0] ?? '';
  const lastLetter = lastName?.[0] ?? '';

  return (name && name.includes(' ')) ? (
    <Flex align={'center'} justify={'center'}
      style={{ width: '32px', height: '32px', flexShrink: 0, color: status === 'delete' ? '#00000040' : 'black',
        background: '#E5E7EB', borderRadius: '999px' }} key={name}>
      {(firstLetter && lastLetter) ?
        <span style={{ fontSize: '12px', lineHeight: '12px' }}>{`${firstLetter}${lastLetter}`}</span> :
        'ИИ'
      }
    </Flex>
  ) : null;
};

export default UserCircle;