import base64 from 'base-64';
import { TokenData } from "./types";

export const getUser = (): TokenData => {
  const userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  return userData;
}

export const checkAuth = (): boolean => {
  const accessToken = localStorage.getItem('access_token');
  if(!accessToken) {
    return false;
  }
  const payload = JSON.parse(
    base64.decode(accessToken.split('.')[1])
  );
  const expiry = payload.exp;
  return Math.floor(new Date().getTime() / 1000) < expiry;
}

export const logOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}