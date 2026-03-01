import {Button, Flex, Form, Modal, Typography} from "antd";
import {useModals, useProduct_Project} from "../../../store.ts";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const FinishedProjectModal = () => {
  const [form] = Form.useForm();
  const finishedProjectModalOpen = useModals(state => state.finishedProjectModalOpen)
  const setFinishedProjectModalOpen = useModals(state => state.setFinishedProjectModalOpen)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const finishedCurrentProdData = useProduct_Project(state => state.finishedCurrentProdData)

  const onFinish = () => {
    form.resetFields();
    setFinishedProjectModalOpen(false)
  };

  const handleOk = () => {
    finishedCurrentProdData(currentProdData.id, 'finished' , form.getFieldValue('comment'))
    form.resetFields();
    setFinishedProjectModalOpen(false)
  }

  const handleCancel = () => {
    form.resetFields();
    setFinishedProjectModalOpen(false)
  }

  const footer = () => (
    <Flex style={{width:'100%'}} justify={'center'} gap={16}>
      <Button type={'primary'} danger={true} key="submit" onClick={handleOk} >
        Да, завершить
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
      open={finishedProjectModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer}
    >
      <Flex gap={16} vertical={true} align={'center'} style={{width:'100%'}}>
        <ExclamationCircleOutlined style={{fontSize: '48px', color: '#9CA3AF'}} />
        <Typography.Text style={{textAlign: 'center', color: '#9CA3AF', fontSize: '18px'}}>
          Вы уверены что хотите завершить <br/> этот проект?
        </Typography.Text>
        <Flex style={{width: '100%'}}>
          <Form form={form}
                style={{width: '100%'}}
                onFinish={onFinish}
                name={'Удаление  продукта/объекта'}
                requiredMark={true}
                layout={'vertical'}
                autoComplete="off">
            <Form.Item rules={[{ required: true, message: 'Введите комментарий' }]} name={'comment'} style={{width: '100%', marginBottom: '10px'}}>
              <Flex gap={12} vertical={true} style={{width: '100%'}}>
                <Typography.Text strong>Комментарий</Typography.Text>
                <TextArea style={{width: '100%', minHeight: '100px'}} placeholder={'Введите комментарий'}></TextArea>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default FinishedProjectModal;