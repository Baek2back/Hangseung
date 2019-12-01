import { combineReducers } from "redux";
import firstsensor from "./firstsensor";
import secondsensor from "./secondsensor";
import thirdsensor from "./thirdsensor";
const rootReducer = combineReducers({
  firstsensor,
  secondsensor,
  thirdsensor,
});

export default rootReducer;
