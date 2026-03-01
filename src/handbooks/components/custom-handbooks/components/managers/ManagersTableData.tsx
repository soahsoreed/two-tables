import {IManager, useManagersHandbook} from "../../../../store/managers";
import {UniversalHandbookTableData} from "../../../../../components/filtration/UniversalHandbookTableData.ts";
import {Button, Dropdown, TableColumnsType} from "antd";
import {EditOutlined} from "@ant-design/icons";

interface ManagersTableDataProps {
  setIsModalOpen: (value: boolean) => void;
  setInitialValues: (value: IManager) => void;
  setIsEdit: (value: boolean) => void;
}

export class ManagersTableData extends UniversalHandbookTableData<IManager>  {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value: IManager) => void;
  private setIsEdit: (value: boolean) => void;


  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: ManagersTableDataProps) {
    super();
    this.title = 'ГАП';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  getColumns(): TableColumnsType<IManager> {
    return [
      {
        title: 'ФИО',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Электронная почта',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        ...this.getColumnSearchProps('email'),
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
  

  fetchData() {
    return useManagersHandbook.getState().fetchData()
      .then(data => {
        this.data  = data;
      });
  }

  handleEdit = (record: IManager) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };
}