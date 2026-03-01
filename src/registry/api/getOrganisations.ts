import { gql } from "@apollo/client";


export const GET_ORGANISATIONS_DATA = gql`
  query get_all_organisation_data {
     handbooks_organizations {
      id
      name
      code
   }
  }
 `;
