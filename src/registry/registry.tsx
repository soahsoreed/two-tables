import {App, Button, Flex, Input } from "antd";
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
import { items } from "./items.ts";

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

 

  return (
      <div className="main-page__container">

        <div className="main-page__flex-container">
          <div className="main-page__left">

            <div className="main-page__left-actions">
              <div className="main-page__left-actions-search">
                <Input
                  type='text'
                  id="search-input">
                  </Input>
              </div>

              <div className="main-page__left-actions-add">
                <Button>Add</Button>
              </div>
              
            </div>

            <div className="main-page__left-table">
              <table>
                <thead>
                  <tr>
                    <th>Is Selected?</th>
                    <th>
                      <span className='th-text'>Item ID</span>
                      <Button>Sort</Button>
                    </th>
                    <th>
                      <span className='th-text'>Item Name</span>
                      <Button>Sort</Button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  { items.map(item => {
                    return (
                      <tr>
                        <td> { String(item.isSelected) } </td>
                        <td> { item.id } </td>
                        <td> { item.name } </td>
                      </tr>
                    )
                  }) }
                </tbody>
              </table>
            </div>

           
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

