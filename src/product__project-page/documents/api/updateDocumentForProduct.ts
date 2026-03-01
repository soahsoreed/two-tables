import { gql } from "@apollo/client";

export const UPDATE_DOCUMENT_BY_ID = gql`
  mutation UpdateDocument(
    $id: uuid!
    $additionalNumberExecution: String
    $partNumber: String
    $partNumberExecution: String
    $link: String,
    $decimal_number: String,
    $volume: String,
  ) {
    update_handbooks_register_entity_documents_by_pk(
      pk_columns: { id: $id }
      _set: {
        additionalNumberExecution: $additionalNumberExecution,
        partNumber: $partNumber,
        partNumberExecution: $partNumberExecution,
        link: $link,
        decimal_number: $decimal_number,
        volume: $volume
      }
    ) {
      id
      additionalNumberExecution
      partNumber
      partNumberExecution
      link
      volume
    }
  }
`;