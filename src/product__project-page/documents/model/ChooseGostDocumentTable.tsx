import React, {useRef, useState} from 'react';
import {
  Button,
  Flex,
  Input,
  InputRef,
  Table,
  TableColumnsType,
  TableColumnType,
  Typography
} from "antd";
import {GostDocumentObject} from "../../../registry/interfaces.ts";
import {useHandbooksV2} from "../../../handbooks/store/handbookStoreV2.ts";
import {FilterDropdownProps} from "antd/es/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import {useProduct_Project} from "../../../store.ts";

const ChooseGostDocumentTable = () => {
  const gostDocumentData = useHandbooksV2(state => state.gostDocumentData)
  const  {gostIDForNewDoc, setGostDocumentIDForNewDoc}  = useProduct_Project()
  type DataIndex = keyof GostDocumentObject
  const [__, setSearchText] = useState('');
  const [_, setSearchedColumn] = useState<string | number | symbol>('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm({ closeDropdown: false, },);
    setSearchText(selectedKeys[0],);
    setSearchedColumn(dataIndex,);
  };


  const handleReset = (clearFilters: () => void, dataIndex: DataIndex, selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => {
    clearFilters();
    confirm({ closeDropdown: true, },);
    setSearchText(selectedKeys[0],);
    setSearchedColumn(dataIndex);

  };

  const getColumnSearchProps = (dataIndex: DataIndex, getField: (record: GostDocumentObject) => string, ): TableColumnType<GostDocumentObject> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: 0, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={'Введите значение'}
          value={selectedKeys[0]}
          onChange={(e,) => setSelectedKeys(e.target.value ? [e.target.value,] : [],)}
          onPressEnter={() => {
            return handleSearch(selectedKeys as string[], confirm, dataIndex,)
          }} // Передаем dataIndex
          style={{marginBottom: 8, display: 'block',}}
        />
        <Flex style={{width: '100%',}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex,)}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90,}}
          >
            Поиск
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex, selectedKeys as string[], confirm)}
            // onClick={() => handleSearch([''], confirm, dataIndex,)}
            size="small"
            style={{width: 90,}}
          >
              Сброс
          </Button>
        </Flex>
      </div>

    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
    ),
    onFilter: (value, record) =>
      getField(record)
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100) ;
      }
    },
    render: (_, record) => {
      return (<Typography.Text strong>{getField(record)}</Typography.Text>)
    }
  });


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], ___: GostDocumentObject[]) => {
      setGostDocumentIDForNewDoc(selectedRowKeys.toString())
    },
  };

  const columns: TableColumnsType<GostDocumentObject> = [
    {
      title: 'Стадия',
      dataIndex: 'project_stage',
      width: '120px',
      sorter: (a, b,) => a.project_stage.localeCompare(b.project_stage),
      ...getColumnSearchProps('project_stage' as keyof GostDocumentObject, (record) => record.project_stage),
    },
    {
      title: 'Код',
      dataIndex: 'code',
      width: '120px',
      sorter: (a, b,) => a.code.localeCompare(b.code),
      ...getColumnSearchProps('code' as keyof GostDocumentObject, (record) => record.code),
    },
    {
      title: 'Название',
      dataIndex: 'name',
      sorter: (a, b,) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name' as keyof GostDocumentObject, (record) => record.name),
    },
  ];

  return (
    <Table
      // style={{maxHeight: '500px'}}
      scroll={{y: 300}}
      loading={!gostDocumentData}
      rowKey={'id'}
      rowSelection={{
        type: 'radio',
        ...rowSelection,
      }}
      columns={columns}
      dataSource={(gostDocumentData && gostDocumentData.filter(el => el.gost.id == gostIDForNewDoc)) ? gostDocumentData.filter(el => el.gost.id == gostIDForNewDoc) : null}
    />
  );
};

export default ChooseGostDocumentTable;