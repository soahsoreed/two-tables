import React from 'react';
import {Flex, Tag, Tooltip} from "antd";
// import {CopyOutlined} from "@ant-design/icons";
// import {useProduct_Project} from "../store.ts";

interface docProps {
  title: string;
  status?: string;
}

const DocumentsLink: React.FC<docProps> = ({title, status}) => {
  // const setSuccessMessage = useProduct_Project(state => state.setSuccessMessage)
  return title ? (
    <Tooltip title={'Нажмите, чтобы открыть ссылку'}>
      <Flex
        style={{height: '20px', maxWidth: '272px', cursor: 'pointer'}}
        // onClick={() => {
        //   setSuccessMessage('Ссылка скопирована.')
        //   navigator.clipboard.writeText(title)
        // }}
      >
        <a
          href={title}
          target={'_blank'}
          style={{maxWidth: '272px', whiteSpace: 'nowrap', textDecoration: 'none',
            color: status == 'delete' ? '#00000040' : '#1A56DB',
            overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold'}}>
          {title}
        </a>
        {/*<CopyOutlined />*/}
      </Flex>
    </Tooltip>

  ) : (
    <Tag>
      Не обнаружена
    </Tag>
  );
};

export default DocumentsLink;