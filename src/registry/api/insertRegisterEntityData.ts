import { gql, } from '@apollo/client';

export const INSERT_REGISTER_ENTITY = gql`
  mutation insert_register_entity_one($contract_id: uuid,
   $creator_id: uuid,
   $creator_name: String!,
   $deal_id: uuid!,
   $decimal_number: String,
   $gost_id: uuid,
   $main_architector_id: uuid,
   $product_owner_id: uuid,
   $status: String!
   $sub_type: String!,
   $type: String!,
   $organisation_implementer_id: uuid,
   $comment: String
   ) {
    insert_register_entity_one(
      object: {
        contract_id: $contract_id
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
        organisation_implementer_id: $organisation_implementer_id,
        comment: $comment
      }
    ) {
        id
    }
  }
`;
