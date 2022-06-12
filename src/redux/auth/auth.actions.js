import { AuthActionTypes } from "./auth.types";

export const setAuthorized = () => ({
  type: AuthActionTypes.SET_AUTHORIZED,
});
export const setUnAuthorized = () => ({
  type: AuthActionTypes.SET_AUTHORIZED,
});
export const setUser = (user) => ({
  type: AuthActionTypes.SET_USER,
  payload: user,
});
