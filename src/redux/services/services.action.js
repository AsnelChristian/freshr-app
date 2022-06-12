import { ServicesActionTypes } from "./services.types";

export const setServices = (services) => ({
  type: ServicesActionTypes.SET_SERVICES,
  payload: services,
});

export const setServicesCategories = (categories) => ({
  type: ServicesActionTypes.SET_SERVICE_CATEGORIES,
  payload: categories,
});

export const setServicesTypes = (serviceTypes) => ({
  type: ServicesActionTypes.SET_SERVICE_TYPES,
  payload: serviceTypes,
});
