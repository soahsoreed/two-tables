
import { gql } from "@apollo/client";


export const INSERT_NEW_DOCUMENT_FOR_PRODUCT = gql`
  mutation insert_handbooks_register_entity_documents_one($decimal_number: String, $gost_document_id: uuid,
  $link: String, $product_id: uuid, $gost_id: uuid, $name: String, $volume: String ) {
    insert_handbooks_register_entity_documents_one(
      object: {decimal_number: $decimal_number, gost_document_id: $gost_document_id,
      link: $link, product_id: $product_id, gost_id: $gost_id, name: $name, volume:$volume}) {
      id
    }
  }
`;