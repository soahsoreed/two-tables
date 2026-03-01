import { gql } from "@apollo/client";

export const DELETE_EDU_MATERIAL = gql`
  mutation UpdateEduMaterial(
    $id: uuid!
    $status: String
  ) {
    update_edu_materials_by_pk(
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