import React, {useEffect} from 'react';
import {Alert, Button, ConfigProvider, Flex, Form, Input} from "antd";
import {useProduct_Project} from "../../../store.ts";
import {useHandbooksV2} from "../../../handbooks/store/handbookStoreV2.ts";
import {validateURL} from "../../../components/linkAntdValidator.ts";
import BoldLabel from "../../../components/BoldLabel.tsx";

interface ChooseDocumentFormProps {
  onCreate?: (values) => void,
  handleBack?: () => void,
}
const FinishedCrationGostDocumentForm   :React.FC<ChooseDocumentFormProps> = ({onCreate, handleBack}) => {
  const [form,] = Form.useForm();
  // const setNewDocumentName = useProduct_Project(state => state.setNewDocumentName)
  const gostDocumentData = useHandbooksV2(state => state.gostDocumentData)
  const gostDocumentIDForNewDoc = useProduct_Project(state => state.gostDocumentIDForNewDoc)

  const onFinish = (values,) => {
    onCreate(values);
    form.resetFields();
  };

  useEffect(() => {
    const currentDoc = gostDocumentData.filter(el => el.id === gostDocumentIDForNewDoc)[0]
    form.setFieldsValue({
      name: currentDoc ? currentDoc.name : null,
      code: currentDoc ? currentDoc.code : null,
    },);
  }, [ gostDocumentIDForNewDoc ],);



  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout={'vertical'}
      requiredMark={false}
      style={{width: '100%'}}>
      <Flex gap={16} justify={'space-between'} style={{width: '100%'}}>
        <Form.Item style={{width: '100%'}} label={<BoldLabel text={'Название'} />} name="name">
          <Input disabled style={{height: '40px'}} ></Input>
        </Form.Item>
        <Form.Item style={{maxWidth: '136px'}} label={<BoldLabel text={'Код'} />} name="code">
          <Input disabled style={{height: '40px'}}></Input>
        </Form.Item>
        <Form.Item
          style={{ maxWidth: '136px' }}
          label={<BoldLabel text={'Том'} />}
          name="tom"
          rules={[
            {
              pattern: /^[1-9]$|^[1-9][0-9]$/,
              message: 'Значение должно быть от 1 до 99',
            },
          ]}
        >
          <Input style={{ height: '40px' }}></Input>
        </Form.Item>
      </Flex>
      <Form.Item label={<BoldLabel text={'Ссылка на документ'} />} name="documentLink"          rules={[
        { validator: validateURL, message: 'Введите корректную ссылку' }
      ]}>
        <Input style={{height: '40px'}} placeholder={'Вставьте ссылку'}></Input>
      </Form.Item>
      <ConfigProvider
        theme={{
          token: {
            colorText: '#1E429F'
          },
        }}
      >
        <Alert
          description="Децимальный номер документа будет сформирован автоматически"
          type="info"
          showIcon
        />
      </ConfigProvider>

      <Form.Item style={{ width:'100%', display: 'flex', justifyContent: 'flex-end', marginTop: '32px', marginBottom: '0px' }}>
        <Flex gap={12}>
          <Button  onClick={() => handleBack()}>Назад</Button>
          <Button style={{padding: '8px 12px'}}  type="primary" htmlType="submit" >Далее
            {/*<ArrowRight />*/}
          </Button>
        </Flex>
      </Form.Item>
    </Form>

  );
};

export default FinishedCrationGostDocumentForm;