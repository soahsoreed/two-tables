import { gql } from "@apollo/client";


export const GET_DEALS_DATA = gql`
  query get_all_deals_data {
    handbooks_deals {
      id
      deal_number
      started_at
      project_manager
      customer
      customer_organization_id
      developer_organization_id
      organization {
        id
        name
        code
      }
      developer_organization {
        id
        name
        code
      }
    }
  }
 `;
