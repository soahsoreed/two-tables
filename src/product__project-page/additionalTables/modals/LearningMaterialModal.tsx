import {Button, Flex, Form, Modal, Input, ConfigProvider } from "antd";

import dayjs from "dayjs";
import BoldLabel from "../../../components/BoldLabel.tsx";
import {useAdditionalTablesModals} from "../store/additionalTablesModalsStore.ts";
import {useLearningMaterials} from "../store/learningMaterialsStore.ts";
import {useAuth} from "../../../authStore.ts";
import {getUserName} from "../../../components/getUserName.ts";
import {useProduct_Project} from "../../../store.ts";
import TextArea from "antd/es/input/TextArea";

const LearningMaterialModal = () => {
  const [form] = Form.useForm();
  const { setIsModalOpen, isModalOpen, setIsEdit, setInitialValues, isEdit, initialValues} = useAdditionalTablesModals()
  const {updateData, createData} = useLearningMaterials()
  const {currentProdData} = useProduct_Project()

  const { user } = useAuth()

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        updateData(initialValues!.id!, values).finally(() => {
          form.resetFields();
          setIsModalOpen(false);
        });
      } else {
        const creator_name = getUserName(user)
        const entity_id = currentProdData.id
        const insObj = {
          register_entity_id: entity_id,
          creator_name: creator_name,
          created_at: dayjs(),
          ...values
        }
        // console.log(entity_id, insObj)
        createData(insObj)
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

  // useEffect(() => {
  //   if (initialValues && form) {
  //     form.setFieldsValue({
  //       comment: (initialValues && initialValues.comment) ? initialValues.comment : "",
  //       link: (initialValues && initialValues.link) ? initialValues.link : "",
  //       creator_name: (initialValues && initialValues.creator_name) ? initialValues.creator_name : "",
  //       created_at: (initialValues && initialValues.created_at) ? dayjs(initialValues.created_at) : "",
  //     })
  //   }
  // }, [initialValues]);

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
              <Flex vertical style={{ width: '100%' }} gap={16}>
                <Form.Item
                  rules={[
                    { required: true, message: "Обязательное поле" },
                    { type: "url", message: "Введите корректное значение" },
                  ]}
                  name={'link'}
                  label={<BoldLabel text={'Ссылка'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <Input style={{ height: '36px' }} placeholder="Введите значение"></Input>
                </Form.Item>

                <Form.Item
                  name={'comment'}
                  label={<BoldLabel text={'Комментарий'} />}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <TextArea placeholder="Введите значение"></TextArea>
                </Form.Item>
              </Flex>

            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default LearningMaterialModal;