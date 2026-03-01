import { gql } from "@apollo/client";

export const CHANGE_PRODUCT_STATUS_BY_ID = gql`
  mutation update_register_entity_by_pk($id: uuid!, $status: String!,
   $comment_on_delete: String, $delete_date: date) {
    update_register_entity_by_pk(
     pk_columns: { id: $id }
     _set: { status: $status, comment_on_delete: $comment_on_delete,
      delete_date: $delete_date}
    ) {
      id
    }
  }
 `;
