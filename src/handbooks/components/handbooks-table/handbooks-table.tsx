import './handbooks-table.scss';
import {ConfigProvider, GetProp, Table, TableProps} from "antd";
export type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// @ts-ignore
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface ITableProps {
  tableColumns: any[];
  title?: string;
  dataSource: any[];
}

// @ts-ignore
function HandbookTable ({ tableColumns, title, dataSource }: ITableProps) {
  // const [loading, setLoading] = useState(false);
  // if (dataSource) {
    // debugger
  // }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBorderRadius: 0,
            headerBg: '#F9FAFB'
          },
        },
      }}
    >
      <Table
        // caption={<div className='table-caption'>{ title }</div>}
        style={{width: '100%',height: 'calc(100vh - 300px)'}}
        columns={tableColumns}
        scroll={{
          x: true,
          y: 'calc(100vh - 420px)'
        }}
        rowKey={'id'}
        // rowKey={(record) => record.login.uuid}
        // dataSource={registryData}
        dataSource={dataSource}
        pagination={{showSizeChanger: true}}
      />
    </ConfigProvider>
  );
}

export default HandbookTable;