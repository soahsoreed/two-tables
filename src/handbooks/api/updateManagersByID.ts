import { gql } from "@apollo/client";

export const UPDATE_MANAGER = gql`
  mutation updateManagerByPk($id: uuid!, $name: String!, $email: String!) {
    update_handbooks_managers_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, email: $email }
    ) {
      email
      name
    }
  }
`;