import React, { useState } from 'react';
import { FileTextOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { useProduct_Project, useRegister } from "../store.ts";

interface DecimalNumberTagProps {
  title: string;
  status?: string;
  page?: 'register' | 'productPage';
}

const DecimalNumberTag: React.FC<DecimalNumberTagProps> = ({ title, status, page }) => {
  const [isHovered, setIsHovered] = useState(false);
  const setRegisterSuccessMessage = useRegister(state => state.setSuccessMessage);
  const setProductSuccessMessage = useProduct_Project(state => state.setSuccessMessage);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleClick = async () => {
    if (title) {
      try {
        await navigator.clipboard.writeText(title);
        page === 'register'
          ? setRegisterSuccessMessage('Децимальный номер скопирован.')
          : setProductSuccessMessage('Децимальный номер скопирован.');
      } catch (error) {
        // console.error('Error copying text:', error);
        return
      }
    }
  };

  const tagColor = status !== 'delete'
    ? (title ? (isHovered ? '#0958d9' : 'blue') : 'blue')
    : '#00000040';

  const tagStyle = {
    padding: '2px 10px',
    width: 'fit-content',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 600,
    margin: 0,
    cursor: status !== 'delete' ? 'pointer' : 'not-allowed',
  };

  return (
    <Tag
      color={tagColor}
      style={tagStyle}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {title || 'не задано'}
      {title && <FileTextOutlined style={{ fontSize: '14px', marginLeft: '4px' }} />}
    </Tag>
  );
};

export default DecimalNumberTag;