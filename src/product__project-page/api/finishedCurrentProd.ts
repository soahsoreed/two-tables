import { gql } from "@apollo/client";

export const FINISHED_PRODUCT_BY_ID = gql`
  mutation finished_register_entity_by_pk($id: uuid!, $status: String!, $comment_on_finished: String) {
    update_register_entity_by_pk(
     pk_columns: { id: $id }
     _set: { status: $status, comment_on_finished: $comment_on_finished }
    ) {
      id
    }
  }
 `;
