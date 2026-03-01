import { Button, ConfigProvider, Flex, Form, Input, Modal } from "antd";
import BoldLabel from "../../../components/BoldLabel";
import { useProduct_Project } from "../../../store";
import {useEffect, useState} from "react";
import {GostDocumentObject, ProductDocumentsObject, UpdateDocumentInput} from "../../../registry/interfaces";

const UpdateDocumentModal = () => {
  const [form] = Form.useForm();
  const [currentDoc, setCurrentDoc] = useState<null | ProductDocumentsObject>(null)
  const { setUpdateDocumentModalOpen, getDocumentDecimalNumber, updateDocumentModalOpen, documentIDForUpdate, currentProdData, updateDocumentData } =
    useProduct_Project();

  const handleFormSubmit = async () => {
    try {
      const currentDoc = currentProdData?.register_entity_documents?.find((el) => el.id === documentIDForUpdate);
      const formValues = await form.validateFields();
      const docVolume = form.getFieldValue('volume') ||  currentDoc.gost_document?.volume || null
      const gostDocumentCode = currentDoc.gost_document?.code || null
      const decimal_number = await getDocumentDecimalNumber(
        currentProdData.decimal_number,
        formValues.additionalNumberExecution,
        formValues.partNumberExecution,
        formValues.partNumber,
        docVolume,
        gostDocumentCode
      )
      const updateObj: UpdateDocumentInput = {
        id: documentIDForUpdate,
        additionalNumberExecution: formValues.additionalNumberExecution,
        partNumber: formValues.partNumber,
        partNumberExecution: formValues.partNumberExecution,
        volume: formValues.volume,
        link: formValues.link,
        decimal_number: decimal_number ? decimal_number : null
      };

      await updateDocumentData(updateObj);
      form.resetFields();
      setUpdateDocumentModalOpen(false);
    } catch (err) {
      return null
    }
  };

  useEffect(() => {
    if (updateDocumentModalOpen && form && documentIDForUpdate) {
      const currentDoc = currentProdData?.register_entity_documents?.find((el) => el.id === documentIDForUpdate);
      if (currentDoc) {
        // console.log(currentDoc)
        form.setFieldsValue({
          name: currentDoc.name || (currentDoc.gost_document?.name ?? null),
          code: currentDoc.gost_document?.project_stage,
          volume: currentDoc.volume,
          link: currentDoc.link,
          partNumber: currentDoc.partNumber,
          partNumberExecution: currentDoc.partNumberExecution,
          additionalNumberExecution: currentDoc.additionalNumberExecution,
        });
      }
    }
  }, [updateDocumentModalOpen, form, documentIDForUpdate, currentProdData]);

  useEffect(() => {
    if (currentProdData && currentProdData.register_entity_documents && documentIDForUpdate) {
      const findDoc = currentProdData?.register_entity_documents?.find((el) => el.id === documentIDForUpdate)
      // console.log('нАЙДЕННЫЙ ДОКУМЕНТ', findDoc)
      setCurrentDoc(findDoc)
    }
  }, [documentIDForUpdate]);

  const handleCancel = () => {
    form.resetFields();
    setUpdateDocumentModalOpen(false);
  };

  const footer = () => (
    <Flex style={{ width: "100%", paddingBottom: 6, paddingTop: 13 }} justify="flex-end" gap={16}>
      <Button type={"primary"} key="submit" onClick={handleFormSubmit}>
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
            labelColor: "#111928",
            itemMarginBottom: 0,
          },
        },
        token: {
          colorBgContainer: "#F9FAFB",
          colorTextPlaceholder: "#6B7280",
        },
      }}
    >
      <Modal
        style={{ minWidth: "640px" }}
        title="Редактирование документа"
        open={updateDocumentModalOpen}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
        footer={footer()}
      >
        <Flex gap={16} vertical={true} align={"center"} style={{ width: "100%" }}>
          <Flex style={{ width: "100%" }}>
            <Form
              form={form}
              style={{ width: "100%" }}
              onFinish={handleFormSubmit}
              requiredMark={true}
              layout={"vertical"}
              autoComplete="off"
            >
              <Flex style={{ width: "100%", paddingTop: 39, paddingBottom: 24 }} vertical gap={16}>
                <Flex style={{ width: "100%" }} gap={16}>
                  <Form.Item name={"name"} label={<BoldLabel text={"Название"} />} style={{ width: "100%" }}>
                    <Input disabled />
                  </Form.Item>
                </Flex>
                { currentDoc?.gost_document ?
                 ( <Flex vertical gap={16}>
                    <Flex style={{width: "100%"}} gap={16}>
                      <Form.Item
                        name={"code"}
                        label={<BoldLabel text={"Код"}/>}
                        style={{width: "100%", maxWidth: "136px"}}
                      >
                        <Input disabled style={{height: "36px", maxWidth: "136px", width: "100%"}}/>
                      </Form.Item>
                      <Form.Item
                        name={"volume"}
                        rules={[
                          {
                            pattern: /^[1-9]$|^[1-9][0-9]$/,
                            message: 'Значение должно быть от 1 до 99',
                          },
                        ]}
                        label={<BoldLabel text={"Том"}/>}
                        style={{width: "100%", maxWidth: "136px"}}
                      >
                        <Input style={{height: "36px", maxWidth: "136px", width: "100%"}}/>
                      </Form.Item>
                      <Form.Item
                        name={"partNumber"}
                        rules={[
                          {
                            pattern: /^[1-9]$|^[1-9][0-9]$/,
                            message: 'Значение должно быть от 1 до 99',
                          },
                        ]}
                        label={<BoldLabel text={"Номер части документа"}/>}
                        style={{width: "100%"}}
                      >
                        <Input style={{height: "36px", width: "100%"}}/>
                      </Form.Item>
                    </Flex>
                    <Flex style={{width: "100%"}} gap={16}>
                      <Form.Item
                        name={"partNumberExecution"}
                        rules={[
                          {
                            pattern: /^[1-9]$|^[1-9][0-9]$/,
                            message: 'Значение должно быть от 1 до 99',
                          },
                        ]}
                        label={<BoldLabel text={"Порядковый номер исполнения"}/>}
                        style={{width: "100%"}}
                      >
                        <Input style={{height: "36px", width: "100%"}}/>
                      </Form.Item>
                      <Form.Item
                        name={"additionalNumberExecution"}
                        rules={[
                          {
                            pattern: /^[1-9]$|^[1-9][0-9]$/,
                            message: 'Значение должно быть от 1 до 99',
                          },
                        ]}
                        label={<BoldLabel text={"Дополнительный номер исполнения"}/>}
                        style={{width: "100%"}}
                      >
                        <Input style={{height: "36px", width: "100%"}}/>
                      </Form.Item>
                    </Flex>
                  </Flex>) :
                null}


                <Form.Item name={"link"} label={<BoldLabel text={"Ссылка"} />} style={{ width: "100%" }}>
                  <Input style={{ height: "36px", width: "100%" }} />
                </Form.Item>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  );
};

export default UpdateDocumentModal;
