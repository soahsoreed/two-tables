import { Button, Flex, Form, Modal, Input, ConfigProvider } from "antd";
import { useManagersHandbook } from "../../../../store/managers";
import { useHandbookModals } from "../../../../store/handbook-modals.state";
import BoldLabel from "../../../../../components/BoldLabel.tsx";
import {useEffect} from "react";

const ManagerModal: React.FC = () => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen, setInitialValues, setIsEdit, initialValues, isEdit } = useHandbookModals();
  const { createData, updateData } = useManagersHandbook();

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
        name: (initialValues && initialValues.name) ? initialValues.name : "",
        email: (initialValues && initialValues.email) ? initialValues.email : ""
      })
    }
  }, [initialValues]);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const footer = (
    <Flex justify="flex-end" gap={16}>
      <Button type="primary" onClick={handleOk}>
        Сохранить
      </Button>
    </Flex>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {},
          Form: {
            labelColor: "#111928",
          },
        },
        token: {
          colorBgContainer: "#F9FAFB",
          colorTextPlaceholder: "#6B7280",
        },
      }}
    >
      <Modal
        style={{ minWidth: "420px", width: "420px" }}
        title={isEdit ? "Редактировать запись" : "Добавить запись"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
      >
        <Flex gap={16} vertical align="center" style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }}>
            <Form
              form={form}
              style={{ width: "100%" }}
              onFinish={handleOk}
              requiredMark
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="name"
                label={<BoldLabel text="ФИО" />}
                rules={[{ required: true, message: "Обязательное поле" }]}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <Input placeholder="Введите ФИО" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<BoldLabel text="Email" />}
                rules={[
                  { required: true, message: "Обязательное поле" },
                  { type: "email", message: "Введите корректный email" },
                ]}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <Input placeholder="Введите email" />
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default ManagerModal;
