import {EditOutlined, SearchOutlined} from '@ant-design/icons';
import {Button, Dropdown, Flex, Input, Typography} from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import {IDeal, useDealsHandbook} from "../../../store/deal";
import { HandbookTableData } from "../../custom-handbooks/components/HandbookTableData";
import React from "react";
import UserCircle from "../../../../components/UserCircle.tsx";
import {EditTableDataProps} from "../../../../components/filtration/UniversalHandbookTableData.ts";
import {dateFormatter} from "../../../../components/scripts/dateFormatter.ts";

interface DealsData {
  deal_number: string;
  customer: string;
  project_manager: string;
  started_at: string;
}

type DealsDataIndex = keyof DealsData;

export class DealsTableData extends HandbookTableData {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value) => void;
  private setIsEdit: (value: boolean) => void;

  searchInput: React.RefObject<InputRef>;
  searchText: React.Key;
  searchedColumn: DealsDataIndex;

  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: EditTableDataProps) {
    super();
    this.title = 'Сделки';
    this.searchInput = React.createRef<InputRef>();
    this.searchText = '';
    this.searchedColumn = 'deal_number';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  fetchData() {
    return useDealsHandbook.getState().fetchData()
      .then(data => {
        this.data = data;
      });
  }

  handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DealsDataIndex,
  ) => {
    confirm();
    this.searchText = selectedKeys[0];
    this.searchedColumn = dataIndex;
  };

  handleReset = (clearFilters: () => void, dataIndex: DealsDataIndex, _selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => {
    clearFilters();
    confirm({ closeDropdown: true, },);
    this.searchText = '';
    this.searchedColumn = dataIndex;

  };

  getColumnSearchProps = (dataIndex: DealsDataIndex): TableColumnType<DealsData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: 0, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={(e,) => e.stopPropagation()}>
        <Input
          ref={this.searchInput}
          placeholder={'Введите значение'}
          value={selectedKeys[0]}
          onChange={(e,) => setSelectedKeys(e.target.value ? [e.target.value,] : [],)}
          onPressEnter={() => {
            return this.handleSearch(selectedKeys as string[], confirm, dataIndex,)
          }}
          style={{marginBottom: 8, display: 'block',}}
        />
        <Flex style={{width: '100%',}} justify={'flex-end'} gap={8}>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys as string[], confirm, dataIndex,)}
            icon={<SearchOutlined/>}
            size="small"
            style={{width: 90,}}
          >
            Поиск
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters, dataIndex, selectedKeys as string[], confirm)}
            size="small"
            style={{width: 90,}}
          >
            Сброс
          </Button>
        </Flex>
      </div>

    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.current?.select(), 100);
      }
    },
    render: (text) => <Typography.Text strong>{text}</Typography.Text>
  });

  getColumns(): TableColumnsType<DealsData> {
    return [
      {
        title: 'Номер сделки',
        dataIndex: 'deal_number',
        key: 'deal_number',
        width: '30%',
        sorter: (a, b) => a.deal_number.localeCompare(b.deal_number),
        render: (_, record) => (
          <Flex vertical={true}>
            <Typography.Text
              strong
            >
              {record.deal_number}
            </Typography.Text>
            <Typography.Text strong type={'secondary'}>
              {record.started_at ? `от ${dateFormatter(record.started_at)}` : null }
            </Typography.Text>
          </Flex>
        )  ,
        onFilter: (value, record) =>
          record.deal_number.toLowerCase().includes((value as string).toLowerCase()),
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
                this.searchedColumn = 'deal_number';
              }}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                  this.searchText = selectedKeys[0];
                  this.searchedColumn = 'deal_number';
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
                  this.searchedColumn = 'deal_number';
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
        title: 'Заказчик',
        dataIndex: 'customer',
        key: 'customer',
        width: '30%',
        sorter: (a, b) => a.customer.localeCompare(b.customer),
        ...this.getColumnSearchProps('customer'),
      },
      {
        title: 'Руководитель проекта/продукта',
        dataIndex: 'project_manager',
        key: 'project_manager',
        width: '30%',
        sorter: (a, b) => a.project_manager.localeCompare(b.project_manager),
        render: (_, record) => (
          <Flex gap={8}  align={'center'}>
            <UserCircle name={record.project_manager} />
            <Typography.Text
              strong
            >
              {record.project_manager}
            </Typography.Text>
          </Flex>
        )  ,
        onFilter: (value, record) =>
          record.project_manager.toLowerCase().includes((value as string).toLowerCase()),
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
                this.searchedColumn = 'project_manager';
              }}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                  this.searchText = selectedKeys[0];
                  this.searchedColumn = 'project_manager';
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
                  this.searchedColumn = 'project_manager';
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

  handleEdit = (record: IDeal) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };

}

// export default DealsTableData;
