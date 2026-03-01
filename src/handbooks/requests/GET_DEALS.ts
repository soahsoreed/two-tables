import { gql } from "@apollo/client";

// export const GET_DEALS = gql`
//   query MyQuery {
//     handbooks_deals {
//       id
//       deal_number
//       customer_organization_id
//       developer_organization_id
//     }
//   }
// `;

export const GET_DEALS = gql`
  query MyQuery {
    handbooks_deals {
    
      customer_organization_id
      deal_number
      developer_organization_id
      id
      customer
      project_manager
      started_at
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

// query MyQuery {
//   handbooks_deals {
//     customer_organization_id
//     deal_number
//     developer_organization_id
//     id
//     project_manager
//     started_at
//     developer_organization {
//       code
//       id
//       name
//     }
//     organization {
//       code
//       id
//       name
//     }
//   }
// }



// в сделке живут: заказчик, руководитель проекта продукта