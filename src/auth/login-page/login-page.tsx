import './login-page.scss';
import { useState } from 'react'
import loginPageLogo from '../../assets/svg/logo.svg'
import togglePasswordIcon from '../../assets/svg/eye-slash-outline.svg'
import { client } from '../../apollo/client';
import {
  Button,
  Label,
  TextInput,
} from "flowbite-react";
import { LOGIN } from '../requests/LOGIN';
import { 
  setAccessToken, 
  setRefreshToken 
} from '../token-access';
import { IAuthServerResponse } from '../models/auth-server-response';
import { requiredValidate } from '../../validators/requiredValidate';
import { useAuthStore } from '../auth.store';
import {Typography} from "antd";


function LoginPageOld() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const setIsAuthenticated = useAuthStore(((state) => state.setIsAuthenticated));
  
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
    const options = {
      mutation: LOGIN,
      variables: {
        login: email,
        password
      }
    };

    client.mutate<{ login: IAuthServerResponse }>(options)
      .then(({ data }) => {
        if (data) {
          const { access_token, refresh_token } = data?.login;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setIsAuthenticated(true);
        }
      })
      .catch(err => {
        return
      });
  }

  return (
    <>
      <div className='login-page'>
        <div className="login-page__left-block">
          <div className="login-page__logo">
            <img src={loginPageLogo} />
          </div>
          <div className="login-page__form">
            <div className="login-page__form-label">
              <div className="login-page__form-label--main">Добро пожаловать!</div>
              <div className="login-page__form-label--sub">Войдите в систему</div>
            </div>

            <div className="login-page__input">
              <Typography.Text strong>Электронная почта</Typography.Text>
              <TextInput 
                id="email-input"
                required
                color={emailIsValid ? 'success' :'failure'}
                onChange={e => onEmailChange(e.target.value)}>
              </TextInput>
            </div>

            <div className="login-page__input password-input-wrapper">
              <Label htmlFor="password-input">Пароль</Label>
              <TextInput 
                id="password-input"
                type={passwordVisible ? 'text': 'password'}
                required
                color={passwordIsValid ? 'success' : 'failure'}
                onChange={e => onPasswordChange(e.target.value)}>
              </TextInput>

              <button className="absolute end-2 top-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center toggle-password-button"
                onClick={() => setPasswordVisible(!passwordVisible)}>
                <span id="default-icon">
                  { passwordVisible
                    ? <img src={togglePasswordIcon} alt="" /> 
                    : <img src={togglePasswordIcon} alt="" />
                  }
                </span>
              </button>
            </div>

            <div className="login-page__actions">
              <Button 
                color="blue" 
                onClick={() => submitData()}
                disabled={!emailIsValid || !passwordIsValid}>
                        Войти
              </Button>
            </div>
          </div>
        </div>

        <div className="login-page__right-block">
        </div>
      </div>

    </>
  )
}

export default LoginPageOld
