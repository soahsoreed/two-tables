import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {useAuthSate, KeycloakUser} from "./interfaces.ts";
import {client} from "./apollo/client.ts";
import {IAuthServerResponse} from "./auth/models/auth-server-response.ts";
import {LOGIN} from "./auth/requests/LOGIN.ts";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken
} from "./auth/token-access.ts";
import {GET_USER} from "./auth/api/getUsers.ts";
import { LOG_OUT } from "./auth/api/logOut.ts";


export const useAuth = create<useAuthSate>()(
  devtools(
    persist((set) => ({
      isAuth:false,
      error: null,
      accessToken:null,
      refreshToken:null,
      successMessage: null,
      user:null,
      userCredentials: null,
      showErrorModal:false,
      userName : null,
      userId: null,
      errorShown: false,
      setUser:(value: KeycloakUser) => {set({ user: value })},
      setIsAuth:(value) => {set({ isAuth: value })},
      setError:(value) => {set({ error: value })},
      setSuccessMessage:(value) => {set({ successMessage: value })},
      setErrorShown:(value) => {set({ errorShown: value })},
      setUserId:(value) => {set({ userId: value })},
      authUser: async (login, password) => {
        set({errorShown: false})
        const options = {
          mutation: LOGIN,
          variables: {
            login,
            password,
          },
        };

        try {
          const res = await client.mutate(options,);
          if (res.data && res.data.login && 'access_token' in res.data.login && res.data.login.access_token) {
          const data: IAuthServerResponse = res.data.login;
            set({ isAuth: true, },);
            set({ accessToken: data.access_token, },);
            set({ refreshToken: data.refresh_token, },);
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            localStorage.setItem('userName', login,);
            // localStorage.setItem('accessToken', data.access_token,);
            // return 'success';
          } else if (res.errors[0].message.includes('refresh_token') ) {
            set({ error: 'Неверно указаны логин или пароль.', },);
          }
          // if ('refresh_token' in data && data.refresh_token) {
          //   set({ refreshToken: data.refresh_token, },);
          //   localStorage.setItem('refreshToken', data.refresh_token,);
          //   // setRefreshToken(data.refresh_token);
          //   // return 'success';
          // }
        } catch (error) {
          set({ accessToken: null, },);
          if (error instanceof Error ) {
            if (error.message.includes('refresh_token',)) {
              set({ error: 'Неверно указаны логин или пароль.', },);
            }
          } else {
            set({ error: 'Ошибка при авторизации.', },);
          }
        }
      },
      getUser: async (login?: string, curUsername?: string,) => {
        const options = {
          query: GET_USER,
          variables: {}
        };

        try {

          const res = await client.query(options,);

          const userData: KeycloakUser = res.data.getUsers;
          set({ user: userData || null });
          return userData || null;
        } catch (error) {
          // console.error(error);
          return null;
        }
      },
      logOut: async () => {

        try {
          const accessToken = getAccessToken();
          // @ts-ignore
          const userId = get().userId;
          // console.log(userId)
          if (accessToken) {
            const options = {
              mutation: LOG_OUT,
              variables: {
                token: accessToken,
                userId:userId,
              },
            };
            try {
              const res = await client.mutate(options,);
              const data = res.data.logOut;
              removeAccessToken()
              removeRefreshToken()
              localStorage.clear();
              set({ isAuth: false, },);
              set({ accessToken: null, },);
              set({ refreshToken: null, },);
              set({ userId: null, },);
              set({ user: null, },);
              return data;
              //console.log(data)
            } catch (error) {
              // console.error(error);
              return null;
            }
          } else {
            removeAccessToken()
            removeRefreshToken()
            localStorage.clear();
            set({ isAuth: false, },);
            set({ accessToken: null, },);
            set({ refreshToken: null, },);
            set({ userId: null, },);
            set({ user: null, },);
          }

        } catch (error) {
          removeAccessToken()
          removeRefreshToken()
          localStorage.clear();
          set({ isAuth: false, },);
          set({ accessToken: null, },);
          set({ refreshToken: null, },);
          set({ user: null, },);
        }
      },

    }), { name: 'auth_store', },),),);