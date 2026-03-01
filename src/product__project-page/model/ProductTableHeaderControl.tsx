import {Button, Flex, Switch, Tooltip, Typography} from "antd";
import {DownloadOutlined, PlusOutlined} from "@ant-design/icons";
import {useProduct_Project} from "../../store.ts";
import {downloadDocumentList} from "../documents/scripts/DownloadDocumentList.ts";


const ProductTableHeaderControl = () => {
  const setCreateDocumentModalOpen = useProduct_Project(state => state.setCreateDocumentModalOpen)
  const setIsShowDeleteButtonActive = useProduct_Project(state => state.setIsShowDeleteButtonActive)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const toggleHandle = (event: boolean) => {
    setIsShowDeleteButtonActive(event)
  }
  
  return (
    <Flex gap={16}>
      <Flex align={'center'} gap={8}>
        <Switch disabled={currentProdData.register_entity_documents.length == 0} onChange={(event) => toggleHandle(event)} />
        <Typography.Text strong>Скрыть удаленные</Typography.Text>
      </Flex>
      <Flex gap={8}>
        <Button
          disabled={currentProdData.register_entity_documents.length == 0}
          onClick={() => downloadDocumentList(currentProdData)} style={{display: 'flex', alignItems: 'center'}} ><DownloadOutlined style={{fontSize: '16px'}} />Скачать список документов</Button>
        {currentProdData.status == 'draft' ? (
          <Tooltip title={'Невозможно добавить документ, пока не присвоен децимальный номер проекту/продукту'}>
            <Button
              disabled={true}
              onClick={() => setCreateDocumentModalOpen(true)}
              type={'primary'}>Добавить<PlusOutlined /></Button>
          </Tooltip>
        ) : (
          <Button
            disabled={currentProdData.status == "delete" || currentProdData.status == "finished"}
            onClick={() => setCreateDocumentModalOpen(true)}
            type={'primary'}>Добавить<PlusOutlined /></Button>
        )}

      </Flex>
    </Flex>
  );
};

export default ProductTableHeaderControl;