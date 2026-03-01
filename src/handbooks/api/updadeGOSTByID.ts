import { gql } from "@apollo/client";

export const UPDATE_GOST = gql`
  mutation UpdateHandbooksGost(
    $id: uuid!
    $gost_number: String!
    $name: String!
  ) {
    update_handbooks_gost_by_pk(
      pk_columns: { id: $id }
      _set: { gost_number: $gost_number, name: $name }
    ) {
      id
      gost_number
      name
    }
  }
`;