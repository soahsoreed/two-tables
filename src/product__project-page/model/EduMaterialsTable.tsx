
import {Button, DatePicker, Dropdown, Flex, Input, InputRef, Table, TableColumnType, Typography} from "antd";
import {CalendarOutlined, DeleteOutlined, LinkOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import UserCircle from "../../components/UserCircle.tsx";
import {useModals, useProduct_Project} from "../../store.ts";
import {useAdditionalTablesModals} from "../additionalTables/store/additionalTablesModalsStore.ts";
import {IAdditionalData} from "../additionalTables/interfaces.ts";
import {dateFormatter} from "../../components/scripts/dateFormatter.ts";
import DocumentsLink from "../../components/DocumentsLink.tsx";
import {useRef, useState} from "react";
import {FilterDropdownProps} from "antd/es/table/interface";
import moment from "moment";
import {useEduMaterialsPageFilters} from "../../components/store/useFiltersStore.ts";
import {handleFilterStateObject} from "../../registry/scripts/handleFilterStateObject.ts";
import dayjs from "dayjs";

const EduMaterialsTable = () => {
  const setDeleteMaterialModalOpen = useModals(state => state.setDeleteMaterialModalOpen)
  const {setIsModalOpen } = useAdditionalTablesModals()
  const {currentProdData, setIdForDelete} = useProduct_Project()

  type DataIndex = keyof IAdditionalData
  const [_, setSearchText] = useState('');
  const [__, setSearchedColumn] = useState<string | number | symbol>('');
  const searchInput = useRef<InputRef>(null);
  const { RangePicker } = DatePicker;
  const {pageFilterObject, setPageFilterObject}  = useEduMaterialsPageFilters()

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
    setPageFilterObject(handleFilterStateObject(pageFilterObject, null, dataIndex) )
    setSearchedColumn(dataIndex);

  };

  const getColumnSearchProps = (dataIndex: DataIndex, getField: (record: IAdditionalData) => string, tableType?: 'link' | 'name' | 'comment' ): TableColumnType<IAdditionalData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: -120, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={'Введите значение'}
          value={selectedKeys[0]}
          onChange={(e,) => setSelectedKeys(e.target.value ? [e.target.value,] : [],)}
          onPressEnter={() => {
            setPageFilterObject(handleFilterStateObject(pageFilterObject, selectedKeys, dataIndex))
            return handleSearch(selectedKeys as string[], confirm, dataIndex,)
          }}
          style={{marginBottom: 8, display: 'block',}}
        />
        <Flex style={{width: '100%',}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setPageFilterObject(handleFilterStateObject(pageFilterObject, selectedKeys, dataIndex))
              return handleSearch(selectedKeys as string[], confirm, dataIndex,)
            }}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90,}}
          >
            Поиск
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex, selectedKeys as string[], confirm)}
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
    onFilter: (value, record) => {
      return getField(record)
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    render: (_, record) => {
      switch (tableType) {
      case 'link':
        return         (<Flex gap={6} style={{maxWidth: '300px'}}>
          <LinkOutlined style={{color: '#1a56db'}} />
          <Typography.Text style={{overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis'}} strong>
            <DocumentsLink title={record.link} />
          </Typography.Text>
        </Flex>);
      case "name":
        return (        <Flex align={'center'} gap={8} style={{width: 'fit-content'}}>
          <UserCircle name={record.creator_name} />
          <Typography.Text strong>{record.creator_name}</Typography.Text>
        </Flex>)
      case "comment":
        return <Typography.Text type={'secondary'} strong>{record.comment}</Typography.Text>
      default:
        return <Typography.Text
          strong
        >
          {getField(record)}
        </Typography.Text>
      }
    }
  });

  const getColumnDateSearchProps = (dataIndex: DataIndex): TableColumnType<IAdditionalData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: -120, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <RangePicker
          value={  (pageFilterObject[0]?.created_at?.length > 0 ||    pageFilterObject?.created_at?.length > 0)
            ? [dayjs(pageFilterObject[0].created_at[0][0] || pageFilterObject.created_at[0][0]), dayjs(pageFilterObject[0].created_at[0][0] || pageFilterObject.created_at[0][1])]
            : undefined}
          onChange={(value) => {
            setPageFilterObject(handleFilterStateObject(pageFilterObject, value ? [value] : [], 'created_at'))
            // @ts-ignore
            setSelectedKeys(value ? [value] : []);
            if (!value) {
              handleReset(clearFilters, dataIndex, selectedKeys as string[], confirm);
            }
          }}
          style={{ marginBottom: 8 }}
        />
        <Flex style={{width: '100%'}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setPageFilterObject(handleFilterStateObject(pageFilterObject, selectedKeys, 'created_at'))
              return handleSearch(selectedKeys as string[], confirm, dataIndex,)
            }}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90}}
          >
            Поиск
          </Button>
        </Flex>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <CalendarOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
    ),
    onFilter: (value, record) => {
      // @ts-ignore
      const date = new Date(record[dataIndex]);
      const startDate = new Date(value[0]);
      const endDate = new Date(value[1]);

      endDate.setDate(endDate.getDate() + 1);
      endDate.setUTCHours(23, 59, 59, 999);

      return startDate <= date && date <= endDate;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (_, record) =>
      <Typography.Text
        strong>
        {dateFormatter(record[dataIndex])}
      </Typography.Text>
  });

  const menuProps = (record:IAdditionalData) => {
    return {
      items: [
        {
          key: '1',
          label: (
            <Button
              disabled={currentProdData.status == 'delete' || currentProdData.status == 'finished'}
              danger={true}
              onClick={() => {
                setIdForDelete(record.id)
                setDeleteMaterialModalOpen(true)
              }}
              icon={<DeleteOutlined style={{color: 'red'}} />}
              style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
            >
              Удалить
            </Button>
          ),
        },
      ],
    }
  };


  const columns: ColumnsType<IAdditionalData> = [
    {
      title: 'Ссылка',
      dataIndex: 'link',
      width: '300px',
      sorter: (a, b) => a.link.localeCompare(b.link),
      ...(pageFilterObject[0]?.link || pageFilterObject.link) && {
        defaultFilteredValue: pageFilterObject[0]?.link || pageFilterObject.link,
      },
      ...getColumnSearchProps('link', (record) => record.link, 'link')
    },
    {
      title: 'Кто добавил',
      dataIndex: 'creator_name',
      sorter: (a, b) => a.creator_name.localeCompare(b.creator_name),
      width: '30%',
      ...(pageFilterObject[0]?.creator_name || pageFilterObject.creator_name) && {
        defaultFilteredValue: pageFilterObject[0]?.creator_name || pageFilterObject.creator_name,
      },
      ...getColumnSearchProps('creator_name', (record) => record.creator_name, 'name')
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      width: '30%',
      sorter: (a, b) => {
        const aName = a.comment || '';
        const bName = b.comment || '';
        return aName.localeCompare(bName);
      },
      ...(pageFilterObject[0]?.comment || pageFilterObject.comment) && {
        defaultFilteredValue: pageFilterObject[0]?.comment || pageFilterObject.comment,
      },
      ...getColumnSearchProps('comment', (record) => record.comment, 'comment')
    },
    {
      title: 'Дата добавления',
      dataIndex: 'created_at',
      sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      ...(pageFilterObject[0]?.created_at || pageFilterObject.created_at) && {
        defaultFilteredValue: pageFilterObject[0]?.created_at || pageFilterObject.created_at,
      },
      ...getColumnDateSearchProps('created_at')
      // width: '20%',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      align: 'center',
      render: (_, record) => (
        <Dropdown arrow={false} menu={menuProps(record)} placement="bottom">
          <Button>...</Button>
        </Dropdown>

      )
    }
  ];


  return (
    <Flex style={{width:'100%'}}>
      <Flex vertical={true} style={{width:'100%', background: '#F3F4F6'}}>
        <Flex style={{padding: '16px',borderTopLeftRadius: '16px', borderTopRightRadius: '16px', background: 'white'}} justify={'space-between'} align={'center'}>
          <Typography.Title style={{margin: 0}} level={4}>Учебные материалы</Typography.Title>
          <Button
            disabled={currentProdData.status == 'delete' || currentProdData.status == 'finished'}
            onClick={() => {
              setIsModalOpen(true)
            }}
            type={'primary'} style={{height: '34px'}}>Добавить <PlusOutlined /></Button>
        </Flex>
        <Table pagination={{showSizeChanger: true}}
          style={{width: '100%'}}
          columns={columns} 
          rowKey={(record) => record.id || `${record.creator_name}-${record.created_at}`}
          dataSource={currentProdData.edu_materials?.length?
            currentProdData.edu_materials.filter(el => el.status != 'delete')
            : null} />
      </Flex>
    </Flex>
  );
};

export default EduMaterialsTable;