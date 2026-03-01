// import { gql } from "apollo-angular";

import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($userId: String!) {
    login(userId: $userId) {
      ok
    }
}`;



// type Query {
//     getUser(userId: String!): OkOutput
//   }
  
