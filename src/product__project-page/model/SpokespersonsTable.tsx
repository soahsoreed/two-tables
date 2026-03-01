import {SpokepersonTableDataType} from "../../registry/interfaces.ts";
import {Button, Dropdown, Flex, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, PhoneOutlined, PlusOutlined} from "@ant-design/icons";
import UserCircle from "../../components/UserCircle.tsx";
import {SpokespersonsTableMocData} from "../data/SpokespersonsTableMocData.ts";
import {phoneFormatter} from "../../components/scripts/phoneFormatter.ts";
import {useModals} from "../../store.ts";

const SpokespersonsTable = () => {
    const setDeleteMaterialModalOpen = useModals(state => state.setDeleteMaterialModalOpen)
  const menuProps = (record:SpokepersonTableDataType) => {
    return {
      items: [
        {
          key: '1',
          label: (
            <Button
              danger={true}
              onClick={() => {
                // console.log('попытка удаления', record)
                setDeleteMaterialModalOpen(true)
              }}
              icon={<DeleteOutlined style={{color: 'red'}} />}
              style={{ border: "none", background: 'transparent', boxShadow: 'none' }}
            >
              Удалить
            </Button>
          ),
        },
      ],
    }
  };


  const columns: ColumnsType<SpokepersonTableDataType> = [
    {
      title: 'ФИО',
      dataIndex: 'client_name',
      sorter: true,
      render: (_, record) => (
        <Flex align={'center'} gap={8} style={{width: 'fit-content'}}>
          <UserCircle name={record.client_name} />
          <Typography.Text strong>{record.client_name}</Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone_number',
      sorter: true,
      render: (_, record) => (
        <Flex gap={6}>
          <PhoneOutlined />
          <Typography.Text  strong><a style={{color: '#111928'}} href={`tel:+${record.phone_number}`}>{phoneFormatter(record.phone_number)}</a></Typography.Text>
        </Flex>
      )},
    {
      title: 'Электронная почта',
      dataIndex: 'email',
      width: '30%',
      sorter: true,
      render: (_, record) =>           <Typography.Text  strong><a href={`mailto:${record.email}`}>{record.email}</a></Typography.Text>,
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      render: (_, record) => <Typography.Text type={'secondary'} strong>{record.comment}</Typography.Text>,
      // width: '20%',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      align: 'center',
      render: (_, record) => (
        <Dropdown arrow={false} menu={menuProps(record)} placement="bottom">
          <Button>...</Button>
        </Dropdown>

      )
    }
  ];


  return (
    <Flex style={{width:'100%'}}>
      <Flex vertical={true} style={{width:'100%', padding: '24px', background: '#F3F4F6'}}>
        <Flex style={{ padding: '16px',borderTopLeftRadius: '16px', borderTopRightRadius: '16px', background: 'white'}} justify={'space-between'} align={'center'}>
          <Typography.Title style={{margin: 0}} level={4}>Представители</Typography.Title>
          <Button type={'primary'} style={{height: '34px'}}>Добавить <PlusOutlined /></Button>
        </Flex>
        <Table pagination={{showSizeChanger: true}} style={{width: '100%'}}  columns={columns} dataSource={SpokespersonsTableMocData} />
      </Flex>
    </Flex>
  );
};

export default SpokespersonsTable;