import './handbooks-page.scss';
import {App, Button, Flex, Tabs, TabsProps} from "antd"
import SystemHandbooks from "./components/system-handbooks/system-handbooks";
import CustomHandbooks from "./components/custom-handbooks/custom-handbooks";
import {useEffect, useState} from "react";
import { useHandbookModals } from './store/handbook-modals.state';
import {useOrganizationsHandbook} from "./store/organizations.state.ts";
import {useRegister} from "../store.ts";
import {useManagersHandbook} from "./store/managers.ts";
import HandbookModal from "./components/modals/handbook-modal.tsx";
import {useDealsHandbook} from "./store/deal.ts";
import {useContractsHandbook} from "./store/contracts.ts";
import {useGostHandbook} from "./store/gost.state.ts";
import {useGostDocumentsHandbook} from "./store/gost-documents.state.ts";

enum HandbookTabs {
      System = 'System',
  Custom = 'Custom',
}

   const items: TabsProps['items'] = [
  {
    key: HandbookTabs.System,
    label: 'Системные',
    children: <SystemHandbooks />,
  },
  {
    key: HandbookTabs.Custom,
    label: 'Пользовательские',
    children: <CustomHandbooks />,
  },
];


    function HandbooksPage() {
  const [activeTab, setActiveTab] = useState(HandbookTabs.System);const { successMessage: successMessageOrganisation, setSuccessMessage: setSuccessMessageOrganisation, error: errorOrganisation, setError: setErrorOrganisation } = useOrganizationsHandbook();
  const { successMessage: successMessageDeals, setSuccessMessage: setSuccessMessageDeals, error: errorDeals, setError: setErrorDeals } = useDealsHandbook();
  const { successMessage: successMessageManagers, setSuccessMessage: setSuccessMessageManagers, error: errorManagers, setError: setErrorManagers } = useManagersHandbook();
  const { successMessage: successMessageContracts, setSuccessMessage: setSuccessMessageContracts, error: errorContracts, setError: setErrorContracts } = useContractsHandbook();
  const { successMessage: successMessageGOSTs, setSuccessMessage: setSuccessMessageGOSTs, error: errorGOSTs, setError: setErrorGOSTs } = useGostHandbook();
  const { successMessage: successMessageGOSTsDocuments, setSuccessMessage: setSuccessMessageGOSTsDocuments, error: errorGOSTsDocuments, setError: setErrorGOSTsDocuments } = useGostDocumentsHandbook();

  const {setModalType, setIsModalOpen, setIsEdit, setInitialValues} = useHandbookModals()
  const { getDealsData, getGostsData } = useRegister()
  const { notification, } = App.useApp();

  const onTabChange = (newValue: HandbookTabs) => {
    switch (newValue) {
    case HandbookTabs.System:
      setModalType("Projects")
      break
    case HandbookTabs.Custom:
      setModalType("GOST")
      break
    }
              setActiveTab(newValue);
  }

  useEffect(() => {
    const successMessage = [
      successMessageOrganisation,
      successMessageManagers,
      successMessageDeals,
      successMessageContracts,
      successMessageGOSTs,
      successMessageGOSTsDocuments,
    ].find(Boolean);

    const errorMessage = [
      errorOrganisation,
      errorManagers,
      errorDeals,
      errorContracts,
      errorGOSTs,
      errorGOSTsDocuments,
    ].find(Boolean);

    if (successMessage) {
      notification.success({
        placement: 'bottom',
        message: null,
        description: successMessage,
        duration: 3,
        onClose: () => {
          setSuccessMessageOrganisation(null);
          setSuccessMessageManagers(null);
          setSuccessMessageDeals(null);
          setSuccessMessageContracts(null);
          setSuccessMessageGOSTs(null);
          setSuccessMessageGOSTsDocuments(null);
        },
      });
    }

    if (errorMessage) {
      showErrorNotification(errorMessage);
    }
  }, [
    successMessageOrganisation,
    successMessageManagers,
    successMessageDeals,
    successMessageContracts,
    successMessageGOSTs,
    successMessageGOSTsDocuments,
    errorOrganisation,
    errorManagers,
    errorDeals,
    errorContracts,
    errorGOSTs,
    errorGOSTsDocuments,
  ]);

  const showErrorNotification = (error: string) => {
    notification.error({
      message: 'Ошибка!',
      description: error,
      placement: 'bottom',
      onClose: () => {
        setErrorOrganisation(null);
        setErrorDeals(null);
        setErrorManagers(null);
        setErrorContracts(null);
        setErrorGOSTs(null);
        setErrorGOSTsDocuments(null);
      },
    });
  };

  useEffect(() => {
    setModalType("Projects")
    getGostsData()
    getDealsData()
  }, []);


  const getButtonByTab = (_: HandbookTabs) => {
    return (<Flex style={{padding:'8px 0'}}>
      <Button
        type={'primary'}
        style={{height: '36px'}}
        onClick={() => {
          setIsEdit(false)
          setInitialValues(null)
          setIsModalOpen(true)
        }}>
            Добавить
      </Button>
    </Flex>
    );
  }

  return (
    <div className="handbooks-page">
      <Tabs
        style={{padding: '0 24px', width: '100%'}}
        items={items}
        tabBarExtraContent={getButtonByTab(activeTab)}
        onChange={(item: HandbookTabs) => onTabChange(item)} />
      <HandbookModal  />
    </div>
  )
}
// background: '#fff', 

const MyApp: React.FC = () => (
  <App style={{height: '100vh'}}>
    <HandbooksPage />
  </App>
);

export default MyApp;
