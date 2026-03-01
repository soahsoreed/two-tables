import {App, Button, ConfigProvider, Flex, Tabs, TabsProps, Typography} from "antd";
import ProductInfoWidget from "./model/ProductInfoWidget.tsx";
import ProductHeaderControlPanel from "./model/ProductHeaderControlPanel.tsx";
import ProductDocumentsTable from "./model/ProductDocumentsTable.tsx";
import ProductTableHeaderControl from "./model/ProductTableHeaderControl.tsx";
import EduMaterialsTable from "./model/EduMaterialsTable.tsx";
import MarketingMaterialsTable from "./model/MarketingMaterialsTable.tsx";
import WorkspaceTable from "./model/WorkspaceTable.tsx";
// import SourceCodeTable from "./model/SourceCodeTable.tsx";
// import SpokespersonsTable from "./model/SpokespersonsTable.tsx";
import './style/prod-page.css'
import DeleteProjectModals from "./model/modals/DeleteProjectModals.tsx";
import FinishedProjectModal from "./model/modals/FinishedProjectModal.tsx";
import DeleteMaterialModal from "./model/modals/DeleteMaterialModal.tsx";
// import {DeleteFilled, DeleteOutlined} from "@ant-design/icons";
import DeleteWidget from "./model/DeleteWidget.tsx";
import {ArrowLeft} from "flowbite-react-icons/outline";
import {useEffect} from "react";
import {useProduct_Project, useRegister} from "../store.ts";
import { useParams} from "react-router-dom";
import Spinner from "../components/Spinner.tsx";
import CreateNewDocumentModal from "./documents/modals/CreateNewDocumentModal.tsx";
import {useHandbooksV2} from "../handbooks/store/handbookStoreV2.ts";
import CreateNewRegisterDataModal from "../registry/model/modals/CreateNewRegisterDataModal.tsx";
import UpdateDocumentModal from "./documents/modals/UpdateDocumentModal.tsx";
import {dateFormatter} from "../components/scripts/dateFormatter.ts";
import {
  useAdditionalTablesModals
} from "./additionalTables/store/additionalTablesModalsStore.ts";
import CurCreateAdditionalTableModal from "./additionalTables/model/CurCreateAdditionalTableModal.tsx";
import {useLearningMaterials} from "./additionalTables/store/learningMaterialsStore.ts";
import {useMarketingMaterials} from "./additionalTables/store/marketingMaterialsStore.ts";
import {useWorkspace} from "./additionalTables/store/workspaceStore.ts";
function ProdtPage() {
  const getGostDocumentData = useHandbooksV2(state => state.getGostDocumentData)
  const {currentProdData,
    getCurrentProdData, isSuccessUses,
    successMessage: successMessageProd,
    setSuccessMessage: setSuccessMessageProd} = useProduct_Project()
  const {
    getGostsData,
    getRegisterData,
    getDealsData,
    getOrganizationsData,
    getManagersData,
    getContractsData,setSuccessMessage,
    error,
    setError
  } = useRegister()

  const {
    successMessage: successMessageLearningMaterials,
    setSuccessMessage: setSuccessMessageLearningMaterials
  } = useLearningMaterials()

  const {
    successMessage: successMessageMarketingMaterials,
    setSuccessMessage: setSuccessMessageMarketingMaterials
  } = useMarketingMaterials()

  const {
    successMessage: successMessageWorkspace,
    setSuccessMessage: setSuccessMessageWorkspace
  } = useWorkspace()

  const { setModalType } = useAdditionalTablesModals()
  const { notification, } = App.useApp();
  const id = useParams();

  const tabChangeHandle =  (key: string) => {
    setModalType(key)
  }


  useEffect(() => {
    setModalType('documents')
    getCurrentProdData(id.id)
    getGostsData()
    getGostDocumentData()

    getRegisterData()
    getDealsData()
    getOrganizationsData()
    getManagersData()
    getContractsData()

  }, []);

  const openSuccessNotification = (description: string,) => {
    getCurrentProdData(id.id)
    notification.success({
      className: 'addGroupNotification',
      placement: 'bottom',
      message: null,
      description: description,
      duration: 1.5,
      style: {
        width: '353px',
      },
      onClose: () => {
        setSuccessMessage(null,);
        setSuccessMessageProd(null,);
        setSuccessMessageLearningMaterials(null);
        setSuccessMessageMarketingMaterials(null)
        setSuccessMessageWorkspace(null)
      },
    },);
  };

  useEffect(() => {
    if (successMessageProd) {
      // console.log('получено сообщение')
      openSuccessNotification(successMessageProd);
    } else if (successMessageLearningMaterials) {
      openSuccessNotification(successMessageLearningMaterials);
    } else if (successMessageMarketingMaterials) {
      openSuccessNotification(successMessageMarketingMaterials);
    } else if (successMessageWorkspace) {
      openSuccessNotification(successMessageWorkspace);
    }
  }, [successMessageProd, isSuccessUses, successMessageLearningMaterials, successMessageMarketingMaterials, successMessageWorkspace]);

  const showErrorNotification = (error: string,) => {
    notification.error({
      message: 'Ошибка!',
      description: error,
      placement:'bottom',
      onClose: () => setError(null,),
    },);
  };

  useEffect(() => {
    if (typeof error === "string") {
      showErrorNotification(error);
    }
  }, [error]);

  const items: TabsProps['items'] = [
    {
      key: 'documents',
      label: 'Документы',
      style: {height: '100%'},
      children:  <Flex vertical={true} style={{ height: '100%'}}>
        <ProductInfoWidget />

        <Flex style={{width:'100%', height: '100%'}}>
          {
            (currentProdData && currentProdData.status == 'delete') ? (
              <Flex
                align={'center'}
                justify={'center'}
                vertical={true} style={{width:'100%', height: '100%',  padding: '24px', backgroundColor: '#F3F4F6'}}>
                <Flex vertical={true}
                  // style={{padding: '24px'}}
                >
                  <Flex style={{width: '368px'}} gap={32} vertical={true} align={'center'}>
                    <DeleteWidget
                      type={currentProdData.type}
                      comment={currentProdData.comment_on_delete ? currentProdData.comment_on_delete : 'Отсутствует'}
                      deleteDay={dateFormatter(currentProdData.delete_date)}  />
                    <Button
                      onClick={() => window.history.go(-1)}
                      style={{width: 'fit-content',
                        display: 'flex', alignItems: 'center', height: '36px',
                        color: '#111928', fontWeight: '500'}}><ArrowLeft />Вернутья назад</Button>
                  </Flex>

                </Flex>
              </Flex>
            ) : (
              <Flex vertical={true} style={{width:'100%', padding: '24px', backgroundColor: '#F3F4F6'}}>
                <Flex style={{ padding: '16px', background: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} justify={'space-between'} align={'center'}>
                  <Typography.Title style={{margin: 0}} level={4}>Документы проекта</Typography.Title>
                  <ProductTableHeaderControl />
                </Flex>
                <ProductDocumentsTable />
              </Flex>
            )
          }

        </Flex>

      </Flex>
    },
    {
      key: 'learningMaterials',
      label: 'Учебные материалы',
      children: <Flex vertical={true}>
        <ProductInfoWidget />

        <Flex style={{width:'100%'}}>
          {
            (currentProdData && currentProdData.status == 'delete') ? (
              <Flex
                align={'center'}
                justify={'center'}
                vertical={true} style={{width:'100%', height: 'calc(100vh - 455px)',  padding: '24px', backgroundColor: '#F3F4F6'}}>
                <Flex vertical={true}
                  style={{padding: '24px'}}
                >
                  <Flex style={{width: '368px'}} gap={32} vertical={true} align={'center'}>
                    <DeleteWidget
                      type={currentProdData.type}
                      comment={currentProdData.comment_on_delete ? currentProdData.comment_on_delete : 'Отсутствует'}
                      deleteDay={currentProdData.delete_date} />
                    <Button
                      onClick={() => window.history.go(-1)}
                      style={{width: 'fit-content',
                        display: 'flex', alignItems: 'center', height: '36px',
                        color: '#111928', fontWeight: '500'}}><ArrowLeft />Вернутья назад</Button>
                  </Flex>

                </Flex>
              </Flex>
            ) : (
              <Flex vertical={true} style={{width:'100%', padding: '24px', backgroundColor: '#F3F4F6'}}>
                <EduMaterialsTable />
              </Flex>
            )
          }
        </Flex>
      </Flex>,
    },
    {
      key: 'marketingMaterials',
      label: 'Маркетинговые материалы',
      children: <Flex vertical={true}>
        <ProductInfoWidget />

        <Flex style={{width:'100%'}}>
          {
            (currentProdData && currentProdData.status == 'delete') ? (
              <Flex
                align={'center'}
                justify={'center'}
                vertical={true} style={{width:'100%', height: 'calc(100vh - 455px)',  padding: '24px', backgroundColor: '#F3F4F6'}}>
                <Flex vertical={true}
                  style={{padding: '24px'}}
                >
                  <Flex style={{width: '368px'}} gap={32} vertical={true} align={'center'}>
                    <DeleteWidget
                      type={currentProdData.type}
                      comment={currentProdData.comment_on_delete ? currentProdData.comment_on_delete : 'Отсутствует'}
                      deleteDay={currentProdData.delete_date} />
                    <Button
                      onClick={() => window.history.go(-1)}
                      style={{width: 'fit-content',
                        display: 'flex', alignItems: 'center', height: '36px',
                        color: '#111928', fontWeight: '500'}}><ArrowLeft />Вернутья назад</Button>
                  </Flex>

                </Flex>
              </Flex>
            ) : (
              <Flex vertical={true} style={{width:'100%', backgroundColor: '#F3F4F6'}}>
                <MarketingMaterialsTable />
              </Flex>
            )
          }
        </Flex>
      </Flex>,
    },
    {
      key: 'workspaces',
      label: 'Рабочее пространство',
      children: <Flex vertical={true}>
        <ProductInfoWidget />

        <Flex style={{width:'100%'}}>
          {
            (currentProdData && currentProdData.status == 'delete') ? (
              <Flex
                align={'center'}
                justify={'center'}
                vertical={true} style={{width:'100%', height: 'calc(100vh - 455px)',  padding: '24px', backgroundColor: '#F3F4F6'}}>
                <Flex vertical={true}
                  style={{padding: '24px'}}
                >
                  <Flex style={{width: '368px'}} gap={32} vertical={true} align={'center'}>
                    <DeleteWidget
                      type={currentProdData.type}
                      comment={currentProdData.comment_on_delete ? currentProdData.comment_on_delete : 'Отсутствует'}
                      deleteDay={currentProdData.delete_date} />
                    <Button
                      onClick={() => window.history.go(-1)}
                      style={{width: 'fit-content',
                        display: 'flex', alignItems: 'center', height: '36px',
                        color: '#111928', fontWeight: '500'}}><ArrowLeft />Вернутья назад</Button>
                  </Flex>

                </Flex>
              </Flex>
            ) : (
              <Flex vertical={true} style={{width:'100%', backgroundColor: '#F3F4F6'}}>
                <WorkspaceTable />
              </Flex>
            )
          }
        </Flex>
      </Flex>
    },
    // {
    //   key: '5',
    //   label: 'Исходный код',
    //   children: <SourceCodeTable />
    // },
    // {
    //   key: '6',
    //   label: 'Представители',
    //   children: <SpokespersonsTable />
    // },
  ];



  return currentProdData ?  (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardHeight: 52,
            cardGutter: 5,
            itemColor: '#6B7280'
          },
        },
      }}
    >
      {/*<Flex style={{ height: 'calc(100vh - 151px)', overflowY: 'scroll', padding: '24px' }}>*/}
      <Flex id={'prod-page_wrap'} style={{ height: 'calc(100vh - 151px)', overflowY: 'scroll' }}>
        <Flex vertical={true} style={{   width: 'calc(100%)'}} >
          <Flex style={{ padding: '24px  24px 0 24px', background: 'white' }} justify={'space-between'}>
            <Typography.Title style={{margin: 0}} level={3}>{currentProdData.deal.customer}</Typography.Title>
            <ProductHeaderControlPanel id={'ID'}/>
          </Flex>
          <Tabs onTabClick={(key) => tabChangeHandle(key)} style={{background: '#fff', width: '100%', height: '100%'}} items={items} />
        </Flex>
      </Flex>
      <DeleteProjectModals />
      <FinishedProjectModal />
      <DeleteMaterialModal />
      <CreateNewDocumentModal />
      <CreateNewRegisterDataModal />
      <UpdateDocumentModal />
      <CurCreateAdditionalTableModal />
    </ConfigProvider>
  ) : (<Spinner />)
}

const MyApp: React.FC = () => (
  <App>
    <ProdtPage />
  </App>
);

export default MyApp;