import { gql } from "@apollo/client";


export const GET_GOSTS_DATA = gql`
  query get_all_gosts_data {
    handbooks_gost {
      id
      gost_number
      name
    }
  }
 `;
