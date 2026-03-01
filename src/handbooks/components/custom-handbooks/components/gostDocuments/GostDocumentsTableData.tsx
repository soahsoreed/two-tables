import {IGostDocument, useGostDocumentsHandbook} from "../../../../store/gost-documents.state";
import {
  EditTableDataProps,
  UniversalHandbookTableData
} from "../../../../../components/filtration/UniversalHandbookTableData.ts";
import {Button, Dropdown, Flex, Input, TableColumnsType, Typography} from "antd";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {GostData} from "../../../../../registry/interfaces.ts";
// @ts-ignore
interface GOSTDocumentData {
  id: string;
  gost: GostData;
  project_stage: string;
  code: string;
  name: string;
}

export class GostDocumentsTableData extends UniversalHandbookTableData<IGostDocument> {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value) => void;
  private setIsEdit: (value: boolean) => void;

  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: EditTableDataProps) {
    super();
    this.title = 'Документы ГОСТ';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  getColumns(): TableColumnsType<IGostDocument> {
    return [
      {
        title: 'Номер ГОСТ',
        dataIndex: 'gost',
        key: 'gost_number',
        width: '170px',
        sorter: (a, b) => a.gost.gost_number.localeCompare(b.gost.gost_number),
        render: (_, record) => <Typography.Text strong>{record.gost.gost_number}</Typography.Text>  ,
        onFilter: (value, record) =>
          record.gost.gost_number.toLowerCase().includes((value as string).toLowerCase()),
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
                this.searchedColumn = 'gost';
              }}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Flex gap={8}>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                  this.searchText = selectedKeys[0];
                  this.searchedColumn = 'gost';
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
                  this.searchedColumn = 'gost';
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
        title: 'Стадия проекта',
        dataIndex: 'project_stage',
        key: 'project_stage',
        width: '170px',
        sorter: (a, b) => a.project_stage.localeCompare(b.project_stage),
        ...this.getColumnSearchProps('project_stage'),
      },
      {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.localeCompare(b.code),
        ...this.getColumnSearchProps('code'),
      },
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        ellipsis:true,
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('name'),
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

  handleEdit = (record: IGostDocument) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };

  fetchData() {
    return useGostDocumentsHandbook.getState().fetchData()
      .then(gosts => {
        this.data  = gosts;
      });
  }
}