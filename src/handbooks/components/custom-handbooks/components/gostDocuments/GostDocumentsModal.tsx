import {Button, Flex, Form, Modal, Input, Select, ConfigProvider, Tooltip, Typography} from "antd";
import { useGostDocumentsHandbook } from "../../../../store/gost-documents.state";
import { useHandbookModals } from "../../../../store/handbook-modals.state";
import BoldLabel from "../../../../../components/BoldLabel.tsx";
import {useRegister} from "../../../../../store.ts";
import {useEffect} from "react";

const GostDocumentsModal = () => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen, setInitialValues, setIsEdit, initialValues, isEdit } = useHandbookModals();
  const { createData, updateData } = useGostDocumentsHandbook()
  const { gostsData } = useRegister()

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
        gostId: (initialValues && initialValues.gost.id) ? initialValues.gost.id : "",
        project_stage: (initialValues && initialValues.project_stage) ? initialValues.project_stage : "",
        code: (initialValues && initialValues.code) ? initialValues.code : "",
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
      <Button type={'primary'} key="submit" onClick={handleOk} >Сохранить</Button>
    </Flex>
  )

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: '#111928',
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
              <Flex style={{width: '100%'}} gap={16}>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'gostId'}
                  label={<BoldLabel text={'ГОСТ'} />}
                  style={{width: '33.3%', marginBottom: '10px'}}>
                  <Select  placeholder={'Выберите ГОСТ'} style={{width: '100%', height: '36px'}}>
                    {
                      gostsData ? gostsData.map((el) => (
                        <Select.Option style={{textOverflow: 'ellipsis'}} value={el.id} key={el.id}>
                          <Tooltip title={el.name}>
                            <Typography.Text style={{textOverflow: 'ellipsis'}} strong>{el.gost_number}</Typography.Text>

                            {/*<Typography.Text style={{textOverflow: 'ellipsis'}} >{' / ' + el.name}</Typography.Text>*/}
                          </Tooltip>
                        </Select.Option>
                      )) : null
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'project_stage'}
                  label={<BoldLabel text={'Стадия проекта'} />}
                  style={{width: '33.3%', marginBottom: '10px'}}>
                  <Input style={{height: '36px'}} placeholder='Введите стадию проекта'></Input>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'code'}
                  label={<BoldLabel text={'Код'} />}
                  style={{width: '33.3%', marginBottom: '10px'}}>
                  <Input style={{height: '36px'}} placeholder='Введите код'></Input>
                </Form.Item>
              </Flex>
              <Form.Item
                rules={[{ required: true, message: 'Обязательное поле' }]} 
                name={'name'}
                label={<BoldLabel text={'Название'} />}
                style={{width: '100%', marginBottom: '10px'}}>
                <Input style={{height: '36px'}} placeholder='Введите название'></Input>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default GostDocumentsModal;