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
