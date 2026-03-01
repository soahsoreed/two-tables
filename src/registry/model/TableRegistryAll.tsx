import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  ConfigProvider, DatePicker,
  Dropdown,
  Flex,
  GetProp, Input,
  InputRef,
  Radio,
  Table, TableColumnType,
  TableProps,
  Tooltip,
  Typography
} from "antd";
import {registerDataIndex, registryDataObject} from "../interfaces.ts";
import {ColumnsType} from "antd/es/table";
import {
  CalendarOutlined,
  CommentOutlined,
  EditOutlined, FileOutlined, SearchOutlined
} from "@ant-design/icons";
import StatusCircle from "../../components/StatusCircle.tsx";
import {useModals, useProduct_Project, useRegister} from "../../store.ts";
import Spinner from "../../components/Spinner.tsx";
import {FilterDropdownProps} from "antd/es/table/interface";
import moment from 'moment'
import DecimalNumberTag from "../../components/DecimalNumberTag.tsx";
import {useNavigate} from "react-router-dom";
import LinksTag from "../../components/scripts/LinksTag.tsx";
import {dateFormatter} from "../../components/scripts/dateFormatter.ts";
import {filterRegistryData} from "../scripts/filterRegistryData.ts";
import {TableRegistryProps} from "../../interfaces.ts";
import {useRegisterFilters} from "../../components/store/useFiltersStore.ts";
import {handleFilterStateObject} from "../scripts/handleFilterStateObject.ts";
import dayjs from "dayjs";
export type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const TableRegistryAll: React.FC<TableRegistryProps> = ({filter}) => {
  const registerData = useRegister(state => state.registerData)
  const setEditProductID = useRegister(state => state.setEditProductID)
  const setCreatingRegisterDataModalOpen = useModals(state => state.setCreatingRegisterDataModalOpen)
  const {setIsEditModeActive, setCurrentProdData} = useProduct_Project()

  const navigate = useNavigate()
  type DataIndex = keyof registryDataObject
  const [_, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | number | symbol>('');
  const searchInput = useRef<InputRef>(null);
  const { RangePicker } = DatePicker;
  const {registerFilterObject, setRegisterFilterObject}  = useRegisterFilters()



  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    // console.log('вызов фильтрации')
    confirm({ closeDropdown: false, },);
    setSearchText(selectedKeys[0],);
    setSearchedColumn(dataIndex,);
  };


  const handleReset = (clearFilters: () => void, dataIndex: DataIndex, selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => {
    clearFilters();
    confirm({ closeDropdown: true, },);
    setSearchText(selectedKeys[0],);
    setRegisterFilterObject(handleFilterStateObject(registerFilterObject, null, dataIndex) )
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    if (!localStorage.getItem('statusFilterValue')) {
      localStorage.setItem('statusFilterValue', JSON.stringify({
        draft: null,
        finished: null,
        in_work: null,
        delete: null
      }))
    }
  }, []);


  const getColumnSearchProps = (dataIndex: DataIndex, getField: (record: registryDataObject) => string, tableType?: 'decNum' | 'name' | 'deal' | 'links' | 'status'): TableColumnType<registryDataObject> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => tableType == 'status' ? (
      <Flex style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: -120, display: 'flex', background: 'white', top: -100,
        flexDirection: 'column'
      }} onKeyDown={(e) => e.stopPropagation()}>
        <Flex vertical style={{marginBottom: 8}}>
          <Radio.Group
            buttonStyle={'solid'}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys([e.target.value])}
          >
            <Radio.Button value="draft">Черновик</Radio.Button>
            <Radio.Button value="in_work">В работе</Radio.Button>
            <Radio.Button value="finished">Завершено</Radio.Button>
            <Radio.Button value="delete">Удалено</Radio.Button>
          </Radio.Group>
        </Flex>
        <Flex style={{width: '100%'}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setRegisterFilterObject(handleFilterStateObject(registerFilterObject, selectedKeys, registerDataIndex.status))
              return handleSearch(selectedKeys as string[], confirm, registerDataIndex.status)
            }}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90}}
          >
            Поиск
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, registerDataIndex.status, selectedKeys as string[], confirm)}
            size="small"
            style={{width: 90}}
          >
            Сброс
          </Button>
        </Flex>
      </Flex>
    ) : (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px',
        right: -220, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={tableType == 'links' ? "Введите число" : 'Введите значение'}
          value={selectedKeys[0]}
          onChange={(e,) => setSelectedKeys(e.target.value ? [e.target.value,] : [],)}
          onPressEnter={() => {
            setRegisterFilterObject(handleFilterStateObject(registerFilterObject, selectedKeys, dataIndex))
            return handleSearch(selectedKeys as string[], confirm, dataIndex,)
          }}
          style={{marginBottom: 8, display: 'block',}}
        />
        <Flex style={{width: '100%',}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => {
              setRegisterFilterObject(handleFilterStateObject(registerFilterObject, selectedKeys, dataIndex))
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
      if (dataIndex === 'links') {
        const linkCount = record.register_entity_documents.length;
        return linkCount.toString().includes(value as string);
      } else {
        const fieldValue = getField(record);
        if (value) {
          return fieldValue?.toLowerCase().includes((value as string).toLowerCase()) || false;
        }

      }
    },
    render: (_, record) => {
      switch (tableType) {
      case "status":
        return <StatusCircle title={record.status} />
      case 'decNum':
        return <DecimalNumberTag page={'register'} title={record.decimal_number} status={record.status} />;
      case 'deal':
        return (
          <Flex vertical={true}>
            <Typography.Text
              {...(record.status === 'delete' ? { disabled: true } : record.status === 'draft' ? { style: { color: '#50678c' } } : {})}
              strong
            >
              {record.deal.deal_number}
            </Typography.Text>
            <Typography.Text {...(record.status === 'delete' ? { disabled: true } : record.status === 'draft' ? { style: { color: '#50678c' } } : {})} strong type={'secondary'}>
              от {dateFormatter(record.deal.started_at) }
            </Typography.Text>
          </Flex>
        );
      case 'links':
        return <LinksTag documentsArr={record.register_entity_documents} status={record.status} />;
      default:
        return <Typography.Text
          {...(record.status === 'delete' ? { disabled: true } : record.status === 'draft' ? { style: { color: '#50678c' } } : {})}
          strong
        >
          {getField(record)}
        </Typography.Text>
      }
    }
  });

  // @ts-ignore
  // @ts-ignore
  const getColumnDateSearchProps = (dataIndex: DataIndex): TableColumnType<registryDataObject> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: 60, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <RangePicker
          value={  (registerFilterObject[0]?.created_date?.length > 0 ||    registerFilterObject?.created_date?.length > 0)
            ? [dayjs(registerFilterObject[0].created_date[0][0] || registerFilterObject.created_date[0][0]), dayjs(registerFilterObject[0].created_date[0][0] || registerFilterObject.created_date[0][1])]
            : undefined}
          onChange={(value) => {
            setRegisterFilterObject(handleFilterStateObject(registerFilterObject, value ? [value] : [], registerDataIndex.created_date))
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
              setRegisterFilterObject(handleFilterStateObject(registerFilterObject, selectedKeys, registerDataIndex.created_date))
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
      searchedColumn === dataIndex ? (

        <Typography.Text
          {...(record.status === 'delete' ? { disabled: true } : record.status === 'draft' ? { style: { color: '#50678c' } } : {})}
          strong>
          {/*
          // @ts-ignore */}
          {dateFormatter(record[dataIndex])}
        </Typography.Text>
      ) : (
        // @ts-ignore
        <Typography.Text
          {...(record.status === 'delete' ? { disabled: true } : record.status === 'draft' ? { style: { color: '#50678c' } } : {})}
          strong>
          {/*
          // @ts-ignore */}
          {dateFormatter(record[dataIndex])}
        </Typography.Text>
      ),
  });


  const menuProps = (record: registryDataObject) => {
    const items = [
      {
        key: '1',
        label: (
          <Button
            onClick={() => navigate("/product/" + record.id)}
            style={{border: "none", background: 'transparent', boxShadow: 'none'}}
          >
            <FileOutlined style={{fontSize: '16px'}} />
            Подробнее
          </Button>
        ),
      },
      {
        key: '2',
        label: (
          <Button
            disabled={record.status !== 'draft' && record.status !== 'in_work'}
            onClick={() => {
              const curProd = registerData.find(el => el.id == record.id)
              setCurrentProdData(curProd)
              setCreatingRegisterDataModalOpen(true);
              setIsEditModeActive(true);
              setEditProductID(record.id);
            }}
            style={{border: "none", background: 'transparent', boxShadow: 'none'}}
          >
            <EditOutlined style={{fontSize: '16px'}} />
            Редактировать
          </Button>
        )
      }
    ];

    if (record.status == 'finished' || record.status == 'delete' ) {
      items.push({
        key: '4',
        label: (
          <Tooltip title={record.comment_on_finished || 'Отсутствует'}>
            <Button
              style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
            >
              <CommentOutlined  style={{fontSize: '16px'}} />
              Комментарий
            </Button>
          </Tooltip>
        )
      });
    }

    return {
      items: items
    };
  };


  const columns: ColumnsType<registryDataObject> = [
    {
      title: 'Исполнитель',
      dataIndex: registerDataIndex.developer,
      ...(registerFilterObject[0]?.developer || registerFilterObject.developer) && {
        defaultFilteredValue: registerFilterObject[0]?.developer || registerFilterObject.developer,
      },
      sorter: (a, b,) => a.organization.name.localeCompare(b.organization.name),
      ...getColumnSearchProps(registerDataIndex.developer as keyof registryDataObject, (record) => record.organization.name),
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
    },
    {
      title: 'Заказчик',
      dataIndex: registerDataIndex.customer,
      ...(registerFilterObject[0]?.customer || registerFilterObject.customer) && {
        defaultFilteredValue: registerFilterObject[0]?.customer || registerFilterObject.customer,
      },
      sorter: (a, b,) => a.deal.customer.localeCompare(b.deal.customer),
      ...getColumnSearchProps(registerDataIndex.customer as keyof registryDataObject, (record) => record.deal.customer),
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
    },
    {
      title: 'Ссылки',
      dataIndex: registerDataIndex.links,
      align: 'center',
      width: '135px',
      render: ((_, record) => <LinksTag documentsArr={record.register_entity_documents} status={record.status} />),
      sorter: (a, b) => {
        const aCount = a.register_entity_documents.length ? a.register_entity_documents.length : 0;
        const bCount = b.register_entity_documents.length ? b.register_entity_documents.length : 0;
        return aCount - bCount;
      },
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
      ...(registerFilterObject[0]?.links || registerFilterObject.links) && {
        defaultFilteredValue: registerFilterObject[0]?.links || registerFilterObject.links,
      },
      ...getColumnSearchProps(registerDataIndex.links, (record) => record.register_entity_documents.length.toString(), 'links'),
    },
    {
      title: 'Децимальный номер',
      dataIndex: registerDataIndex.decimal_number,
      sorter: (a, b) => {
        const aName = a.decimal_number || '';
        const bName = b.decimal_number || '';
        return aName.localeCompare(bName);
      },
      ...(registerFilterObject[0]?.decimal_number || registerFilterObject.decimal_number) && {
        defaultFilteredValue: registerFilterObject[0]?.decimal_number || registerFilterObject.decimal_number,
      },
      ...getColumnSearchProps(registerDataIndex.decimal_number, (record) => record.decimal_number, 'decNum'),
      // width: '10%',
    },
    {
      title: 'Руководитель проекта',
      dataIndex: registerDataIndex.manager,
      // ellipsis: true,
      // align: 'center',
      sorter: (a, b) => {
        const aName = a.deal?.project_manager || '';
        const bName = b.deal?.project_manager || '';
        return aName.localeCompare(bName);
      },
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
      ...(registerFilterObject[0]?.manager || registerFilterObject.manager) && {
        defaultFilteredValue: registerFilterObject[0]?.manager || registerFilterObject.manager,
      },
      ...getColumnSearchProps(registerDataIndex.manager as keyof registryDataObject,
        (record) => ( record.deal && record.deal.project_manager) ? record.deal.project_manager : '-', 'name'),
      // width: '20%',
    },
    {
      title: 'Номер сделки',
      dataIndex: registerDataIndex.deal_number,
      sorter: (a, b,) => a.deal.deal_number.localeCompare(b.deal.deal_number),
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
      ...(registerFilterObject[0]?.deal_number || registerFilterObject.deal_number) && {
        defaultFilteredValue: registerFilterObject[0]?.deal_number || registerFilterObject.deal_number,
      },
      ...getColumnSearchProps(registerDataIndex.deal_number as keyof registryDataObject, (record) => record.deal.deal_number, 'deal'),
      // width: '10%',
    },
    {
      title: 'Дата добавления',
      dataIndex: registerDataIndex.created_date,
      sorter: (a, b,) => moment(a.created_date,).diff(moment(b.created_date,),),
      onCell: (record) => ({
        onClick: () => {
          navigate("/product/" + record.id)
        },
      }),
      ...(registerFilterObject[0]?.created_date || registerFilterObject.created_date) && {
        defaultFilteredValue: registerFilterObject[0]?.created_date || registerFilterObject.created_date,
      },
      ...getColumnDateSearchProps(registerDataIndex.created_date),
      // width: '20%',
    },
    {
      title: 'Статус',
      dataIndex: registerDataIndex.status,
      onFilterDropdownOpenChange: (open: boolean) => {
        // console.log(open);
      },
      sorter: {
        compare: (a, b,) => {
          const productA = a.status.toUpperCase();
          const productB = b.status.toUpperCase();
          if (productA < productB) {
            return -1;
          }
          if (productA > productB) {
            return 1;
          }
          return 0;
        },
        multiple: 3,
      },
      // render: (_, record) => (<StatusCircle title={record.status} />),
      ...getColumnSearchProps(registerDataIndex.status as keyof registryDataObject, (record) => record.status, 'status'),
      ...(registerFilterObject[0]?.status || registerFilterObject.status) && {
        defaultFilteredValue: registerFilterObject[0]?.status || registerFilterObject.status,
      },
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      width: '99px',
      render: (_, record) => (
        <Dropdown arrow={false} menu={menuProps(record)} placement="bottom">
          <Button>...</Button>
        </Dropdown>

      )
    }
  ];

  return registerData ? (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 16,
            headerBg: '#F9FAFB'
          },
        },
      }}
    >
      <Table
        // style={{width: '100%', padding: '24px', background: '#F3F4F6', height: 'calc(100vh - 243px)'}}
        style={{width: '100%', padding: '24px', cursor: 'pointer',
          background: '#F3F4F6', minHeight: 'calc(100vh - 197px)'}}
        columns={columns}
        rowKey={'id'}
        scroll={{
          x: 'true',
          y: 'true'
        }}
        // rowKey={(record) => record.login.uuid}
        // dataSource={registryData}
        dataSource={filterRegistryData(registerData, filter)}
        loading={!registerData}
        pagination={{showSizeChanger: true}}
      />
    </ConfigProvider>
  )
    : <Spinner />;
};

export default TableRegistryAll;