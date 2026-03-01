import { gql } from "@apollo/client";


export const CREATE_GOST_DOCUMENT = gql`
  mutation insert_handbooks_gost_documents_one(
    $gostId: uuid!,
    $projectStage: String!,
    $code: String!,
    $name: String!,
  ) {
    insert_handbooks_gost_documents_one(
      object: {
        gost_id: $gostId, 
        project_stage: $projectStage,
        code: $code,
        name: $name,
      }
    ) {
      id
    }
  }
`;
