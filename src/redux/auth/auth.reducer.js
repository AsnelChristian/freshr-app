import { AuthActionTypes } from "./auth.types";

const INITIAL_STATE = {
  authorized: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTHORIZED:
      return {
        ...state,
        authorized: true,
      };
    case AuthActionTypes.SET_UNAUTHORIZED:
      return {
        ...state,
        authorized: false,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
