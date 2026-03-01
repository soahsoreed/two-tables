import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_FETCH } from "./requests/REFRESH_TOKEN";
import { GRAPHQL_ENDPOINT } from "./apollo-http-link";
import {
  getRefreshToken, 
  removeAccessToken, 
  removeRefreshToken,
  setTokens, 
} from "./token-access";


const JWT_TOKEN_EXPIRED_MESSAGE = "Could not verify JWT: JWTExpired";

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if ( !graphQLErrors ) {
    return forward(operation);
  }

  const errorMessages = graphQLErrors.map(error => error.message)

  if (errorMessages.includes(JWT_TOKEN_EXPIRED_MESSAGE)) {
    fetchRefreshToken();
  }

  return forward(operation);
});


function fetchRefreshToken() {
  return fetch(GRAPHQL_ENDPOINT, {
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
      query: REFRESH_TOKEN_FETCH,
      variables: {
        refreshToken: getRefreshToken()
      }
    })
  })
    .then(res => res.json())
    .then(res => {
      setTokens(res.data.refreshToken);
    })
    .catch(_ => {
      removeAccessToken()
      removeRefreshToken()
    })
    .finally(() => {
      location.reload();
    })
}