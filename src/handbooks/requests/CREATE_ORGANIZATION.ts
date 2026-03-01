import { gql } from "@apollo/client";


export const CREATE_ORGANIZATION = gql`
  mutation insert_handbooks_organizations_one($name: String!, $code: String!) {
    insert_handbooks_organizations_one(object: {name: $name, code: $code}) {
      id
    }
  }
`;
