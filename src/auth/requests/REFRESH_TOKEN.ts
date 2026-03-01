// import { gql } from "apollo-angular";

import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token,
      expires_in,
      refresh_expires_in,
      refresh_token,
      token_type,
      session_state,
      scope
    }
}`;

export const REFRESH_TOKEN_FETCH = `
mutation refreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    access_token,
    expires_in,
    refresh_expires_in,
    refresh_token,
    token_type,
    session_state,
    scope
  }
}`;
