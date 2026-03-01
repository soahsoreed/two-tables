import { gql } from "@apollo/client";

export const DELETE_MARKETING_MATERIAL = gql`
  mutation UpdateMarketingMaterial(
    $id: uuid!
    $status: String
  ) {
    update_marketing_materials_by_pk(
      pk_columns: { id: $id }
      _set: {
        status: "delete"
      }
    ) {
      id
      status
    }
  }
`;