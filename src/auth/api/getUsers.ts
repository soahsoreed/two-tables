import { gql, } from '@apollo/client';

export const GET_USER = gql`
  query MyQuery {
    getUsers {
      email
      email_verified
      family_name
      given_name
      name
      preferred_username
      sub
    }
}`;
