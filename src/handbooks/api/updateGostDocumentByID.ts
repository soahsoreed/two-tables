import { gql } from "@apollo/client";

export const UPDATE_GOST_DOCUMENT = gql`
  mutation updateGostDocumentByPk(
    $id: uuid!
    $gostId: uuid!
    $name: String!
    $projectStage: String!
    $code: String!
  ) {
    update_handbooks_gost_documents_by_pk(
      pk_columns: { id: $id }
      _set: {
        gost_id: $gostId
        name: $name
        project_stage: $projectStage
        code: $code
      }
    ) {
      id
      gost_id
      name
      project_stage
      code
    }
  }
`;