import React from 'react';
import {Alert, Button, ConfigProvider, Flex, Form, Input} from "antd";
import {validateURL} from "../../../components/linkAntdValidator.ts";
import BoldLabel from "../../../components/BoldLabel.tsx";
interface ChooseDocumentFormProps {
  onCreate?: (values) => void,
  handleBack?: () => void,
}
const FinishedCreationAnotherDocumentForm:React.FC<ChooseDocumentFormProps> = ({onCreate, handleBack}) => {
  const [form,] = Form.useForm();
  const onFinish = (values,) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout={'vertical'}
      requiredMark={false}
      style={{width: '100%'}}>
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
          style={{color: 'red'}}
          description="Децимальный номер документа сформирован не будет"
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

export default FinishedCreationAnotherDocumentForm;