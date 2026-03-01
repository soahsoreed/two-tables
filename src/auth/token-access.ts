import { IAuthServerResponse } from "./models/auth-server-response";

const TOKEN_STORAGE_KEY = 'ariadna_a_t';
const REFRESH_TOKEN_STORAGE_KEY = 'ariadna_r_t';

export function getAccessToken() {
  const token = window.localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  return token;
}

export function setAccessToken(accessToken: string) {
  if (accessToken) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) || '';
}

export function setRefreshToken(refreshToken: string) {
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }
}

export function removeAccessToken() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function removeRefreshToken() {
  window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

export function setTokens(data: IAuthServerResponse) {
  setAccessToken(data.access_token);
  setRefreshToken(data.refresh_token);
}