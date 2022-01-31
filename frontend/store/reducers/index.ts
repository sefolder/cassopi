import { combineReducers } from "redux";
import counter from "./count"; //example

const rootReducer = combineReducers({
    counter //example
});

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;