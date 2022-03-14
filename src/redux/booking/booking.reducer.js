import { BookingActionTypes } from "./booking.types";

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
  showCart: false,
  cartActionDesc: "",
  cartAction: {
    navigate: "",
  },
};

const camelize = (text) => {
  return text.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    function (match, p1, p2, offset) {
      if (p2) {
        return p2.toUpperCase();
      }
      return p1.toLowerCase();
    }
  );
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
      return { ...state, services: [] };
    case BookingActionTypes.SET_SHOW_CART:
      return { ...state, showCart: action.payload };
    default:
      return state;
  }
};
