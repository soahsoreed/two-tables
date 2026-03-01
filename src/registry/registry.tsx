import {App, Button, Flex, Tabs, TabsProps} from "antd";
import {PlusOutlined, RedoOutlined} from "@ant-design/icons";
import TableRegistryAll from "./model/TableRegistryAll.tsx";
import CreateNewRegisterDataModal from "./model/modals/CreateNewRegisterDataModal.tsx";
import {useModals, useRegister} from "../store.ts";
import './style/registry.modules.css'
import React, {useEffect} from "react";
import {defaultRegisterFilterObject, useRegisterFilters} from "../components/store/useFiltersStore.ts";
import {useAuth} from "../authStore.ts";
import {useNavigate} from "react-router-dom";
import {getRefreshToken} from "../auth/token-access.ts";

function RegistryPage() {
  const { notification, } = App.useApp();
  const navigate = useNavigate()
  const {logOut} = useAuth()
  const { setCreatingRegisterDataModalOpen } = useModals((state) => ({
    setCreatingRegisterDataModalOpen: state.setCreatingRegisterDataModalOpen,
  }));
  const { setRegisterFilterObject}  = useRegisterFilters()

  // Register Data
  const {
    getRegisterData,
    getDealsData,
    getOrganizationsData,
    getGostsData,
    getManagersData,
    getContractsData,
    successMessage,
    isSuccessUses,
    setSuccessMessage,
    setIsSuccessUses,
    error,
    setError
  } = useRegister();

  useEffect(() => {
    getRegisterData()
    getDealsData()
    getOrganizationsData()
    getGostsData()
    getManagersData()
    getContractsData()
  }, []);

  useEffect(() => {
    if (!getRefreshToken) {
      try {
        logOut()
      } catch (_) {
        return
      } finally {
        navigate('/login')
      }
    }
  }, []);


  const openSuccessNotification = (description: string,) => {
    getRegisterData();
    notification.success({
      message: null,
      className: 'addGroupNotification',
      placement: 'bottom',
      // message: 'Успешно!',
      description: description,
      duration: 1.5,
      style: {
        width: '353px',
      },
      onClose: () => {
        setSuccessMessage(null,);
        setIsSuccessUses(false,);
      }
    },);
  };

  useEffect(() => {
    if (successMessage && !isSuccessUses) {
      setIsSuccessUses(true,);
      openSuccessNotification(successMessage,);
    }
  }, [ successMessage, isSuccessUses, ],);

  const showErrorNotification = (error: string,) => {
    notification.error({
      message: 'Ошибка!',
      description: error,
      placement:'bottom',
      onClose: () => setError(null,),
    },);
  };

  useEffect(() => {
    if (typeof error === 'string') {
      showErrorNotification(error)
    }

  }, [ error ])



  const addButton = <Flex style={{padding:'8px 0'}} gap={8}>
    <Button type={'primary'}
      onClick={() => setCreatingRegisterDataModalOpen(true)}
      style={{height: '36px'}}>Добавить<PlusOutlined /></Button>
    <Button
      style={{height: '36px'}}
      onClick={() => {
        try {
          setRegisterFilterObject(defaultRegisterFilterObject)
        } finally {
          location.reload()
        }

      }}
      // style={{border: "none", background: 'transparent', boxShadow: 'none'}}
    >
      <RedoOutlined style={{fontSize: '16px'}} />
      Сброс фильтров
    </Button>
  </Flex>

  const items = [
    {
      id: 1,
      name: 'Item 1',
      isSelected: false
    },
    {
      id: 2,
      name: 'Item 2',
      isSelected: true
    },
    {
      id: 3,
      name: 'Item 3',
      isSelected: false
    },
  ];

  return (
      <div className="main-page__container">

        <div className="main-page__flex-container">
          <div className="main-page__left">
            <table>
              <thead>
                <tr>
                  <th>Is Selected?</th>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                { items.map(item => {
                  return (
                    <tr>
                      <td> { item.isSelected } </td>
                      <td> { item.id } </td>
                      <td> { item.name } </td>
                      <td>
                        <Button>Sort</Button>
                      </td>
                    </tr>
                  )
                }) }
              </tbody>
            </table>
          </div>

          <div className="main-page__right">
            Right
          </div>
        </div>

      </div>
    // </Flex>
  )
}

const MyApp: React.FC = () => (
  <App>
    <RegistryPage />
  </App>
);

export default MyApp;

