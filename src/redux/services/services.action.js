import { ServicesActionTypes } from "./services.types";

export const setServices = (services) => ({
  type: ServicesActionTypes.SET_SERVICES,
  payload: services,
});
