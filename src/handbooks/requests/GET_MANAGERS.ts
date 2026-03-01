import { gql } from "@apollo/client";

export const GET_MANAGERS = gql`
  query MyQuery {
    handbooks_managers {
      email
      id
      name
    }
}
`;
