import './system-handbooks.scss';
import FlatSelectionList, { IFlatSelectionListItem } from "../../../components/FlatSelectionList/FlatSelectionList";
import {useEffect, useState} from 'react';
import HandbookTable from '../handbooks-table/handbooks-table';
import { DealsTableData } from './components/deals';
import { ContractsTableData } from './components/contracts';
import { HandbookTableData } from '../custom-handbooks/components/HandbookTableData';
import {useHandbookModals} from "../../store/handbook-modals.state.ts";
import {Flex, Typography} from "antd";
import {useDealsHandbook} from "../../store/deal.ts";
import {useRegister} from "../../../store.ts";
import {useContractsHandbook} from "../../store/contracts.ts";

export enum SystemHandbookTypes {
  Deals = 'Projects',
  Contracts = 'Contracts',
}

const systemHandbookTypes: IFlatSelectionListItem[] = [
  {
    title: 'Сделки',
    id: SystemHandbookTypes.Deals
  },
  {
    title: 'Договоры',
    id: SystemHandbookTypes.Contracts
  },
];

function SystemHandbooks() {
  const [selectedType, setSelectedType] = useState(null);
  const [tableData, setTableData] = useState<HandbookTableData>(null);
  const successMessageDeal = useDealsHandbook(state => state.successMessage);
  const successMessageContract = useContractsHandbook(state => state.successMessage);
  const { getOrganizationsData } = useRegister()
  const { setModalType, setIsModalOpen, setInitialValues, setIsEdit } = useHandbookModals();

  useEffect(() => {
    if (successMessageDeal || successMessageContract) {
      tableData.fetchData()
        .then(_ => {
          setTableData(tableData);
        });
    }
  }, [successMessageDeal, successMessageContract]);


  const getTableDataByType = (type: string): HandbookTableData  =>  {
    const defaultItem = new DealsTableData({
      setIsModalOpen,
      setInitialValues,
      setIsEdit,
    })

    switch (type) {
    case SystemHandbookTypes.Deals:
      return defaultItem

    case SystemHandbookTypes.Contracts:
      return new ContractsTableData({
        setIsModalOpen,
        setInitialValues,
        setIsEdit,
      });

    default:
      return defaultItem;
    }
  }

  const onTypeChange = (type: SystemHandbookTypes) => {
    if (type === SystemHandbookTypes.Contracts) {
      getOrganizationsData()
    }
    setIsEdit(false)
    setInitialValues(null)
    setSelectedType(type);
    setModalType(type);
    const tableData = getTableDataByType(type);

    tableData.fetchData()
      .then(_ => {
        setTableData(tableData);
      });
  }

  const typeNames = {
    [SystemHandbookTypes.Deals]: 'Сделки',
    [SystemHandbookTypes.Contracts]: 'Договоры',
  };


  return (
    <div className="system-handbooks">
      <div className="system-handbooks__type">
        <FlatSelectionList
          selectedIndex={0}
          items={systemHandbookTypes}
          onChange={item => onTypeChange(item?.id as SystemHandbookTypes)}>
        </FlatSelectionList>
      </div>

      <div className="system-handbooks__table">
        <Flex align={'center'} style={{height: '58px', width: '100%', borderTopRightRadius: '16px',
          borderTopLeftRadius: '16px', background: 'white', padding:' 12px 16px'}}>
          <Typography.Title style={{margin: '0px'}} level={5}>{typeNames[selectedType]}</Typography.Title>
        </Flex>
        <HandbookTable

          dataSource={tableData?.data}
          tableColumns={tableData?.columns}
          title={tableData?.title}>
        </HandbookTable>
      </div>
    </div>
  )
}

export default SystemHandbooks
