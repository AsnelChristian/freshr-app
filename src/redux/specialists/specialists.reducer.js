import { SpecialistsActionTypes } from "./specialists.types";

const INITIAL_STATE = {
  specialists: [],
};

export const specialistsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpecialistsActionTypes.SET_MATCHING_SPECIALISTS:
      return { ...state, specialists: action.payload };
    default:
      return state;
  }
};
