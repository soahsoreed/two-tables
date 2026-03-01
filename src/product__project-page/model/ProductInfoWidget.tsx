import {ConfigProvider, Flex, Typography} from "antd";
import StatusCircle from "../../components/StatusCircle.tsx";
import DecimalNumberTag from "../../components/DecimalNumberTag.tsx";
import {useProduct_Project} from "../../store.ts";
import moment from "moment";
import {useState} from "react";

const ProductInfoWidget = () => {
  const currentProdData = useProduct_Project(state => state.currentProdData)
  const [rows, _] = useState(2);
  const [expanded, setExpanded] = useState(false);

  return currentProdData ?  (
    <ConfigProvider
      theme={{
        token: {
          lineHeight: 1.3
        },
      }}
    >
      <Flex style={{marginTop: '16px', padding: '16px 24px'}}>
        <Flex vertical={true} gap={16} style={{width:'100%'}}>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Проект/Продукт</Typography.Text>
            <Typography.Text strong>
              {currentProdData.type === 'product' ? 'Продукт' : 'Проект'}
            </Typography.Text>
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Номер договора</Typography.Text>
            <Typography.Text strong>
              {(currentProdData.contract && currentProdData.contract.contract_number) ?
                currentProdData.contract.contract_number : '--'}
            </Typography.Text>
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Главный архитектор</Typography.Text>
            <Typography.Text strong>
              {(currentProdData.manager_architector && currentProdData.manager_architector.name) ?
                currentProdData.manager_architector.name : '--'}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex vertical={true} gap={16} style={{width:'100%'}}>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Тип проекта/продукта</Typography.Text>
            <Typography.Text strong>{currentProdData.sub_type === 'program' ? '' +
            'Программный' :
              'программно-аппаратный'
            }</Typography.Text>
          
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>ГОСТ</Typography.Text>
            <Typography.Text strong>{currentProdData.gost?.gost_number || '-'}</Typography.Text>
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Статус</Typography.Text>
            <Flex gap={6} align={'center'}>
              <StatusCircle title={currentProdData.status}></StatusCircle>
              {/*<Typography.Text strong>В работе</Typography.Text>*/}
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical={true} gap={16} style={{width:'100%'}}>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Исполнитель</Typography.Text>
            <Typography.Text strong>{currentProdData.organization.name}</Typography.Text>
          </Flex>
          <Flex vertical={true} gap={4} style={{width:'fit-content'}}>
            <Typography.Text strong type={'secondary'}>Децимальный номер проекта</Typography.Text>
            <DecimalNumberTag title={currentProdData.decimal_number} page={'productPage'} />
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Дата добавления</Typography.Text>
            <Typography.Text strong>{ moment(currentProdData.created_date).format('DD.MM.YYYY')}</Typography.Text>
          </Flex>
        </Flex>
        <Flex vertical={true} gap={16} style={{width:'100%'}}>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Номер сделки</Typography.Text>
            <Flex gap={3}>
              <Typography.Text strong>{currentProdData.deal.deal_number}</Typography.Text>
              <Typography.Text strong type={'secondary'}>{` от ${ moment(currentProdData.deal.started_at).format('DD.MM.YYYY')}`}</Typography.Text>
            </Flex>
          </Flex>
          <Flex vertical={true} gap={4}>
            <Typography.Text strong type={'secondary'}>Руководитель проекта</Typography.Text>
            <Typography.Text strong>{currentProdData.deal.project_manager}</Typography.Text>
          </Flex>
          <Flex vertical={true} gap={4} style={{maxWidth: 366}}>
            <Typography.Text strong type={'secondary'}>Комментарий</Typography.Text>
            <Typography.Paragraph strong ellipsis={{
              rows, expandable: 'collapsible', expanded, onExpand: (_, info) => setExpanded(info.expanded),
              symbol: (expanded) =>  <>{expanded ? 'Свернуть' : 'Раскрыть'}</>
            }}>
              {currentProdData.comment  || '-'}
            </Typography.Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  ) : null;
};

export default ProductInfoWidget;