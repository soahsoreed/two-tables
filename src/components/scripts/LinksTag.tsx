import React from 'react';
import { ProductDocumentsObject} from "../../registry/interfaces.ts";
import {Tag} from "antd";
import {linksCounter} from "./linksCounter.ts";

interface props {
  documentsArr: ProductDocumentsObject[]
  status: string
}

const LinksTag: React.FC<props> = ({documentsArr, status}) => {
  const activeLinks = linksCounter(documentsArr);
  const allLinks = documentsArr.length
  let tagColor: string;
  let curColor: string;
  let cursor: string;
  if (status === 'delete') {
    curColor = '#00000040';
    tagColor = 'default';
    cursor = 'not-allowed';
  } else if (status === 'draft') {
    curColor = '#50678c';
    tagColor = 'blue';
    cursor = 'default';
  } else {
    curColor = activeLinks ? '#389e0d' : '#000000e0';
    tagColor = activeLinks ? 'green' : 'default';
    cursor = 'default';
  }

  return (
    <Tag
      style={{fontWeight: 'bold', color: curColor, cursor, margin: 0}}
      color={tagColor}>
      {documentsArr && documentsArr.length ? (
        `Добавлено ${activeLinks}/${allLinks}`
      ) : 'не добавлены'}
    </Tag>
  )
};

export default LinksTag;