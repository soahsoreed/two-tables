import { gql } from "@apollo/client";

export const GET_GOST_DOCUMENTS = gql`
  query MyQuery {
    handbooks_gost_documents {
      code
      gost_id
      project_stage
      id
      name
      gost {
        name
        gost_number
        id
      }
    }
}
`;
