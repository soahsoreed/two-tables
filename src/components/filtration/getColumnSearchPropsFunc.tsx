import { SearchOutlined } from '@ant-design/icons';
import {Button, Flex, Input, Typography} from 'antd';
import type { InputRef, TableColumnType } from 'antd';
import { RefObject } from 'react';
import {FilterDropdownProps} from "antd/es/table/interface";

export function getColumnSearchProps<T>(searchInput: RefObject<InputRef>,
  handleSearch: (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: keyof T) => void,
  handleReset: (clearFilters: () => void, dataIndex: keyof T, selectedKeys: string[], confirm: FilterDropdownProps['confirm']) => void,
  dataIndex: keyof T): TableColumnType<T> {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{
        padding: 8, position: 'absolute', borderRadius: '8px', width: '390px',
        right: 0, display: 'flex', background: 'white', top: -70,
        flexDirection: 'column'
      }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Введите значение`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Flex gap={8}>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => handleReset(clearFilters!, dataIndex, selectedKeys as string[], confirm)}
            size="small"
            style={{ width: 90, marginLeft: 8 }}
          >
            Сброс
          </Button>
        </Flex>

      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => <Typography.Text strong>{text}</Typography.Text>,
  };
}
