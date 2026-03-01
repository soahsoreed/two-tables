import { gql } from "@apollo/client";


export const CREATE_MANAGER = gql`
  mutation insert_handbooks_managers_one($name: String!, $email: String) {
    insert_handbooks_managers_one(
      object: {name: $name, email: $email}) {
      id
    }
  }
`;

// export const CREATE_GOST = gql`
//   mutation insert_handbooks_gost_one($gostNumber: String!, $name: String) {
//     insert_handbooks_gost_one(object: {gost_number: $gostNumber, name: $name}) {
//       id
//     }
//   }
// `;

