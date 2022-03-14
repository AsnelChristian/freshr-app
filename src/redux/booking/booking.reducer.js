import { BookingActionTypes } from "./booking.types";

const INITIAL_STATE = {
  specialist: null,
  services: [],
  facility: null,
  meetingTime: null,
  showCart: false,
  cartActionDesc: "",
  cartAction: {
    navigate: "",
  },
};

export const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingActionTypes.SET_SPECIALIST:
      return { ...state, specialist: action.payload };
    case BookingActionTypes.ADD_CART_ITEM:
      return { ...state, services: [...state.services, action.payload] };
    case BookingActionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        services: state.services.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case BookingActionTypes.CLEAR_CART:
      return { ...state, services: [] };
    case BookingActionTypes.SET_SHOW_CART:
      return { ...state, showCart: action.payload };
    default:
      return state;
  }
};
