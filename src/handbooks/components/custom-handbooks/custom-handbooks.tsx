import './custom-handbooks.scss';
import FlatSelectionList, { IFlatSelectionListItem } from "../../../components/FlatSelectionList/FlatSelectionList";
import HandbookTable from "../handbooks-table/handbooks-table";
import {useEffect, useState} from 'react';
import { GostTableData } from './components/gost/GostTableData';
import { OrganizationTableData } from './components/organizations/OrganizationTableData';
import { HandbookTableData } from './components/HandbookTableData';
import { GostDocumentsTableData } from './components/gostDocuments/GostDocumentsTableData';
import { ManagersTableData } from './components/managers/ManagersTableData';
import { useHandbookModals } from '../../store/handbook-modals.state';
import {Flex, Typography} from "antd";
import {useGostHandbook} from "../../store/gost.state.ts";
import {useManagersHandbook} from "../../store/managers.ts";
import {useOrganizationsHandbook} from "../../store/organizations.state.ts";
import {useGostDocumentsHandbook} from "../../store/gost-documents.state.ts";

export enum CustomHandbookTypes {
  GOST = 'GOST',
  Organizations = 'Organizations',
  GOSTDocuments = 'GOSTDocuments',
  Managers = 'Managers',
}

const customHandbookTypes: IFlatSelectionListItem[] = [
  {
    title: 'ГОСТ',
    id: CustomHandbookTypes.GOST
  },
  {
    title: 'Организации',
    id: CustomHandbookTypes.Organizations
  },
  {
    title: 'Документы ГОСТ',
    id: CustomHandbookTypes.GOSTDocuments
  },
  {
    title: 'ГАП',
    id: CustomHandbookTypes.Managers
  },
];


function CustomHandbooks() {
  const [selectedType, setSelectedType] = useState(null);
  const [tableData, setTableData] = useState<HandbookTableData>(null);
  const { successMessage: successMessageOrganisations } = useOrganizationsHandbook();
  const { successMessage: successMessageGosts } = useGostHandbook();
  const { successMessage: successMessageGostsDocuments } = useGostDocumentsHandbook();
  const { successMessage: successMessageGostsManagers } = useManagersHandbook();
  const { setModalType, setIsModalOpen, setInitialValues, setIsEdit } = useHandbookModals();

  useEffect(() => {
    if (successMessageGosts || successMessageOrganisations || successMessageGostsDocuments || successMessageGostsManagers) {
      tableData.fetchData()
        .then(_ => {
          setTableData(tableData);
        });
    }
  }, [successMessageGosts,
    successMessageOrganisations,
    successMessageGostsDocuments,
    successMessageGostsManagers]);

  // const getTableDataByType = (type: string): HandbookTableData  =>  {
  //   const defaultItem = new GostTableData();
  //
  //   switch (type) {
  //   case CustomHandbookTypes.GOST:
  //     return defaultItem;
  //
  //   case CustomHandbookTypes.Organizations:
  //     return new OrganizationTableData();
  //
  //   case CustomHandbookTypes.GOSTDocuments:
  //     return new GostDocumentsTableData();
  //
  //   case CustomHandbookTypes.Managers:
  //     return new ManagersTableData();
  //
  //   default:
  //     return defaultItem;
  //   }
  // }

  const getTableDataByType = (type: string): HandbookTableData => {
    const defaultItem = new GostTableData({
      setIsModalOpen,
      setInitialValues,
      setIsEdit,
    });

    switch (type) {
    case CustomHandbookTypes.GOST:
      return defaultItem;

    case CustomHandbookTypes.Organizations:
      return new OrganizationTableData({
        setIsModalOpen,
        setInitialValues,
        setIsEdit,
      });

    case CustomHandbookTypes.GOSTDocuments:
      return new GostDocumentsTableData({
        setIsModalOpen,
        setInitialValues,
        setIsEdit,
      });

    case CustomHandbookTypes.Managers:
      return new ManagersTableData({
        setIsModalOpen,
        setInitialValues,
        setIsEdit,
      });

    default:
      return defaultItem;
    }
  };



  const typeNames = {
    [CustomHandbookTypes.GOST]: 'ГОСТ',
    [CustomHandbookTypes.Organizations]: 'Организации',
    [CustomHandbookTypes.GOSTDocuments]: 'Документы ГОСТ',
    [CustomHandbookTypes.Managers]: 'ГАП',
  };


  const onTypeChange = (type: CustomHandbookTypes) => {
    setSelectedType(type);
    setModalType(type);
    setInitialValues(null)
    setIsEdit(false)
    const tableData = getTableDataByType(type);

    tableData.fetchData()
    // @ts-ignore
      .then(data => {
        setTableData(tableData);
      });
  }

  // useEffect(() => {
  //   onTypeChange(CustomHandbookTypes.GOST);
  // }, [])

  return (
    <div className="custom-handbooks">
      <div className="custom-handbooks__type">
        <FlatSelectionList
          selectedIndex={0}
          items={customHandbookTypes}
          onChange={item => onTypeChange(item?.id as CustomHandbookTypes)}>
        </FlatSelectionList>
      </div>

      <div className="custom-handbooks__table">
        <Flex align={'center'} style={{height: '58px', width: '100%', borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px', background: 'white', padding:' 12px 16px'}}>
          <Typography.Title style={{margin: '0px'}} level={5}>{typeNames[selectedType]}</Typography.Title>
        </Flex>
        <HandbookTable
          tableColumns={tableData?.columns} 
          dataSource={tableData?.data}
          title={tableData?.title}>
        </HandbookTable>
      </div>


    </div>
  )
}

export default CustomHandbooks

