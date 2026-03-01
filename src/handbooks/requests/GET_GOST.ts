import { gql } from "@apollo/client";

export const GET_GOST = gql`
  query MyQuery {
    handbooks_gost {
      gost_number
      id
      name
    }
  }
`;
