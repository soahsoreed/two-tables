import {gql} from "@apollo/client";

export const GET_GOST_DOCUMENTS = gql`
  query get_gost_documents{
  handbooks_gost_documents {
    code
    gost_id
    id
    name
    project_stage
    gost {
      gost_number
      name
      id
    }
  }
}

`;
