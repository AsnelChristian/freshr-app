import { BookingActionTypes } from "./booking.types";
import { camelize } from "../../utils/string-formatting";

const INITIAL_STATE = {
  specialist: null,
  services: [],
  servicesPerCategoryCnt: {
    haircut: 0,
    hairColoring: 0,
    scalpMassage: 0,
    beardSculpting: 0,
  },
  facility: null,
  meetingTime: null,
};

export const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingActionTypes.SET_SPECIALIST:
      return { ...state, specialist: action.payload };
    case BookingActionTypes.ADD_CART_ITEM: {
      const categoryStr = camelize(action.payload.category);
      return {
        ...state,
        services: [...state.services, action.payload],
        servicesPerCategoryCnt: {
          ...state.servicesPerCategoryCnt,
          [categoryStr]: state.servicesPerCategoryCnt[categoryStr] + 1,
        },
      };
    }
    case BookingActionTypes.REMOVE_CART_ITEM: {
      const categoryStr = camelize(action.payload.category);
      const newServices = state.services.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        services: newServices,
        servicesPerCategoryCnt: {
          ...state.servicesPerCategoryCnt,
          [categoryStr]: state.servicesPerCategoryCnt[categoryStr] - 1,
        },
      };
    }
    case BookingActionTypes.CLEAR_CART:
      return { ...INITIAL_STATE };
    case BookingActionTypes.SELECT_FACILITY:
      return { ...state, facility: action.payload };
    case BookingActionTypes.SET_MEETING_TIME:
      return { ...state, meetingTime: action.payload };
    default:
      return state;
  }
};
