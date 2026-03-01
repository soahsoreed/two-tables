import { gql } from "@apollo/client";

export const SOFT_DELETE_DOCUMENT = gql`
  mutation update_handbooks_register_entity_documents_by_pk($id: uuid!, $status: String!, $comment_on_delete: String) {
    update_handbooks_register_entity_documents_by_pk(
     pk_columns: { id: $id }
     _set: { status: $status, comment_on_delete: $comment_on_delete }
    ) {
      id
    }
  }
 `;
