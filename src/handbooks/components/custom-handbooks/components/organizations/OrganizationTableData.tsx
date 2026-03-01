import {IOrganization, useOrganizationsHandbook} from "../../../../store/organizations.state";
import { Button, Dropdown, TableColumnsType } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  EditTableDataProps,
  UniversalHandbookTableData
} from "../../../../../components/filtration/UniversalHandbookTableData.ts";
interface OrganisationData {
  id: string;
  code: string;
  name: string;
}

export class OrganizationTableData extends UniversalHandbookTableData<OrganisationData> {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value) => void;
  private setIsEdit: (value: boolean) => void;

  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: EditTableDataProps) {
    super();
    this.title = 'Организации';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  fetchData() {
    return useOrganizationsHandbook.getState().fetchData()
      .then(data => {
        this.data = data;
      });
  }

  getColumns(): TableColumnsType<OrganisationData> {
    return [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Код',
        dataIndex: 'code',
        key: 'code',
        sorter: (a, b) => a.code.localeCompare(b.code),
        ...this.getColumnSearchProps('code'),
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

  handleEdit = (record: IOrganization) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };


}
