import {Button, Flex, Form, Modal, Input, ConfigProvider, DatePicker, Select} from "antd";
import {useHandbookModals} from "../../../store/handbook-modals.state.ts";
import BoldLabel from "../../../../components/BoldLabel.tsx";
import {useRegister} from "../../../../store.ts";
import {useContractsHandbook} from "../../../store/contracts.ts";
import {useEffect} from "react";
import dayjs from "dayjs";

const NewContractsModal = () => {
  const [form] = Form.useForm();

  const organizationsData = useRegister(state => state.organizationsData)
  const { isModalOpen, setIsModalOpen, setInitialValues, setIsEdit, initialValues, isEdit } = useHandbookModals();
  const { createData, updateData } = useContractsHandbook();


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
        contract_number: (initialValues && initialValues.contract_number) ? initialValues.contract_number : "",
        developer_organization_id: (initialValues && initialValues.developer_organization_id) ? initialValues.developer_organization_id : "",
        counterparty: (initialValues && initialValues.counterparty) ? initialValues.counterparty : "",
        date_start: (initialValues && initialValues.date_start) ? dayjs(initialValues.date_start) : "",
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
        style={{ minWidth: '640px' }}
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
                  name={'contract_number'}
                  label={<BoldLabel text={'Номер договора'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите номер договора"></Input>
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'developer_organization_id'}
                  label={<BoldLabel text={'Организация'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Select  placeholder={(organizationsData && organizationsData.length) ? 'Выберите организацию' : 'Отстутствует информация об организациях'}>
                    {(organizationsData && organizationsData.length) ? organizationsData.map((organisations) => (
                      <Select.Option key={organisations.id} value={organisations.id}>{organisations.name}</Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>
              </Flex>

              <Flex style={{ width: '100%' }} gap={16} justify={'space-between'}>
                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'counterparty'}
                  label={<BoldLabel text={'Контрагент'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите контрагента"></Input>
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                  name={'date_start'}
                  label={<BoldLabel text={'Дата начала договора'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <DatePicker format={'DD.MM.YYYY'} style={{ width: '100%', height: '36px' }} />
                </Form.Item>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default NewContractsModal;