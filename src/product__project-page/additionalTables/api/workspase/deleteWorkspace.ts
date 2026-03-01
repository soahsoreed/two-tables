import { gql } from "@apollo/client";

export const DELETE_WORKSPACE = gql`
  mutation UpdateWorkspaces(
    $id: uuid!
    $status: String
  ) {
    update_workspaces_by_pk(
      pk_columns: { id: $id }
      _set: {
        status: "delete"
      }
    ) {
      id
      status
    }
  }
`;