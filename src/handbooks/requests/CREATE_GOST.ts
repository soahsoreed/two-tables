import { gql } from "@apollo/client";

export const CREATE_GOST = gql`
  mutation insert_handbooks_gost_one($gostNumber: String!, $name: String) {
    insert_handbooks_gost_one(object: {gost_number: $gostNumber, name: $name}) {
      id
    }
  }
`;

