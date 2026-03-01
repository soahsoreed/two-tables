import { gql } from "@apollo/client";

export const UPDATE_ORGANIZATION = gql`
  mutation MyMutation(
    $id: uuid!
    $code: String!
    $name: String!
  ) {
    update_handbooks_organizations_by_pk(
      pk_columns: { id: $id }
      _set: { code: $code, name: $name }
    ) {
      id
      code
      name
    }
  }
`;