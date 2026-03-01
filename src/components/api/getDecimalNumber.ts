import { gql } from "@apollo/client";

export const GET_DECIMAL_NUMBER = gql`
  query decimalNumber($code: String) {
    decimalNumber(code: $code) {
      code
      OKPD2
      number
      value
    }
  }
`;