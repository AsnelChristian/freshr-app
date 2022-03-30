import { FacilitiesActionTypes } from "./facilities.types";

export const setMatchingFacilities = (facilities) => ({
  type: FacilitiesActionTypes.SET_MATCHING_FACILITIES,
  payload: facilities,
});
