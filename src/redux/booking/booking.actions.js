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

export const clearCart = () => ({
  type: BookingActionTypes.CLEAR_CART,
});

export const selectFacility = (facility) => ({
  type: BookingActionTypes.SELECT_FACILITY,
  payload: facility,
});

export const setMeetingTime = (time) => ({
  type: BookingActionTypes.SET_MEETING_TIME,
  payload: time,
});

export const setBookingStep = (step) => ({
  type: BookingActionTypes.SET_STEP,
  payload: step,
});

export const setCurrentCategory = (category) => ({
  type: BookingActionTypes.SET_CURRENT_CATEGORY,
  payload: category,
});

export const setCurrentService = (service, category) => ({
  type: BookingActionTypes.SET_CURRENT_SERVICE,
  payload: {
    service: service,
    category: category,
  },
});

export const setTargetGender = (target) => ({
  type: BookingActionTypes.SET_TARGET_GENDER,
  payload: target,
});

export const setProGender = (gender) => ({
  type: BookingActionTypes.SET_PRO_GENDER,
  payload: gender,
});

export const setCurrentPriceRange = (range) => ({
  type: BookingActionTypes.SET_PRICE_RANGE,
  payload: range,
});

export const setSortMethod = (method) => ({
  type: BookingActionTypes.SET_SORT_METHOD,
  payload: method,
});

export const setSortFacilityMethod = (method) => ({
  type: BookingActionTypes.SET_SORT_FACILITY_METHOD,
  payload: method,
});

export const setShowResults = (show) => ({
  type: BookingActionTypes.SET_SHOW_RESULTS,
  payload: show,
});

export const setSearchRadius = (radius) => ({
  type: BookingActionTypes.SET_SEARCH_RADIUS,
  payload: radius,
});
