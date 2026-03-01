import React from 'react';
import {Button, Flex, Form, Input} from "antd";
import {useProduct_Project} from "../../../store.ts";
import BoldLabel from "../../../components/BoldLabel.tsx";

interface ChooseDocumentFormProps {
  onCreate?: (values) => void,
  handleBack?: () => void
}

const AnotherDocumentCreationForm:React.FC<ChooseDocumentFormProps> = ({onCreate, handleBack}) => {
  const [form,] = Form.useForm();
  const setNewDocumentName = useProduct_Project(state => state.setNewDocumentName)
  const onFinish = (values,) => {
    const documentType = form.getFieldValue('documentName')
    setNewDocumentName(documentType)
    onCreate(values.newDocumentType);
    form.resetFields();
  };

  const handleChange = () => {
    // const documentType = form.getFieldValue('newDocumentType')
    // setNewDocumentName(documentType)
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onChange={handleChange}
      layout={'vertical'}
      requiredMark={false}
      style={{width: '100%'}}>
      <Form.Item label={<BoldLabel text={'Название'} />} name="documentName"
        rules={[ { required: true, message: 'Введите название документа!', }, ]}>
        <Input style={{height: '40px'}} placeholder={'Введите название'}></Input>
      </Form.Item>
      <Form.Item style={{ width:'100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0px' }}>
        <Flex gap={12}>
          <Button onClick={handleBack}>Назад</Button>
          <Button style={{padding: '8px 12px'}}  type="primary" htmlType="submit" >Далее
            {/*<ArrowRight />*/}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default AnotherDocumentCreationForm;