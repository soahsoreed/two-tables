import { gql } from "@apollo/client";

export const CREATE_DEAL = gql`
  mutation insert_handbooks_deals($customer: String!, $deal_number: String!, $project_manager: String, $started_at: date) {
    insert_handbooks_deals(objects: {
      customer: $customer, 
      deal_number: $deal_number,
      project_manager: $project_manager,
      started_at: $started_at
    }) {
      affected_rows
    }
  }
`;