import { ServicesActionTypes } from "./services.types";

const INITIAL_STATE = {
  services: [],
};

export const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServicesActionTypes.SET_SERVICES:
      return { ...state, services: action.payload };
    default:
      return state;
  }
};
