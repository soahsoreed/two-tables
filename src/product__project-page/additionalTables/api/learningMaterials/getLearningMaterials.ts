import { gql } from "@apollo/client";

export const GET_EDU_MATERIALS = gql`
  query GetEduMaterials {
    edu_materials {
      link
      creator_name
      created_at
      comment
    }
  }
`;