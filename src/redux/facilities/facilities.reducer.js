import { FacilitiesActionTypes } from "./facilities.types";

const INITIAL_STATE = {
  facilities: [],
};

export const facilitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FacilitiesActionTypes.SET_MATCHING_FACILITIES:
      return { ...state, facilities: action.payload };
    default:
      return state;
  }
};
