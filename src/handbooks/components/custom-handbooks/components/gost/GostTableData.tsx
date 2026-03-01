import { useGostHandbook } from "../../../../store/gost.state";
import {
  EditTableDataProps,
  UniversalHandbookTableData
} from "../../../../../components/filtration/UniversalHandbookTableData.ts";
import {Button, Dropdown, TableColumnsType} from "antd";
import { EditOutlined } from "@ant-design/icons";

interface GOSTData {
  id: string;
  gost_number: string;
  name: string;
}

export class GostTableData extends UniversalHandbookTableData<GOSTData> {
  private setIsModalOpen: (value: boolean) => void;
  private setInitialValues: (value) => void;
  private setIsEdit: (value: boolean) => void;

  constructor({
    setIsModalOpen,
    setInitialValues,
    setIsEdit,
  }: EditTableDataProps) {
    super();
    this.title = 'ГОСТы';
    this.columns = this.getColumns();
    this.setIsModalOpen = setIsModalOpen;
    this.setInitialValues = setInitialValues;
    this.setIsEdit = setIsEdit;
  }

  getColumns(): TableColumnsType<GOSTData> {
    return [
      {
        title: 'Номер ГОСТ',
        dataIndex: 'gost_number',
        key: 'gost_number',
        width: '150px',
        sorter: (a, b) => a.gost_number.localeCompare(b.gost_number),
        ...this.getColumnSearchProps('gost_number'),
      },
      {
        title: 'Наименование',
        dataIndex: 'name',

        key: 'name',
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

  handleEdit = (record: GOSTData) => {
    this.setIsModalOpen(true);
    this.setInitialValues(record);
    this.setIsEdit(true);
  };

  fetchData() {
    return useGostHandbook.getState().fetchData()
      .then(gosts => {
        this.data = gosts;
      });
  }


}
