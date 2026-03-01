import { HttpLink } from "@apollo/client/core";
import { getHasuraEndpoint } from "../components/scripts/getHost";
import { isProduction } from "../components/scripts/isProduction";

const HASURA_PORT = "8080";
const hasuraEndpoint = getHasuraEndpoint(HASURA_PORT, isProduction());
export const GRAPHQL_ENDPOINT = `${hasuraEndpoint}/v1/graphql`;

export const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});
