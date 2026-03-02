import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  id: number;
  isSelected: boolean;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Выбрано?', dataIndex: 'isSelected' },
  { title: 'Id', dataIndex: 'id' },
  { title: 'Название', dataIndex: 'name' },
];


const ItemsTable: React.FC = ({ dataSource }) => {
  const dataSourceWithKeys = dataSource.map((item, index) => ({ ...item, key: index }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType> 
        rowSelection={rowSelection} 
        columns={columns} 
        pagination={{ 
          position: ['bottomRight'],
          
         }}
        dataSource={dataSourceWithKeys} />
    </Flex>
  );
};

export default ItemsTable;