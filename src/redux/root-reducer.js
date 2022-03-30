import { combineReducers } from "redux";
import { bookingReducer } from "./booking/booking.reducer";
import { specialistsReducer } from "./specialists/specialists.reducer";
import { facilitiesReducer } from "./facilities/facilities.reducer";
import { servicesReducer } from "./services/services.reducer";
import { categoriesReducer } from "./categories/categories.reducer";

export default combineReducers({
  booking: bookingReducer,
  specialists: specialistsReducer,
  services: servicesReducer,
  facilities: facilitiesReducer,
  categories: categoriesReducer,
});
