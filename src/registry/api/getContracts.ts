import { gql } from "@apollo/client";

export const GET_CONTRACTS_DATA = gql`
  query get_all_contracts_data {
     handbooks_contracts {
    id
    contract_number
    date_end
    date_start
    timezone
    counterparty
    developer_organization_id
    organization_id
    developer_organization {
      code
      id
      name
    }
    organization {
      code
      id
      name
    }
  }
  }
 `;
