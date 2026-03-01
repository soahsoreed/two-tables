import { gql } from "@apollo/client";

export const INSERT_MARKETING_MATERIAL_ONE = gql`
  mutation InsertMarketingMaterialOne(
    $created_at: date
    $creator_name: String!
    $link: String!
    $comment: String,
    $register_entity_id: uuid!
  ) {
    insert_marketing_materials_one(
      object: {
        created_at: $created_at
        creator_name: $creator_name
        link: $link
        comment: $comment,
        register_entity_id: $register_entity_id
      }
    ) {
      id
      created_at
      creator_name
      link
      comment
    }
  }
`;