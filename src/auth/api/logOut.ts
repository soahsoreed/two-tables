import { gql, } from '@apollo/client';

export const LOG_OUT = gql`
  query logOut($token: String!, $userId: String) {
    logOut(token: $token, userId: $userId) {
      success 
    }
  }
`;
