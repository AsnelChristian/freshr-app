import { ServicesActionTypes } from "./services.types";

const INITIAL_STATE = {
  services: [],
  serviceCategories: [],
  serviceTypes: [],
};

export const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServicesActionTypes.SET_SERVICES:
      return { ...state, services: action.payload };
    case ServicesActionTypes.SET_SERVICE_CATEGORIES:
      return { ...state, serviceCategories: action.payload };
    case ServicesActionTypes.SET_SERVICE_TYPES:
      return { ...state, serviceTypes: action.payload };
    default:
      return state;
  }
};
