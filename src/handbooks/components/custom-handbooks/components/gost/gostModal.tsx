import {Button, Flex, Form, Modal, Input, ConfigProvider} from "antd";
import { useGostHandbook } from "../../../../store/gost.state";
import { useHandbookModals } from "../../../../store/handbook-modals.state";
import BoldLabel from "../../../../../components/BoldLabel.tsx";
import {useEffect} from "react";

const Gostmodal = () => {
  const [form] = Form.useForm();
  const { createData, updateData } = useGostHandbook();
  const { isModalOpen, setIsModalOpen, setInitialValues, setIsEdit, initialValues, isEdit } = useHandbookModals();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        updateData(initialValues!.id!, values).finally(() => {
          form.resetFields();
          setIsModalOpen(false);
        });
      } else {
        createData(values)
          .then((data) => {
            if (data.errors) {
              return;
            }
          })
          .catch((_) => {
            return;
          })
          .finally(() => {
            form.resetFields();
            setIsModalOpen(false);
            setIsEdit(false);
            setInitialValues(null)
          });
      }
    });
  };

  useEffect(() => {
    if (initialValues && form) {
      form.setFieldsValue({
        gost_number: (initialValues && initialValues.gost_number) ? initialValues.gost_number : "",
        name: (initialValues && initialValues.name) ? initialValues.name : "",
      })
    }
  }, [initialValues]);


  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  }

  const footer = () => (
    <Flex style={{width:'100%'}} justify="flex-end" gap={16}>
      <Button type={'primary'} key="submit" onClick={handleOk}>Сохранить</Button>
    </Flex>
  )

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: '#111928'
          },

        },
        token: {
          colorBgContainer: '#F9FAFB',
          colorTextPlaceholder: '#6B7280'
        },
      }}
    >
      <Modal
        style={{minWidth: '640px'}}
        title={isEdit ? 'Редактировать запись' : 'Добавить запись'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
      >
        <Flex gap={16} vertical={true} align={'center'} style={{width:'100%'}}>
  
          <Flex style={{width: '100%'}}>
            <Form form={form}
              style={{width: '100%'}}
              onFinish={handleOk}
              requiredMark={true}
              layout={'vertical'}
              autoComplete="off">
              <Flex style={{width: '100%'}} gap={16} justify={'space-between'}>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'gost_number'}
                  label={<BoldLabel text={'ГОСТ'} />}
                  style={{width: '100%', marginBottom: '10px'}}>
                  <Input style={{height: '36px'}} placeholder='Введите ГОСТ'></Input>
                </Form.Item>
  
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'name'}
                  label={<BoldLabel text={'Название'} />}
                  style={{width: '100%', marginBottom: '10px'}}>
                  <Input style={{height: '36px'}} placeholder='Введите название'></Input>
                </Form.Item>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default Gostmodal;