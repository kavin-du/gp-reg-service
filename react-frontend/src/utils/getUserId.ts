import { TokenData } from "./types";

export const getUserId = (): number => {
  const userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  return userData.sub;
}