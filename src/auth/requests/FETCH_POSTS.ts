import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
    query MyQuery {
            posts {
            text
            id
        }
    };
`;
