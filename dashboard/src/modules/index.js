import { combineReducers } from "redux";
import firstsensor from "./firstsensor";
import secondsensor from "./secondsensor";
const rootReducer = combineReducers({
  firstsensor,
  secondsensor,
});

export default rootReducer;
