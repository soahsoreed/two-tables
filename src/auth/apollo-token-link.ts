import { ApolloLink } from '@apollo/client/core';
import { getAccessToken } from './token-access';

function createAuthHeaders(token: string) {
  return {
    authorization: `Bearer ${token}`
  }
}

export const apolloTokenLink = new ApolloLink((operation, forward) => {
  if (operation.operationName === 'login' || operation.operationName === 'refreshToken') {
    return forward(operation);
  }

  const token = getAccessToken();

  const headers = token ? createAuthHeaders(token) : {};

  operation.setContext({
    headers: {
      ...headers
    }
  });
  return forward(operation);
});