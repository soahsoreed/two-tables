import { gql } from "@apollo/client";

export const GET_MANAGERS_DATA = gql`
  query get_all_managers_data {
    handbooks_managers {
      id
      name
      email
    }
  }
 `;
