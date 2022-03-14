import { combineReducers } from "redux";
import { bookingReducer } from "./booking/booking.reducer";
import { specialistsReducer } from "./specialists/specialists.reducer";
import { facilitiesReducer } from "./facilities/facilities.reducer";

export default combineReducers({
  booking: bookingReducer,
  specialists: specialistsReducer,
  facilities: facilitiesReducer,
});
