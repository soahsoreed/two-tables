import { gql } from "@apollo/client";

export const UPDATE_EDU_MATERIAL = gql`
  mutation UpdateEduMaterial(
    $id: uuid!
    $comment: String
    $link: String
  ) {
    update_edu_materials_by_pk(
      pk_columns: { id: $id }
      _set: {
        comment: $comment
        link: $link
      }
    ) {
      id
      comment
      link
    }
  }
`;