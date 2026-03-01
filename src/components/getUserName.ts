import { KeycloakUser } from "../interfaces.ts";

export function getUserName(user: KeycloakUser) {
  if (user && user.given_name && user.family_name) {
    return `${user.given_name} ${user.family_name}`
  } else {
    return '';
  }
}