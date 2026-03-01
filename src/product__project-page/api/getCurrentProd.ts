import { gql, } from '@apollo/client';

export const GET_PROD_BY_ID = gql`
  query GetProductById($id: uuid!) {
  register_entity_by_pk(id: $id) {
    contract_id
    created_date
    comment
    creator_name
    deal_id
    decimal_number
    gost_id
    id
    is_deleted
    main_architector_id
    marketing_materials {
      creator_name
      status 
      id
      comment
      link
      created_at
    }
    workspaces {
      creator_name
      status
      id
      comment
      link
      created_at
    }
    edu_materials {
      creator_name
      status 
      id
      comment
      link
      created_at
    }
    organisation_implementer_id
        organization {
      code
      id
      name
      counterparty
    }
    product_owner_id
      comment_on_delete
  comment_on_finished
  delete_date
    status
    sub_type
    type
    register_entity_documents {
      created_at
      decimal_number
      gost_document_id
      volume
      partNumber
      partNumberExecution
      additionalNumberExecution
      status
      comment_on_delete
      id
      link
      name
      product_id
      gost_id
            gost {
          gost_number
          id
          name
        }
      gost_document {
        code
        name
        project_stage
        id
      gost {
          gost_number
          id
          name
        }
      }
    }
    manager_architector {
      email
      id
      name
    }
    gost {
      gost_number
      id
      name
    }
    deal {
      customer_organization_id
      id
      developer_organization_id
      started_at
      customer
      deal_number
      project_manager
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
    contract {
      contract_number
      date_end
      date_start
      developer_organization_id
      id
      organization_id
      timezone
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
}
`;
