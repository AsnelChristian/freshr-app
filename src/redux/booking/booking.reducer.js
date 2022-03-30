import { BookingActionTypes } from "./booking.types";

const INITIAL_STATE = {
  specialist: null,
  facility: null,
  meetingTime: null,
  services: [],

  currentCategory: null,
  currentService: null,
  targetGender: "all",
  proGender: "all",
  priceRange: [8, 15],
  searchRadius: 3,
  sortBy: "",
  sortFacilitiesBy: "",
  step: 0,
};

export const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BookingActionTypes.SET_SPECIALIST: {
      if (state.specialist && state.specialist.id !== action.payload.id) {
        return {
          ...state,
          specialist: action.payload,
          services: [],
        };
      } else {
        return { ...state, specialist: action.payload };
      }
    }
    case BookingActionTypes.ADD_CART_ITEM: {
      return {
        ...state,
        services: [...state.services, action.payload],
        servicesPerCategoryCnt: {
          ...state.servicesPerCategoryCnt,
        },
      };
    }
    case BookingActionTypes.REMOVE_CART_ITEM: {
      const newServices = state.services.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        services: newServices,
      };
    }
    case BookingActionTypes.CLEAR_CART: {
      const selectedFacility = state.facility;
      return { ...INITIAL_STATE, facility: selectedFacility };
    }
    case BookingActionTypes.SELECT_FACILITY:
      return { ...state, facility: action.payload };
    case BookingActionTypes.SET_MEETING_TIME:
      return { ...state, meetingTime: action.payload };
    case BookingActionTypes.SET_STEP:
      return { ...state, step: action.payload };

    case BookingActionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
        currentService: null,
      };
    case BookingActionTypes.SET_CURRENT_SERVICE:
      return {
        ...state,
        currentService: action.payload.service,
        currentCategory: action.payload.category,
      };
    case BookingActionTypes.SET_TARGET_GENDER:
      return { ...state, targetGender: action.payload };
    case BookingActionTypes.SET_PRICE_RANGE:
      return { ...state, priceRange: action.payload };
    case BookingActionTypes.SET_SORT_METHOD:
      return { ...state, sortBy: action.payload };
    case BookingActionTypes.SET_SORT_FACILITY_METHOD:
      return { ...state, sortFacilitiesBy: action.payload };
    case BookingActionTypes.SET_SEARCH_RADIUS:
      return { ...state, searchRadius: action.payload };
    case BookingActionTypes.SET_PRO_GENDER:
      return { ...state, proGender: action.payload };
    default:
      return state;
  }
};
