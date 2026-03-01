// import { gql } from "apollo-angular";

import { gql } from "@apollo/client";

export const LOGOUT = gql`
  mutation logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      ok
    }
}`;

// access_token,
// expires_in,
// refresh_expires_in,
// refresh_token,
// token_type,
// session_state,
// scope

// export const REFRESH_TOKEN_FETCH = `
// mutation refreshToken($refreshToken: String!) {
//   refreshToken(refreshToken: $refreshToken) {
//     access_token,
//     expires_in,
//     refresh_expires_in,
//     refresh_token,
//     token_type,
//     session_state,
//     scope
//   }
// }`;
