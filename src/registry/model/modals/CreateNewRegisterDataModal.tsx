import {Button, ConfigProvider, Flex, Form, Input, Modal, Select, Switch, Tooltip, Typography} from "antd";
import {useModals, useProduct_Project, useRegister} from "../../../store.ts";
import {ContractData, DealData, GostData, ManagerData, OrganizationData} from "../../interfaces.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../../authStore.ts";
import BoldLabel from "../../../components/BoldLabel.tsx";
import TextArea from "antd/es/input/TextArea";

const CreateNewRegisterDataModal = () => {
  const [form] = Form.useForm();
  const creatingRegisterDataModalOpen = useModals(state => state.creatingRegisterDataModalOpen)
  const setCreatingRegisterDataModalOpen = useModals(state => state.setCreatingRegisterDataModalOpen)
  const {
    getDecimalNumber,
    dealsData,
    organizationsData,
    gostsData,
    managersData,
    registerData,
    setEditProductID,
    editProductID,
    setSuccessMessage: setSuccessMessageRegister,
    updateRegisterEntityData,
    contractsData,
    insertDecimalNumber,
    setError,
    insertRegisterEntityData} = useRegister()

  const isEditModeActive = useProduct_Project(state => state.isEditModeActive)
  const setIsEditModeActive = useProduct_Project(state => state.setIsEditModeActive)
  const setSuccessMessageProduct = useProduct_Project(state => state.setSuccessMessage)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const user = useAuth(state => state.user)
  const [dealChoice, setDealChoice] = useState<string | null>(null)
  const [organisationID, setOrganisationID] = useState<string | null>(null)
  const [curDecimalNumber, setCurDecimalNumber] = useState<string | null>(null)
  const [switchChecked, setSwitchChecked] = useState(false);

  const onFinish = (value) => {
    const pathName = window.location.pathname;
    const curOrganisationCode = organizationsData.find(el => el.id === organisationID).code;
    const isPageRegister = pathName.includes('registry');
    const status: 'draft' | 'in_work' = value.decimal_number ? 'in_work' : 'draft';
    const insertObj = {
      contract_id: value.contract_id,
      creator_name:  user ? `${user.given_name} ${user.family_name}` : "Иванов Иван",
      deal_id: dealsData?.find(el => value.deal_id == el.deal_number)?.id || null,
      decimal_number: value.decimal_number,
      gost_id: value.gost_id,
      main_architector_id: value.main_architector_id,
      status: status,
      sub_type: value.sub_type,
      type: value.dataType,
      organisation_implementer_id: value.developer,
      comment: value.comment
    };

    if (!isEditModeActive || (isEditModeActive && value.decimal_number)) {
      insertDecimalNumber(curOrganisationCode)
        .then(() => {
          if (!isEditModeActive) {
            insertRegisterEntityData(insertObj)
              .then(() => {
                handleClose();
                isPageRegister
                  ? setSuccessMessageRegister('Запись отредактирована')
                  : setSuccessMessageProduct('Запись отредактирована');
              });
          } else {
            const updateInsertObj = { ...insertObj, id: editProductID };
            updateRegisterEntityData(updateInsertObj)
              .then((id: string) => {
                console.info('Запись отредактирована', id);
                handleClose();
                isPageRegister
                  ? setSuccessMessageRegister('Запись отредактирована')
                  : setSuccessMessageProduct('Запись отредактирована');
              });
          }
        })
        .catch(() => {
          setError('Ошибка при добавлении децимального номера.')});
    } else {
      if (!isEditModeActive) {
        insertRegisterEntityData(insertObj)
          .then(() => {
            handleClose();
            isPageRegister
              ? setSuccessMessageRegister('Запись отредактирована')
              : setSuccessMessageProduct('Запись отредактирована');
          });
      } else {
        const updateInsertObj = { ...insertObj, id: editProductID };
        updateRegisterEntityData(updateInsertObj)
          .then((id: string) => {
            console.info('Запись отредактирована', id);
            handleClose();
            isPageRegister
              ? setSuccessMessageRegister('Запись отредактирована')
              : setSuccessMessageProduct('Запись отредактирована');
          });
      }
    }
  };

  const handleClose = () => {
    setEditProductID(null)
    setIsEditModeActive(false)
    setSwitchChecked(false)
    form.resetFields();
    setCreatingRegisterDataModalOpen(false)
    setOrganisationID(null)
    setDealChoice(null)
  }

  useEffect(() => {
    if (dealChoice) {
      form.setFieldsValue({
        product_namager: dealsData.find(deal => deal.deal_number === dealChoice)?.id,
        customer: dealsData.find(deal => deal.deal_number === dealChoice)?.customer
        // customer: dea
        // product_namager: 'e1e693fd-cadb-4d31-a1b5-9b47f931325e'
      },);
    }
  }, [ dealChoice, ],);

  useEffect(() => {
    if (isEditModeActive == true) {
      setOrganisationID(currentProdData.organization.id)
      let currentProduct = null
      if (currentProdData) {
        currentProduct = currentProdData
      } else if (registerData) {
        currentProduct = registerData.filter(el => el.id == editProductID)[0]
      }
      if (currentProduct && form) {
        form.setFieldsValue({
          dataType: currentProduct.type,
          deal_id: currentProduct.deal?.deal_number,
          product_namager: currentProduct.deal.id,
          sub_type: currentProduct.sub_type,
          gost_id: currentProduct.gost_id,
          contract_id: (currentProduct.contract && currentProduct.contract.id) ? currentProduct.contract.id : null,
          customer: (currentProduct.deal && currentProduct.deal.customer) ? currentProduct.deal.customer : null,
          developer: (currentProduct.organization) ? currentProduct.organization.id : null,
          main_architector_id: (currentProduct.manager_architector) ? currentProduct.manager_architector.id : null,
          decimal_number: (currentProduct.decimal_number) ? currentProduct.decimal_number : null,
          comment: currentProduct.comment || null
        // customer: dea
        // product_namager: 'e1e693fd-cadb-4d31-a1b5-9b47f931325e'
        },);
      }
    }
  }, [ isEditModeActive, ],);


  const handleCancel = () => {
    handleClose()
  }

  const handleChange = async (event) => {
    const curOrganisationCode = organizationsData.find(el => el.id == organisationID).code;
    if (curOrganisationCode && event) {
      if (curDecimalNumber) {
        form.setFieldsValue({
          decimal_number: curDecimalNumber,
        });
        setSwitchChecked(true);
      } else {
        const decimal_number = await getDecimalNumber(curOrganisationCode);
        setCurDecimalNumber(decimal_number);
        form.setFieldsValue({
          decimal_number,
        });
        setSwitchChecked(true);
      }
    } else {
      form.setFieldsValue({
        decimal_number: '',
      });
      setSwitchChecked(false);
    }
  };


  useEffect(() => {
    if (!curDecimalNumber && creatingRegisterDataModalOpen) {
      if (form) {
        form.setFieldsValue({
          decimal_number: ''
        })
      }
    }
  }, [curDecimalNumber]);

  useEffect(() => {
    setSwitchChecked(false);
    setCurDecimalNumber(null);
  }, [organisationID]);


  return (dealsData && organizationsData && gostsData && managersData && contractsData) ? (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            /* here is your component tokens */
          },
          Form: {
            labelColor: '#111928'
          },

        },
        token: {
          colorBgContainer: '#F9FAFB',
          colorTextPlaceholder: '#6B7280'
        },
      }}
    >
      <Modal
        style={{minWidth: '780px'}}
        title={isEditModeActive ? "Редактирование записи" : "Добавить запись"}
        open={creatingRegisterDataModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form}
          style={{paddingTop:'40px'}}
          onFinish={onFinish}
          name={'Создание продукта/объекта'}
          requiredMark={true}

          layout={'vertical'}
          autoComplete="off">
          <Flex vertical={true} style={{width:'100%'}}>
            <Flex gap={16}>
              <Flex vertical={true} style={{width:'100%'}}>
                <Form.Item
                  label={<BoldLabel text={'Проект/Продукт'} />} name="dataType" rules={[{ required: true, message: 'Выберите тип данных!' }]}>
                  <Select disabled={isEditModeActive} placeholder={'Выберите проект или продукт'}>
                    <Select.Option value={'project'}>Проект</Select.Option>
                    <Select.Option value={'product'}>Продукт</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={<BoldLabel text={'Номер сделки'} />} name="deal_id" rules={[{ required: true, message: 'Выберите номер сделки' }]}>
                  <Select showSearch disabled={!dealsData.length || isEditModeActive}  onSelect={(value) => {
                    setDealChoice(value)
                  }}  placeholder={dealsData.length ? 'Выберите номер сделки' : 'Отстутствует информация о сделках'}>
                    {dealsData.length ? dealsData
                      .map((deal: DealData) => (
                        <Select.Option key={deal.id} value={deal.deal_number}>{deal.deal_number}</Select.Option>
                      )) : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  // label="Руководитель проекта/владелец продукта" name="product_namager" rules={[{ required: true, message: 'Введите ФИО' }]}>
                  label={<BoldLabel text={'Руководитель проекта/владелец продукта'} />}  name="product_namager">
                  <Select disabled={true} placeholder={'Выберите руководителя проекта'}>
                    {dealsData.map((deal: DealData) => (
                      <Select.Option key={deal.id} value={deal.id}>{deal.project_manager}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label={<BoldLabel text={'Номер договора'} />} name="contract_id" >
                  <Select disabled={!contractsData.length} placeholder={contractsData.length ? 'Выберите номер договора' : 'Отстутствует информация о договорах'}>
                    {contractsData.length ? contractsData.map((contract: ContractData) => (
                      <Select.Option key={contract.id} value={contract.id}>{contract.contract_number}</Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={<BoldLabel text={'Децимальный номер'} />} name="decimal_number">
                  <Input disabled={(isEditModeActive && (!!currentProdData.decimal_number))} placeholder={'Введите номер'}></Input>
                </Form.Item>

                <Form.Item
                  label={<BoldLabel text={'Главный архитектор'} />} name="main_architector_id">
                  <Select disabled={!managersData.length} placeholder={managersData.length ? 'Выберите главного архитектора' : 'Отстутствует информация об инженерах'}>
                    {managersData.length ? managersData.map((manager: ManagerData) => (
                      <Select.Option key={manager.id} value={manager.id}>{manager.name}</Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>


              </Flex>
              <Flex vertical={true} style={{width:'100%'}}>
                <Form.Item
                  label={<BoldLabel text={'Тип проекта/продукта'} />} name="sub_type" rules={[{ required: true, message: 'Выберите тип проекта или продукта' }]}>
                  <Select disabled={isEditModeActive} placeholder={'Выберите тип проекта или продукта'}>
                    <Select.Option value={'program'}>Программный</Select.Option>
                    <Select.Option value={'sub_program'}>Программно-аппаратный</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item  label={<BoldLabel text={'Заказчик'} />} name="customer">
                  <Select  disabled={true} placeholder={organizationsData.length ? 'Выберите заказчика' : 'Отстутствует информация об организациях'}>
                    {organizationsData.length ? organizationsData.map((organization: OrganizationData) => (
                      <Select.Option key={organization.id} value={organization.id}>{organization.name}</Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={<BoldLabel text={'Исполнитель'} />} name="developer" rules={[{ required: true, message: 'Выберите исполнителя' }]}>
                  <Select
                    onSelect={(value) => {
                      setCurDecimalNumber(null)
                      setOrganisationID(value)
                    }}
                    disabled={!organizationsData.length || isEditModeActive}
                    placeholder={organizationsData.length ? 'Выберите исполнителя' : 'Отстутствует информация об организациях'}>
                    {organizationsData.length ? organizationsData.map((organization: OrganizationData) => (
                      <Select.Option key={organization.id} value={organization.id}>{organization.name}</Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={<BoldLabel text={'ГОСТ'} />}
                  name="gost_id"
                  rules={[{
                    required: isEditModeActive ? true : false,
                    message: 'Введите номер'
                  }]}>
                  <Select disabled={!gostsData.length} placeholder={organizationsData.length ? 'Выберите ГОСТ' : 'Отстутствует информация о ГОСТах'}>
                    {gostsData.length ? gostsData.map((gost: GostData) => (
                      <Select.Option key={gost.id} value={gost.id}>
                        <Tooltip placement="topLeft" title={gost.name}>
                          {gost.gost_number}
                        </Tooltip>
                      </Select.Option>
                    )) : null}
                  </Select>
                </Form.Item>

                <Flex gap={8} style={{paddingTop: '35px', marginBottom: 29}}>
                  <Switch
                    disabled={!organisationID || (isEditModeActive && (!!currentProdData.decimal_number))}
                    checked={switchChecked}
                    onChange={(checked) => {
                      setSwitchChecked(checked);
                      handleChange(checked);
                    }}
                  />
                  <Typography.Text strong>Назначить номер автоматически</Typography.Text>
                </Flex>

                <Form.Item
                  label={<BoldLabel text={'Комментарий'} />} name="comment">
                  <TextArea style={{height: '28px'}} />
                </Form.Item>
              </Flex>
            </Flex>

          </Flex>
          <Flex style={{width: '100%'}} justify={'flex-end'}>
            <Flex gap={16} style={{paddingTop: '24px'}}>
              <Button onClick={handleCancel}>Отменить</Button>
              <Button type="primary" htmlType="submit">Сохранить</Button>
            </Flex>
          </Flex>
        </Form>
      </Modal>
    </ConfigProvider>
  ) :      ( <Modal
    open={false} footer={null}>
    <Form form={form}></Form>
  </Modal>);
};

export default CreateNewRegisterDataModal;