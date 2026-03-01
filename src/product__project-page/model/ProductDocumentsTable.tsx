import {
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Flex, Input,
  InputRef,
  Table,
  TableColumnType,
  Tag, Tooltip,
  Typography
} from "antd";
import {ColumnsType} from "antd/es/table";
import {ProductDocumentsObject, } from "../../registry/interfaces.ts";
import DecimalNumberTag from "../../components/DecimalNumberTag.tsx";
import {
  CalendarOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {useModals, useProduct_Project} from "../../store.ts";
import {useRef, useState} from "react";
import {FilterDropdownProps} from "antd/es/table/interface";
import moment from "moment/moment";
import DocumentsLink from "../../components/DocumentsLink.tsx";
import {dateFormatter} from "../../components/scripts/dateFormatter.ts";
import {handleFilterStateObject} from "../../registry/scripts/handleFilterStateObject.ts";
import {
  useProductPageFilters
} from "../../components/store/useFiltersStore.ts";
import dayjs from "dayjs";

const ProductDocumentsTable = () => {
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const setIdForDelete = useProduct_Project(state => state.setIdForDelete)
  const setDeleteMaterialModalOpen = useModals(state => state.setDeleteMaterialModalOpen)
  const setDeleteType = useProduct_Project(state => state.setDeleteType)
  const setUpdateDocumentModalOpen = useProduct_Project(state => state.setUpdateDocumentModalOpen)
  const setDocumentIDForUpdate = useProduct_Project(state => state.setDocumentIDForUpdate)
  const isShowDeleteButtonActive = useProduct_Project(state => state.isShowDeleteButtonActive)
  type DataIndex = keyof ProductDocumentsObject
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | number | symbol>('');
  const searchInput = useRef<InputRef>(null);
  const { RangePicker } = DatePicker;
  const {productPageFilterObject, setProductPageFilterObject} = useProductPageFilters()
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
    setProductPageFilterObject(handleFilterStateObject(productPageFilterObject, null, dataIndex) )
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex, getField: (record: ProductDocumentsObject) => string): TableColumnType<ProductDocumentsObject> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px',
        right: -120, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={'Введите значение'}
          value={selectedKeys[0]}
          onChange={(e,) => setSelectedKeys(e.target.value ? [e.target.value,] : [],)}
          onPressEnter={() => {
            setProductPageFilterObject(handleFilterStateObject(productPageFilterObject, selectedKeys, dataIndex))
            handleSearch(selectedKeys as string[], confirm, dataIndex,)
          }} // Передаем dataIndex
          style={{marginBottom: 8, display: 'block',}}
        />
        <Flex style={{width: '100%',}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setProductPageFilterObject(handleFilterStateObject(productPageFilterObject, selectedKeys, dataIndex))
              handleSearch(selectedKeys as string[], confirm, dataIndex,)
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
      const fieldValue = getField(record);
      return fieldValue?.toLowerCase().includes((value as string).toLowerCase()) || false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (_, record) => {
      if (searchedColumn === dataIndex && searchText) {
        if (dataIndex === 'gost') {
          return <Tag  style={{fontWeight: 'bold', color: record.status == 'delete' ? '#c1c1c1' : 'black'}}>ГОСТ {getField(record)}</Tag>
        } else if (dataIndex === 'decimal_number') {
          return <DecimalNumberTag status={record.status} title={record.decimal_number} />
        } else if (dataIndex === 'link') {
          return <DocumentsLink status={record.status} title={record.link} />
        } else {
          return <Typography.Text strong>{getField(record)}</Typography.Text>;
        }
      } else {
        if (dataIndex === 'gost') {
          return <Tag style={{fontWeight: 'bold', color: record.status == 'delete' ? '#c1c1c1' : 'black'}}>ГОСТ {getField(record)}</Tag>
        } else if (dataIndex === 'decimal_number') {
          return <DecimalNumberTag status={record.status} title={record.decimal_number} />
        } else if (dataIndex === 'link') {
          return <DocumentsLink status={record.status} title={record.link} />
        } else {
          return <Typography.Text {...(record.status === 'delete' ? { disabled: true } : {})} strong>{getField(record)}</Typography.Text>;
        }
      }
    }
  });


  const getColumnDateSearchProps = (dataIndex: DataIndex): TableColumnType<ProductDocumentsObject> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '350px',
        right: -120, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <RangePicker
          value={  (productPageFilterObject[0]?.created_at?.length > 0 ||    productPageFilterObject?.created_at?.length > 0)
            ? [dayjs(productPageFilterObject[0].created_at[0][0] || productPageFilterObject.created_at[0][0]), dayjs(productPageFilterObject[0].created_at[0][0] || productPageFilterObject.created_at[0][1])]
            : undefined}

          onChange={(value) => {
            setProductPageFilterObject(handleFilterStateObject(productPageFilterObject, value ? [value] : [], 'created_at'))
            // @ts-ignore
            return setSelectedKeys(value ? [value,] : [],)
          }}
          style={{marginBottom: 8}}
        />
        <Flex style={{width: '100%'}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setProductPageFilterObject(handleFilterStateObject(productPageFilterObject, selectedKeys, 'created_at'))
              handleSearch(selectedKeys as string[], confirm, dataIndex,)
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
      searchedColumn === dataIndex ? (
        // record[dataIndex]
        // @ts-ignore
        <Typography.Text {...(record.status === 'delete' ? { disabled: true } : {})} strong>{dateFormatter (record[dataIndex])}</Typography.Text>
        // record[dataIndex]
      ) : (
      // @ts-ignore
        <Typography.Text {...(record.status === 'delete' ? { disabled: true } : {})} strong>{dateFormatter (record[dataIndex])}</Typography.Text>
      ),
  });

  const menuProps = (record:ProductDocumentsObject) => {
    const items = [
      {
        key: '1',
        label: (
          <Button
            disabled={record.status == 'delete'}
            onClick={() => {
              setDocumentIDForUpdate(record.id)
              setUpdateDocumentModalOpen(true)
            }}
            style={{border: "none", background: 'transparent', boxShadow: 'none'}}
          >
            <EditOutlined style={{fontSize: '16px'}} />
            Редактировать
          </Button>
        ),
      },
      // {
      //   key: '2',
      //   label: (
      //     <Button
      //       onClick={() => {
      //         try {
      //           setProductPageFilterObject(defaultProductPageFilterObject)
      //         } finally {
      //           location.reload()
      //         }
      //
      //       }}
      //       style={{border: "none", background: 'transparent', boxShadow: 'none'}}
      //     >
      //       <RedoOutlined style={{fontSize: '16px'}} />
      //       Сброс фильтров
      //     </Button>
      //   )
      // },
    ];

    if (record.status == 'delete') {
      items.push({
        key: '3',
        label: (
          <Button
            style={{border: "none", background: 'transparent', boxShadow: 'none'}}
          >
            <Tooltip title={record.comment_on_delete || 'Отсуствует'} style={{display: 'flex', justifyContent: 'center'}}>
             <Flex gap={8}>
               <CommentOutlined  style={{fontSize: '16px'}} />
              Комментарий
             </Flex>

            </Tooltip>
          </Button>
        )
      });
    } else {
      items.push({
        key: '3',
        label: (
          <Button

            danger={true}
            onClick={() => {
              setIdForDelete(record.id)
              setDeleteType('document')
              setDeleteMaterialModalOpen(true)
            }}
            icon={<DeleteOutlined style={{color: 'red'}} />}
            style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
          >
            Удалить
          </Button>
        )
      });
    }

    return {
      items: items
    };
  };

  const filterDocument = (value) => {
    return value.filter(el => el.status !== 'delete')
  }


  const columns: ColumnsType<ProductDocumentsObject> = [
    {
      title: 'ГОСТ',
      dataIndex: 'gost',
      sorter: (a, b,) => a.gost.gost_number.localeCompare(b.gost.gost_number),
      ...(productPageFilterObject[0]?.gost || productPageFilterObject.gost) && {
        defaultFilteredValue: productPageFilterObject[0]?.gost || productPageFilterObject.gost,
      },
      ...getColumnSearchProps('gost', (record) => (record.gost && record.gost.gost_number) ? record.gost.gost_number : 'Отсутствует'),
    },
    {
      title: 'Стадия',
      dataIndex: 'project_stage',
      sorter: (a, b,) => a.gost_document?.project_stage.localeCompare(b.gost_document?.project_stage),
      ...(productPageFilterObject[0]?.project_stage || productPageFilterObject.project_stage) && {
        defaultFilteredValue: productPageFilterObject[0]?.project_stage || productPageFilterObject.project_stage,
      },
      ...getColumnSearchProps('project_stage', (record) => (record.gost_document && record.gost_document.project_stage) ? record.gost_document.project_stage : 'Отсутствует'),
    },
    {
      title: 'Название',
      dataIndex: 'name',
      sorter: (a, b,) => {
        const aName = a.gost_document?.name || a.name || null
        const bName = b.gost_document?.name || b.name || null
        return  aName.localeCompare(bName)
      },
      ...(productPageFilterObject[0]?.name || productPageFilterObject.name) && {
        defaultFilteredValue: productPageFilterObject[0]?.name || productPageFilterObject.name,
      },
      ...getColumnSearchProps('name', (record) => (record.gost_document && record.gost_document.name) ? record.gost_document.name : record.name),
    },

    {
      title: 'Децимальный номер',
      dataIndex: 'decimal_number',
      sorter: (a, b) => {
        const aName = a.decimal_number || '';
        const bName = b.decimal_number || '';
        return aName.localeCompare(bName);
      },
      ...(productPageFilterObject[0]?.decimal_number || productPageFilterObject.decimal_number) && {
        defaultFilteredValue: productPageFilterObject[0]?.decimal_number || productPageFilterObject.decimal_number,
      },
      ...getColumnSearchProps('decimal_number', (record) => record.decimal_number)
    },
    {
      title: 'Ссылки',
      dataIndex: 'link',
      sorter: (a, b) => {
        const aName = a.link || '';
        const bName = b.link || '';
        return aName.localeCompare(bName);
      },
      ...(productPageFilterObject[0]?.link || productPageFilterObject.link) && {
        defaultFilteredValue: productPageFilterObject[0]?.link || productPageFilterObject.link,
      },
      ...getColumnSearchProps('link', (record) => record.link)
      // width: '20%',
    },
    {
      title: 'Дата добавления',
      dataIndex: 'created_at',
      sorter: (a, b,) => moment(a.created_at,).diff(moment(b.created_at,),),
      ...(productPageFilterObject[0]?.created_at || productPageFilterObject.created_at) && {
        defaultFilteredValue: productPageFilterObject[0]?.created_at || productPageFilterObject.created_at,
      },
      ...getColumnDateSearchProps('created_at'),
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      render: (_, record) => (
        <Dropdown arrow={false} menu={menuProps(record)} placement="bottom">
          <Button>...</Button>
        </Dropdown>

      )
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontWeightStrong: 600
        },
        components: {
          Table: {
            headerBorderRadius: 0
          },
        },
      }}
    >
      <Flex style={{ width:'100%'}}>
        <Table pagination={{showSizeChanger: true}}
          rowKey={'id'}
          style={{width: '100%', maxHeight: '350px.//..'}}
          columns={columns} loading={!currentProdData.register_entity_documents}
          dataSource={currentProdData.register_entity_documents && currentProdData.register_entity_documents.length ?
            (isShowDeleteButtonActive ? filterDocument(currentProdData.register_entity_documents) :
              currentProdData.register_entity_documents) : null} />
      </Flex>
    </ConfigProvider>
  );
};

export default ProductDocumentsTable;