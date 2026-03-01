import './login-page.scss';
import {useEffect, useState} from 'react'
import loginPageLogo from '../../assets/svg/logo.svg'

import { requiredValidate } from '../../validators/requiredValidate';
// import { useAuthStore } from '../auth.store';
import {App, Button, Flex, Input, Typography} from "antd";
import {useAuth} from "../../authStore.ts";
import {useNavigate} from "react-router-dom";
import { KeycloakUser } from "../../interfaces.ts";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const authUser = useAuth(state => state.authUser)
  const accessToken  = useAuth(state => state.accessToken )
  const isAuth  = useAuth(state => state.isAuth )
  const getUser  = useAuth(state => state.getUser)
  const error  = useAuth(state => state.error )
  const setErrorShown  = useAuth(state => state.setErrorShown )
  const setError  = useAuth(state => state.setError )
  // const errorShown  = useAuth(state => state.errorShown )
  const setUserId  = useAuth(state => state.setUserId )
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const openErrorNotification = (description: string,) => {
    notification.error({
      placement: 'bottom',
      message: 'Ошибка!',
      description: description,
      duration: 1.5,
      style: {
        width: '353px',
      },
      onClose: () => {
        setError(null,);
        // setIsSuccessUses(false,);
      },
    },);
  };

  useEffect(() => {
    // if (error && !errorShown) {
    if (error) {
      setErrorShown(true,);
      openErrorNotification(error,);
    }
  }, [ error ],);

  useEffect(() => {
    if (accessToken || isAuth) {
      navigate('/registry',);
    }else {
      navigate('/login',);
    }
  }, [ accessToken , isAuth, ],);

  // const setIsAuthenticated = useAuthStore(((state) => state.setIsAuthenticated));

  function onEmailChange(email: string) {
    const isValid = requiredValidate(email);
    setEmailIsValid(isValid);
    setEmail(email);
  }

  function onPasswordChange(password: string) {
    const isValid = requiredValidate(password);
    setPasswordIsValid(isValid);
    setPassword(password);
  }

  function submitData() {
    authUser( email, password).then(async () => {
      const userInfo: KeycloakUser | null = await getUser(email);
      if (userInfo) {
        setUserId(userInfo.sub);
      }
    },);



    // const options = {
    //   mutation: LOGIN,
    //   variables: {
    //     login: email,
    //     password
    //   }
    // };
    //
    // client.mutate<{ login: IAuthServerResponse }>(options)
    //   .then(({ data }) => {
    //     if (data) {
    //       // eslint-disable-next-line no-unsafe-optional-chaining
    //       const { access_token, refresh_token } = data?.login;
    //       setAccessToken(access_token);
    //       setRefreshToken(refresh_token);
    //       setIsAuthenticated(true);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && emailIsValid && passwordIsValid) {
      submitData();
    }
  }

  return (
    <>
      <div className='login-page'>
        <div className="login-page__left-block">
          <Flex vertical gap={144} justify="center" style={{width:'100%', height: '670px'}}>
            <div className="login-page__logo">
              <img src={loginPageLogo} />
            </div>
            <Flex style={{width:'100%'}} justify={'center'}>
              <div className="login-page__form" onKeyDown={handleKeyDown} tabIndex={0}>
                <div className="login-page__form-label">
                  <div className="login-page__form-label--main">Добро пожаловать!</div>
                  <div className="login-page__form-label--sub">Войдите в систему</div>
                </div>


                <div className="login-page__input">
                  {/*<Label>Электронная почта</Label>*/}
                  <Typography.Text style={{fontWeight: 'bold'}}>Логин</Typography.Text>
                  <Input
                    style={{height: '42px'}}

                    // label={'Электронная почта'}
                    id="email-input"
                    required
                    color={emailIsValid ? 'success' :'failure'}
                    onChange={e => onEmailChange(e.target.value)}>

                  </Input>
                </div>

                <div className="login-page__input password-input-wrapper">
                  {/*<Label htmlFor="password-input">Пароль</Label>*/}
                  <Typography.Text style={{fontWeight: 'bold'}}>Пароль</Typography.Text>
                  <Input.Password
                    style={{height: '42px'}}
                    // label={'Пароль'}
                    id="password-input"
                    required
                    color={passwordIsValid ? 'success' : 'failure'}
                    onChange={e => onPasswordChange(e.target.value)}>

                  </Input.Password>

                  <div className="absolute end-2 top-1/2 text-gray-500 dark:text-gray-400  rounded-lg p-2 inline-flex items-center justify-center toggle-password-button"
                    onClick={() => setPasswordVisible(!passwordVisible)}>
                    {/*<span id="default-icon">*/}
                    {/*  { passwordVisible*/}
                    {/*    ? <EyeOutlined />*/}
                    {/*    : <EyeInvisibleOutlined />*/}
                    {/*  }*/}
                    {/*</span>*/}
                  </div>
                </div>

                <div className="login-page__actions">
                  <Button
                    style={{height: '40px'}}
                    type={'primary'}
                    color="blue"
                    onClick={() => submitData()}
                    disabled={!emailIsValid || !passwordIsValid}>
                    Войти
                  </Button>
                </div>
              </div>
            </Flex>
          </Flex>
        </div>

        <div className="login-page__right-block">
        </div>
      </div>

    </>
  )
};

const MyApp: React.FC = () => (
  <App style={{height: '100vh'}}>
    <LoginPage />
  </App>
);

export default MyApp;