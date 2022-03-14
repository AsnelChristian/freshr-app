import { combineReducers } from "redux";
import { bookingReducer } from "./booking/booking.reducer";

export default combineReducers({
  booking: bookingReducer,
});
