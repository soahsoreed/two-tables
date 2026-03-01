import './page-not-found.scss';
import {Button, ConfigProvider, Flex, Result} from "antd";
import ruRU from "antd/locale/ru_RU";
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import {ResultStatusType} from "antd/es/result";

function ErrorPage() {
  // const { Text, } = Typography;
  let errorCode: number | string;
  const error = useRouteError();
  if (isRouteErrorResponse(error,)) {
    // error is type `ErrorResponse`
    errorCode = error.status;
  } else {
    errorCode = 'Unknown error';
  }

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          fontFamily: 'Inter',
        }, }}>
      <Flex align={'center'} justify={'center'} style={{ background:'#F8F9FA', minHeight: '100vh', width: '100%', padding: '0 16px', }}>
        <Result
          status={( typeof errorCode == 'number') ? errorCode.toString() as ResultStatusType  : "404"}
          title={'Ошибка'}
          subTitle="Упс! Что-то пошло не так."
          extra={<Button type="primary" href={'/'} onClick={() => localStorage.clear()}>На главную</Button>}
        />
        {/*<Flex gap={24} align={'center'} style={{ width: '446px', }} vertical={true}>*/}
        {/*  {errorCode === 403*/}
        {/*    ?*/}
        {/*    // <img width={254} height={294} src={errorImage403} alt="error image"/>*/}
        {/*    <img width={254} height={294}  alt="error image"/>*/}
        {/*    :*/}
        {/*    // <img width={254} height={294} src={errorImage404} alt="error image"/>*/}
        {/*    <img width={254} height={294}  alt="error image"/>*/}
        {/*  }*/}

        {/*  <Flex align={'center'} style={{ width: '100%', }} vertical={true}>*/}
        {/*    <p style={{ fontSize: '24px', fontWeight: '600', lineHeight: '32px', }}>Ошибка {errorCode}</p>*/}
        {/*    <Text type="secondary">*/}
        {/*      {errorCode === 403*/}
        {/*        ?*/}
        {/*        'Вы пытаетесь попасть на страницу к которой у вас нет доступа '*/}
        {/*        :*/}
        {/*        'Упс! Что-то пошло не так :('*/}
        {/*      }*/}
        {/*    </Text>*/}
        {/*  </Flex>*/}
        {/*  <Button type={'primary'} href={'/'}>На главную</Button>*/}

        {/*</Flex>*/}
      </Flex>
    </ConfigProvider>
  );
}

export default ErrorPage;
