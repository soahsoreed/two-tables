import {Button, Flex, Form, Modal, Typography} from "antd";
import {useModals, useProduct_Project} from "../../../store.ts";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  additionalTablesTypes,
  useAdditionalTablesModals
} from "../../additionalTables/store/additionalTablesModalsStore.ts";
import {useLearningMaterials} from "../../additionalTables/store/learningMaterialsStore.ts";
import {useMarketingMaterials} from "../../additionalTables/store/marketingMaterialsStore.ts";
import {useWorkspace} from "../../additionalTables/store/workspaceStore.ts";
import BoldLabel from "../../../components/BoldLabel.tsx";

const DeleteMaterialModal = () => {
  const [form] = Form.useForm();
  const deleteMaterialModalOpen = useModals(state => state.deleteMaterialModalOpen)
  const setDeleteMaterialModalOpen = useModals(state => state.setDeleteMaterialModalOpen)
  const {idForDelete, softDeleteEntity, deleteType, setDeleteType, setIdForDelete} = useProduct_Project()
  const { modalType } = useAdditionalTablesModals()
  const { deleteData: deleteLearningMaterials } = useLearningMaterials()
  const { deleteData: deleteMarketingMaterials } = useMarketingMaterials()
  const { deleteData: deleteWorkspace } = useWorkspace()

  const handleClose = () => {
    form.resetFields();
    setDeleteMaterialModalOpen(false)
    setIdForDelete(null)
  }

  const handleOk = () => {
    // console.log(modalType)
    switch (modalType) {
    case additionalTablesTypes.learningMaterials:
      deleteLearningMaterials(idForDelete).then(() => handleClose())
      break
    case additionalTablesTypes.marketingMaterials:
      deleteMarketingMaterials(idForDelete).then(() => handleClose())
      break
    case additionalTablesTypes.workspaces:
      deleteWorkspace(idForDelete).then(() => handleClose())
      break
    case additionalTablesTypes.documents:
      // console.log('here')
      form.validateFields().then((values) => {
        softDeleteEntity(idForDelete,deleteType, values.delete_commentary ).then((_) => {
          setDeleteType(null)
          setIdForDelete(null)
          handleClose()
        })
      })


    }

  }

  const handleCancel = () => {
    form.resetFields();
    setDeleteMaterialModalOpen(false)
  }

  const footer = () => (
    <Flex style={{width:'100%'}} justify={'center'} gap={16}>
      <Button type={'primary'} danger={true} key="submit" onClick={handleOk} >
        Да, удалить
      </Button>
      <Button key="back" onClick={handleCancel}>
        Нет, отменить
      </Button>
    </Flex>
  )

  return (
    <Modal
      style={{minWidth: '420px'}}
      title=''
      open={deleteMaterialModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
      centered
    >
      <Flex gap={16} vertical={true} align={'center'} style={{width:'100%'}}>
        <ExclamationCircleOutlined style={{fontSize: '48px', color: '#9CA3AF'}} />
        <Typography.Text style={{textAlign: 'center', color: '#9CA3AF', fontSize: '18px'}}>
          Вы уверены что хотите удалить этот <br/> материал?
        </Typography.Text>
        <Flex style={{width: '100%'}}>
          <Form form={form}
            style={{width: '100%'}}
            onFinish={handleOk}
            name={'Удаление  продукта/объекта'}
            requiredMark={true}
            layout={'vertical'}
            autoComplete="off">
            {modalType == additionalTablesTypes.documents ?
              (
                <Flex gap={12} vertical={true} style={{width: '100%'}}>
                  {/*<Typography.Text strong>Комментарий</Typography.Text>*/}
                  <Form.Item
                    label={<BoldLabel text={'Комментарий'} />}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                    name={'delete_commentary'} style={{width: '100%', marginBottom: '10px'}}>
                  <TextArea style={{width: '100%', minHeight: '100px'}} placeholder={'Введите комментарий'}></TextArea>
                  </Form.Item>
                </Flex>
              ) : null}
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteMaterialModal;