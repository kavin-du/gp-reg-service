import { TokenData } from "./types";

export const getUser = (): TokenData => {
  const userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  return userData;
}