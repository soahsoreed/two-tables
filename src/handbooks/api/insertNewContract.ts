import { gql } from "@apollo/client";

export const CREATE_CONTRACT = gql`
  mutation insert_handbooks_contracts_one($contract_number: String!, $developer_organization_id: uuid!, $counterparty: String!, $date_start: String!) {
    insert_handbooks_contracts_one(object: {
      contract_number: $contract_number,
      developer_organization_id: $developer_organization_id,
      counterparty: $counterparty,
      date_start: $date_start
    }) {
      id
    }
  }
`;