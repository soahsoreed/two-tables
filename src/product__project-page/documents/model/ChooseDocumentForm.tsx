import {Button, Flex, Form, Radio, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useProduct_Project} from "../../../store.ts";

interface ChooseDocumentFormProps {
  onCreate?: (values) => void
}

const ChooseDocumentForm: React.FC<ChooseDocumentFormProps> = ({onCreate}) => {
  const [documentType, setDocumentType] = useState(null);
  const newDocumentType = useProduct_Project(state => state.newDocumentType)
  const setNewDocumentType = useProduct_Project(state => state.setNewDocumentType)
  const {setNewDocumentName} = useProduct_Project()
  const [form,] = Form.useForm();

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  }

  const onFinish = (values,) => {
    onCreate(values.newDocumentType);
    form.resetFields();
  };

  const handleChange = () => {
    const documentType = form.getFieldValue('newDocumentType')
    setNewDocumentType(documentType)
    if (documentType === "gost") {setNewDocumentName(null)}
  }

  useEffect(() => {
    form.setFieldsValue({
      newDocumentType: newDocumentType ? newDocumentType : null
    });
  }, [newDocumentType]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        onChange={handleChange}
        style={{width: '100%'}}
      >
        <Form.Item
          // initialValue={extensionLicenseData ? extensionLicenseData.organization.id : null}
          name="newDocumentType"
          rules={[ { required: true, message: 'Выберите тип документа!', }, ]}
        >
          <Radio.Group  style={{width: '100%'}} onChange={handleDocumentTypeChange} value={documentType}>
            <Flex style={{width: '100%'}} justify={'space-between'}>
              <Flex style={{padding: '8px', borderRadius: '8px', color:  newDocumentType == 'gost' ? '#FFF' :'#111928',
                background: newDocumentType == 'gost' ? '#1C64F2' :'#F3F4F6' ,width: '288px'}}>
                <Flex vertical={true}>
                  <Radio value="gost" style={{color:  newDocumentType == 'gost' ? '#FFF' :'#111928'}}>Документ ГОСТ</Radio>
                  <Flex style={{paddingLeft: '24px'}}>
                    <Typography.Text style={{color:  newDocumentType == 'gost' ? '#E1EFFE' :'#6B7280'}} type={'secondary'}>
                      Документ требующий формирования децимального номера
                    </Typography.Text>
                  </Flex>

                </Flex>

              </Flex>
              <Flex style={{padding: '8px', borderRadius: '8px',
                background: newDocumentType == 'another' ? '#1C64F2' :'#F3F4F6' ,width: '288px'}}>
                <Flex  vertical={true} >
                  <Radio value="another" style={{color:  newDocumentType == 'another' ? '#FFF' :'#111928'}}>Другой документ</Radio>
                  <Flex style={{paddingLeft: '24px'}}>
                    <Typography.Text style={{color:  newDocumentType == 'another' ? '#E1EFFE' :'#6B7280'}} type={'secondary'}>
                      Документ не требующий формирования децимального номера
                    </Typography.Text>
                  </Flex>

                </Flex>

              </Flex>
            </Flex>


          </Radio.Group>
        </Form.Item>
        <Form.Item style={{ width:'100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0px' }}>
          <Button style={{ marginLeft: '16px', }} type="primary" htmlType="submit">Далее</Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default ChooseDocumentForm;