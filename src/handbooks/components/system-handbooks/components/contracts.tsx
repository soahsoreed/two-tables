import moment from "moment";
import {useContractsHandbook} from "../../../store/contracts";
import {
  EditTableDataProps,
  UniversalHandbookTableData
} from "../../../../components/filtration/UniversalHandbookTableData.ts";
import {Button, DatePicker, Dropdown, Flex, Input, TableColumnsType, Typography} from "antd";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";

const { RangePicker } = DatePicker;
interface ContractsData {
  contract_number: string;
  developer_organization?: any;
  counterparty: string;
  date_start: string;
}

export class ContractsTableData extends UniversalHandbookTableData<ContractsData> {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value) => void;
  private setIsEdit: (value: boolean) => void;

  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: EditTableDataProps) {
    super();
    this.title = 'Договоры';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  fetchData() {
    return useContractsHandbook.getState().fetchData()
      .then(data => {
        this.data  = data;
      });
  }

  handleDateRangeFilter = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: keyof ContractsData
  ) => {
    confirm({ closeDropdown: false, },);
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  };

  // handleDateRangeFilter = (
  //   value: [Moment | null, Moment | null],
  //   confirm: FilterDropdownProps['confirm'],
  //   dataIndex: keyof ContractsData
  // ) => {
  //   confirm();
  //   this.searchText = value.map((date) => (date ? moment(date).format('YYYY-MM-DD') : '')).join(',');
  //   this.searchedColumn = dataIndex;
  // };

  handleDateRangeReset = (
    clearFilters: () => void,
    dataIndex: keyof ContractsData,
    _: string[],
    confirm: FilterDropdownProps['confirm']
  ) => {
    clearFilters();
    confirm({ closeDropdown: true });
    this.searchText = '';
    this.searchedColumn = dataIndex;
  };

  getColumns(): TableColumnsType<ContractsData> {

    return [
      {
        title: 'Номер договора',
        dataIndex: 'contract_number',
        key: 'contract_number',
        sorter: (a, b) => a.contract_number.localeCompare(b.contract_number),
        ...this.getColumnSearchProps('contract_number'),
      },
      {
        title: 'Организация',
        dataIndex: 'developer_organization',
        key: 'organization_name',
        sorter: (a, b) => a.developer_organization.name.localeCompare(b.developer_organization.name),
        render: (_, record) => <Typography.Text strong>{record.developer_organization.name}</Typography.Text>  ,
        onFilter: (value, record) =>
          record.developer_organization.name.toLowerCase().includes((value as string).toLowerCase()),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{
            padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
            right: 0, display: 'flex', background: 'white', top: -70,
            flexDirection: 'column'
          }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              placeholder="Введите значение"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => {
                confirm();
                this.searchText = selectedKeys[0];
                this.searchedColumn = 'developer_organization';
              }}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                  this.searchText = selectedKeys[0];
                  this.searchedColumn = 'developer_organization';
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>
              <Button
                onClick={() => {
                  clearFilters!();
                  confirm({ closeDropdown: true });
                  this.searchText = '';
                  this.searchedColumn = 'developer_organization';
                }}
                size="small"
                style={{ width: 90, marginLeft: 8 }}
              >
                Сброс
              </Button>
            </Flex>

          </div>
        ),
      },
      {
        title: 'Контрагент',
        dataIndex: 'counterparty',

        key: 'developer_organization_name',
        render: (_, record) => record.counterparty,
        sorter: (a, b) => a.counterparty.localeCompare(b.counterparty),
        ...this.getColumnSearchProps('counterparty'),
      },
      {
        title: 'Дата начала договора',
        dataIndex: 'date_start',
        key: 'date_start',
        // width: '200px',
        sorter: (a, b) => moment(a.date_start).unix() - moment(b.date_start).unix(),
        render: (item) => <Typography.Text strong>{moment(item).format('DD.MM.YYYY')}</Typography.Text> ,
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <Flex gap={8}  vertical style={{
            padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
            right: 0, display: 'flex', background: 'white', top: -70,
            flexDirection: 'column'
          }} onKeyDown={(e) => e.stopPropagation()}>
            <RangePicker
              format={'DD.MM.YYYY'}
              onChange={(value) => {
                // @ts-ignore
                setSelectedKeys(value ? [value] : []);
                if (!value) {
                  this.handleDateRangeReset(clearFilters, 'date_start', selectedKeys as string[], confirm);
                }
              }}
              style={{ marginBottom: 8 }}
            />
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => this.handleDateRangeFilter(selectedKeys as string[], confirm, 'date_start',)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>
              <Button
                onClick={() => this.handleDateRangeReset(clearFilters!, 'date_start', selectedKeys as string[], confirm)}
                size="small"
                style={{ width: 90, marginLeft: 8 }}
              >
                Сброс
              </Button>
            </Flex>


          </Flex>
        ),
        onFilter: (value, record) => {
          // @ts-ignore
          const date = new Date(record['date_start']);
          const startDate = new Date(value[0]);
          const endDate = new Date(value[1]);

          endDate.setDate(endDate.getDate() + 1);
          endDate.setUTCHours(23, 59, 59, 999);

          return startDate <= date && date <= endDate;
        },
      },
      {
        title: 'Действия',
        dataIndex: 'action',
        width: '100px',
        align: 'center',
        render: (_, record) => (
          <Dropdown
            arrow={false}
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <Button
                      onClick={() => {
                        this.handleEdit(record)
                      }}
                      style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}
                    >
                      <EditOutlined style={{ fontSize: '16px' }} />
                      Редактировать
                    </Button>
                  ),
                },
              ],
            }}
            placement="bottom"
          >
            <Button>...</Button>
          </Dropdown>
        ),
        key: 'action',
      },
    ];
  }

  handleEdit = (record: ContractsData) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };

}