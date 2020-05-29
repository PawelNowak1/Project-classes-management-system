import { combineReducers } from "redux";
import auth from "./auth";
import context from "./context";

export default combineReducers({ auth,context });