import {Button, Flex, Form, Modal, Typography} from "antd";
import {useModals, useProduct_Project} from "../../../store.ts";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const DeleteProjectModals = () => {
  const [form] = Form.useForm();
  const deleteProjectModalOpen = useModals(state => state.deleteProjectModalOpen)
  const setDeleteProjectModalOpen = useModals(state => state.setDeleteProjectModalOpen)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const deleteCurrentProdData = useProduct_Project(state => state.deleteCurrentProdData)

  // const onFinish = () => {
  //   deleteCurrentProdData(currentProdData.id, form.getFieldValue('delete_commentary')).then(() =>{
  //     form.resetFields();
  //     setDeleteProjectModalOpen(false)
  //   })
  // };

  const handleOk = () => {
    form.validateFields().then((_) => {
      deleteCurrentProdData(currentProdData.id, 'delete', form.getFieldValue('delete_commentary'), dayjs())
      form.resetFields();
      setDeleteProjectModalOpen(false)
    })
  }

  const handleCancel = () => {
    form.resetFields();
    setDeleteProjectModalOpen(false)
  }

  const footer = () => (
    <Flex style={{width:'100%'}} justify={'center'} gap={16}>
      <Button type={'primary'} danger={true} key="submit"  onClick={handleOk}>
        Да, удалить
      </Button>
      <Button key="back" onClick={handleCancel}>
        Нет, отменить
      </Button>
    </Flex>
  )

  return currentProdData ? (
    <Modal
      style={{minWidth: '420px'}}
      title=''
      open={deleteProjectModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
    >
      <Flex gap={16} vertical={true} align={'center'} style={{width:'100%'}}>
        <ExclamationCircleOutlined style={{fontSize: '48px', color: '#9CA3AF'}} />
        <Typography.Text style={{textAlign: 'center', color: '#9CA3AF', fontSize: '18px'}}>
          Вы уверены что хотите удалить этот <br/> {currentProdData.type === 'product' ? 'продукт' : 'проект'}?
        </Typography.Text>
        <Flex style={{width: '100%'}}>
          <Form form={form}
            style={{width: '100%'}}
            name={'Удаление  продукта/объекта'}
            requiredMark={true}
            layout={'vertical'}
            autoComplete="off">
            <Form.Item rules={[{ required: true, message: 'Введите комментарий' }]} name={'delete_commentary'} style={{width: '100%', marginBottom: '10px'}}>
              <Flex gap={12} vertical={true} style={{width: '100%'}}>
                <Typography.Text strong>Комментарий</Typography.Text>
                <TextArea style={{width: '100%', minHeight: '100px'}} placeholder={'Введите комментарий'}></TextArea>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  ) : null;
};

export default DeleteProjectModals;