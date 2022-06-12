import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./root-reducer";

// Custom logger
const logger = createLogger({
  collapsed: (getState, action) => true,

  // to show the difference between what changed in state
  diff: true,

  // to log time

  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => "#0f1842",
    prevState: () => "#de6f0d",
    action: () => "#6e13ab",
    nextState: () => "#1a9134",
  },
});

const middlewares = [logger];

const store = createStore(rootReducer);

export default store;
