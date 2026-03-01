import { gql, } from '@apollo/client';


export const LOGIN = gql`
  query login($login: String!, $password: String!) {
    login(data: {login: $login, password: $password}) {
      access_token,
      expires_in,
      refresh_expires_in,
      refresh_token,
      lastname,
      token_type,
      session_state,
      scope
    }
}`;

