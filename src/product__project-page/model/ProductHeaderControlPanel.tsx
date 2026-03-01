import {Button, Dropdown, Flex, Switch, Tooltip, Typography} from "antd";
import {DeleteOutlined, EditOutlined, RedoOutlined} from "@ant-design/icons";
import {useModals, useProduct_Project, useRegister} from "../../store.ts";
import {defaultProductPageFilterObject, useProductPageFilters} from "../../components/store/useFiltersStore.ts";
interface ProductHeaderControlPanelProps {
  id: string;
}
const ProductHeaderControlPanel:React.FC<ProductHeaderControlPanelProps> = () => {
  const setDeleteProjectModalOpen = useModals(state => state.setDeleteProjectModalOpen)
  const setFinishedProjectModalOpen = useModals(state => state.setFinishedProjectModalOpen)
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const setCreatingRegisterDataModalOpen = useModals(state => state.setCreatingRegisterDataModalOpen)
  const setIsEditModeActive = useProduct_Project(state => state.setIsEditModeActive)
  const setEditProductID = useRegister(state => state.setEditProductID)
  const {setProductPageFilterObject} = useProductPageFilters()
  const onChange = (checked: boolean) => {
    if (checked) {
      setFinishedProjectModalOpen(true)
    }
  };

  const menuProps = () => {
    const color = currentProdData.status == 'delete' ? 'grey' : 'red'
    return {
      items: [
        {
          key: '1',
          label: currentProdData.status != 'draft' ? (
            <Tooltip title={'Удаление продукта или проекта возможно только из статуса "Черновик"'}>
              <Button
                disabled={currentProdData.status != 'draft'}
                danger={true}
                onClick={() => setDeleteProjectModalOpen(true)}
                // @ts-ignore
                icon={<DeleteOutlined style={{ color: {color}}} />}
                style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
              >
                Удалить
              </Button>
            </Tooltip>
          ) : (
            <Button
              danger={true}
              onClick={() => setDeleteProjectModalOpen(true)}
              // @ts-ignore
              icon={<DeleteOutlined style={{ color: {color}}} />}
              style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
            >
              Удалить
            </Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button
              style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
              onClick={() => {
                try {
                  setProductPageFilterObject(defaultProductPageFilterObject)
                } finally {
                  location.reload()
                }

              }}
              // style={{border: "none", background: 'transparent', boxShadow: 'none'}}
            >
              <RedoOutlined style={{fontSize: '16px'}} />
              Сброс фильтров
            </Button>
          )
        }
      ],
    }
  };


  return (
    <Flex gap={32} style={{width:'fit-content'}}>
      <Flex gap={8} align={'center'}>
        <Switch checked={currentProdData.status == 'finished'} disabled={currentProdData.status !== 'in_work'} defaultChecked={false} onChange={onChange} />
        <Typography.Text>Завершен</Typography.Text>
      </Flex>
      <Flex>

        <Flex gap={8}>
          <Flex align={'center'} style={{minWidth:'142px', borderRadius: '16px'}}>
            <Button
              disabled={currentProdData.status == 'delete' || currentProdData.status == 'finished'}
              onClick={() => {
                setCreatingRegisterDataModalOpen(true);
                setIsEditModeActive(true);
                setEditProductID(currentProdData.id);
              }}
              style={{borderTopRightRadius: '0px', borderBottomRightRadius: '0px', height: '34px'}}>
                <EditOutlined style={{fontSize: '16px'}} />
                Редактировать
            </Button>
            <Dropdown menu={menuProps()}>
              <Button style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', height: '34px'}}>...</Button>
            </Dropdown>
          </Flex>

        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductHeaderControlPanel;