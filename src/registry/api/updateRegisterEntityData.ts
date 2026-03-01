import { gql } from "@apollo/client";

export const UPDATE_REGISTER_ENTITY_BY_ID = gql`
  mutation update_register_entity_by_pk($id: uuid!, 
     $creator_id: uuid,
   $creator_name: String!,
   $deal_id: uuid!,
   $decimal_number: String,
   $gost_id: uuid!,
   $main_architector_id: uuid,
   $product_owner_id: uuid,
   $contract_id: uuid,
   $status: String!
   $sub_type: String!,
   $comment: String,
   $type: String!) {
    update_register_entity_by_pk(
     pk_columns: { id: $id }
     _set: { 
        creator_id: $creator_id
        creator_name: $creator_name,
        deal_id: $deal_id,
        decimal_number: $decimal_number,
        gost_id: $gost_id,
        main_architector_id: $main_architector_id,
        product_owner_id: $product_owner_id
        status: $status
        sub_type: $sub_type
        type: $type
        contract_id: $contract_id
        comment: $comment
        }
    ) {
      id
    }
  }
 `;
