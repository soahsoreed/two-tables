import React, {useEffect} from 'react';
import {Button, Flex, Form, Select, Tooltip, Typography} from "antd";
import {useProduct_Project, useRegister} from "../../../store.ts";
import ChooseGostDocumentTable from "./ChooseGostDocumentTable.tsx";

interface ChooseDocumentFormProps {
  onCreate?: (values) => void,
  handleBack?: () => void
}

const GostDocumentCreationForm: React.FC<ChooseDocumentFormProps> = ({onCreate, handleBack}) => {
  const [form,] = Form.useForm();
  const gostsData = useRegister(state => state.gostsData)
  const gostDocumentIDForNewDoc = useProduct_Project(state => state.gostDocumentIDForNewDoc)
  const setGostIDForNewDoc = useProduct_Project(state => state.setGostIDForNewDoc)
  const gostIDForNewDoc = useProduct_Project(state => state.gostIDForNewDoc)

  useEffect(() => {
    form.setFieldsValue({
      gost: gostIDForNewDoc ? gostIDForNewDoc : null
    });
  }, [gostIDForNewDoc]);

  const onFinish = (values,) => {
    setGostIDForNewDoc(values.gost)
    onCreate(values.newDocumentType);
    form.resetFields();
  };

  // const handleChange = () => {
  //   const documentType = form.getFieldValue('newDocumentType')
  //   // setNewDocumentType(documentType)
  // }

  return (
    <Flex style={{width:'100%'}}>
      <Form
        form={form}
        onFinish={onFinish}
        // onChange={handleChange}
        style={{width: '100%'}}
      >
        <Form.Item
          style={{width: '100%'}}
          rules={[{ required: true, message: 'Выберите ГОСТ' }]}
          name={'gost'} >
          <Select onChange={(value) => setGostIDForNewDoc(value)} placeholder={'Выберите ГОСТ'} style={{width: '100%'}}>
            {
              gostsData.map((el) => (

                <Select.Option value={el.id} key={el.id}>
                  <Tooltip title={el.name}>
                    <Typography.Text strong>{el.gost_number}</Typography.Text>

                    <Typography.Text>{' / ' + el.name}</Typography.Text>
                  </Tooltip>
                </Select.Option>

              ))
            }
          </Select>
        </Form.Item>
        {gostIDForNewDoc ? <ChooseGostDocumentTable/> : null}
        <Flex style={{ width:'100%', display: 'flex', justifyContent: 'flex-end', }}>
          <Flex gap={12}>
            <Button onClick={handleBack}>Назад</Button>
            <Button style={{padding: '8px 12px'}} disabled={!gostDocumentIDForNewDoc}  type="primary" htmlType="submit" >
              Далее
              {/*<ArrowRight />*/}
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default GostDocumentCreationForm;