import { gql } from "@apollo/client";

export const INSERT_DECIMAL_NUMBER = gql`
  query saveDecimalNumber($code: String) {
    saveDecimalNumber(code: $code) {
      code
      OKPD2
      number
      value
    }
  }
`;