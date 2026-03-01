import {EduTableDataType} from "../../registry/interfaces.ts";
import {Button, Dropdown, Flex, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import {DeleteOutlined, LinkOutlined, PlusOutlined} from "@ant-design/icons";
import UserCircle from "../../components/UserCircle.tsx";
import {EduTableMocData} from "../data/EduTableMocData.ts";
import {useModals} from "../../store.ts";

const SourceCodeTable = () => {

      const setDeleteMaterialModalOpen = useModals(state => state.setDeleteMaterialModalOpen)
  const menuProps = (record:EduTableDataType) => {
    console.log(record)
    return {
      items: [
        {
          key: '1',
          label: (
            <Button
              danger={true}
              onClick={() => setDeleteMaterialModalOpen(true)}
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


  const columns: ColumnsType<EduTableDataType> = [
    {
      title: 'Ссылка',
      dataIndex: 'link',
      width: '300px',
      sorter: true,
      render: (_, record) => (
        <Flex gap={6} style={{maxWidth: '300px'}}>
          <LinkOutlined />
          <Typography.Text style={{overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis'}} strong>
            <a style={{color: '#1F2A37'}} href={record.link} target={'_blank'}>{record.link}</a>
          </Typography.Text>
        </Flex>
      )},
    {
      title: 'Кто добавил',
      dataIndex: 'who_added',
      sorter: true,
      width: '30%',
      render: (_, record) => (
        <Flex align={'center'} gap={8} style={{width: 'fit-content'}}>
          <UserCircle name={record.who_added} />
          <Typography.Text strong>{record.who_added}</Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      width: '30%',
      sorter: true,
      render: (_, record) => <Typography.Text type={'secondary'} strong>{record.comment}</Typography.Text>,
    },
    {
      title: 'Дата добавления',
      dataIndex: 'add_date',
      render: (_, record) => <Typography.Text strong>{record.add_date}</Typography.Text>,
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
          <Typography.Title style={{margin: 0}} level={4}>Исходный код</Typography.Title>
          <Button type={'primary'} style={{height: '34px'}}>Добавить <PlusOutlined /></Button>
        </Flex>
        <Table pagination={{showSizeChanger: true}} style={{width: '100%'}}  columns={columns} dataSource={EduTableMocData} />
      </Flex>
    </Flex>
  );
};

export default SourceCodeTable;