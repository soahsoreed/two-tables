import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
  query GET_ORGANIZATIONS {
    handbooks_organizations {
      code
      id
      name
    }
  }
`;
