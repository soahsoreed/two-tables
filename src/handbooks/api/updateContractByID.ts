import { gql } from "@apollo/client";

export const UPDATE_CONTRACTS = gql`
  mutation UpdateHandbooksContracts(
    $id: uuid!
    $counterparty: String
    $date_start: String
    $developer_organization_id: uuid
    $contract_number: String
  ) {
    update_handbooks_contracts_by_pk(
      pk_columns: { id: $id }
      _set: {
        counterparty: $counterparty
        date_start: $date_start
        developer_organization_id: $developer_organization_id
        contract_number: $contract_number
      }
    ) {
      id
      counterparty
      date_start
      developer_organization_id
      contract_number
    }
  }
`;