import {Button, Flex, Form, Modal, Input, ConfigProvider, DatePicker} from "antd";
import {useHandbookModals} from "../../../store/handbook-modals.state.ts";
import BoldLabel from "../../../../components/BoldLabel.tsx";
import {useDealsHandbook} from "../../../store/deal.ts";
import {useEffect} from "react";
import dayjs from "dayjs";

const NewDealModal = () => {
  const [form] = Form.useForm();

  const { isModalOpen, setIsModalOpen, setInitialValues, setIsEdit, initialValues, isEdit } = useHandbookModals();
  const { createData, updateData } = useDealsHandbook();

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
        deal_number: (initialValues && initialValues.deal_number) ? initialValues.deal_number : "",
        started_at: (initialValues && initialValues.started_at) ? dayjs(initialValues.started_at) : "",
        project_manager: (initialValues && initialValues.project_manager) ? initialValues.project_manager : "",
        customer: (initialValues && initialValues.customer) ? initialValues.customer : "",
      })
    }
  }, [initialValues]);


  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const footer = () => (
    <Flex style={{ width: '100%' }} justify="flex-end" gap={16}>
      <Button type={'primary'} key="submit" onClick={handleOk}>
        Сохранить
      </Button>
    </Flex>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            /* here is your component tokens */
          },
          Form: {
            labelColor: '#111928',
          },
        },
        token: {
          colorBgContainer: '#F9FAFB',
          colorTextPlaceholder: '#6B7280',
        },
      }}
    >
      <Modal
        style={{ minWidth: '740px' }}
        title={isEdit ? 'Редактировать запись' : 'Добавить запись'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
      >
        <Flex gap={16} vertical={true} align={'center'} style={{ width: '100%' }}>
          <Flex style={{ width: '100%' }}>
            <Form
              form={form}
              style={{ width: '100%' }}
              onFinish={handleOk}
              requiredMark={true}
              layout={'vertical'}
              autoComplete="off"
            >
              <Flex style={{ width: '100%' }} gap={16} justify={'space-between'}>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'deal_number'}
                  label={<BoldLabel text={'Номер сделки'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите номер"></Input>
                </Form.Item>
                <Form.Item
                  name={'started_at'}
                  label={<BoldLabel text={'Дата сделки'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <DatePicker style={{ width: '100%' }} format={'DD.MM.YYYY'} />
                </Form.Item>

              </Flex>

              <Flex style={{ width: '100%' }} gap={16} justify={'space-between'}>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'customer'}
                  label={<BoldLabel text={'Заказчик'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите название"></Input>
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'project_manager'}
                  label={<BoldLabel text={'Руководитель проекта/продукта'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите ФИО"></Input>
                </Form.Item>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default NewDealModal;