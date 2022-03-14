import { FacilitiesActionTypes } from "./facilities.types";

export const setMatchinFacilities = (facilities) => ({
  type: FacilitiesActionTypes.SET_MATCHING_FACILITIES,
  payload: facilities,
});
