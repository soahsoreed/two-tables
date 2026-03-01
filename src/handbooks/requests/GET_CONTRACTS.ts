import { gql } from "@apollo/client";

export const GET_CONTRACTS = gql`
  query MyQuery {
    handbooks_contracts {
      contract_number
      date_end
      date_start
      id
      organization_id
      timezone
      counterparty
      developer_organization_id
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
