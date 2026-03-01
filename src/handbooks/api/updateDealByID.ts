import { gql } from "@apollo/client";

export const UPDATE_DEALS = gql`
  mutation UpdateHandbooksDeals(
    $id: uuid!
    $started_at: date
    $project_manager: String
    $deal_number: String
    $customer: String
  ) {
    update_handbooks_deals_by_pk(
      pk_columns: { id: $id }
      _set: {
        started_at: $started_at
        project_manager: $project_manager
        deal_number: $deal_number
        customer: $customer
      }
    ) {
      id
      started_at
      project_manager
      deal_number
      customer
    }
  }
`;