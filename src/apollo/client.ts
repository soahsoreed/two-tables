
import { 
  ApolloClient,
  ApolloLink, 
  ErrorPolicy, 
  FetchPolicy, 
  InMemoryCache, 
  WatchQueryFetchPolicy 
} from '@apollo/client/core';
import { apolloTokenLink } from '../auth/apollo-token-link';
import { errorLink } from '../auth/apollo-error-link';
import { httpLink } from '../auth/apollo-http-link';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache' as WatchQueryFetchPolicy,
    errorPolicy: 'ignore' as ErrorPolicy,
  },
  query: {
    fetchPolicy: 'no-cache' as FetchPolicy,
    errorPolicy: 'all' as ErrorPolicy,
  },
  mutate: {
    errorPolicy: 'all' as ErrorPolicy,
  },
}

export function apolloClientFactory() {
  return new ApolloClient({
    link: ApolloLink.from([
      apolloTokenLink, 
      errorLink, 
      httpLink
    ]),
    cache: new InMemoryCache(),
    defaultOptions
  })
}

export const client = apolloClientFactory();
