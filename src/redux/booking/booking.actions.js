import { BookingActionTypes } from "./booking.types";

export const setSpecialist = (specialist) => ({
  type: BookingActionTypes.SET_SPECIALIST,
  payload: specialist,
});

export const addServiceToCart = (service) => ({
  type: BookingActionTypes.ADD_CART_ITEM,
  payload: service,
});

export const removeServiceFromCart = (service) => ({
  type: BookingActionTypes.REMOVE_CART_ITEM,
  payload: service,
});

export const toggleCart = (show) => ({
  type: BookingActionTypes.SET_SHOW_CART,
  payload: show,
});

export const clearCart = () => ({
  type: BookingActionTypes.CLEAR_CART,
});

export const selectFacility = (facility) => ({
  type: BookingActionTypes.SELECT_FACILITY,
  payload: facility,
});

export const setShowNext = (value) => ({
  type: BookingActionTypes.SET_SHOW_NEXT,
  payload: value,
});

export const setAllowNext = (value) => ({
  type: BookingActionTypes.SET_ALLOW_NEXT,
  payload: value,
});
