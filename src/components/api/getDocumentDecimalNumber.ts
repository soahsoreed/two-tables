import { gql } from "@apollo/client";

export const GET_DOCUMENT_DECIMAL_NUMBER = gql`
  query documentDecimalNumber($decimalNumber: String,
  $extraNumber: String
  $numberVersion: String
  $part: String,
  $tom: String,
  $code: String) {
    documentDecimalNumber(
    decimalNumber: $decimalNumber,
     extraNumber: $extraNumber,
      numberVersion: $numberVersion,
       part: $part,
        tom: $tom,
        code: $code) {
    code
    decimalNumber
    extraNumber
    numberVersion
    part
    value
    tom
  }
  }
`;