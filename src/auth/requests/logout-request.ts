import { client } from "../../apollo/client";
import { getRefreshToken, removeAccessToken, removeRefreshToken } from "../token-access";
import { FETCH_POSTS } from "./FETCH_POSTS";
import { LOGOUT } from "./LOGOUT";

export function fetchPosts(): void {
  const options = {
    query: FETCH_POSTS,
  };

  client.query(options)
    // .then((response) => {
    // })
    // .catch(err => {
    //   console.(err);
    // });
}

export function logout(): void {
  const refreshToken = getRefreshToken();

  const options = {
    mutation: LOGOUT,
    variables: {
      refreshToken,
    }
  };

  client.mutate(options)
    .then(({ data }) => {
      if (data) {
        removeRefreshToken();
        removeAccessToken();
      }
    })
    .catch(() => {
      return
    });
}