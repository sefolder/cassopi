import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import { userSlice } from "./slices/user";
import reducer from "./slices/user";

// Store Configuration
export const store = configureStore({ 
  reducer: {
    user:userReducer,
  }
});

// type of state
export type RootState = ReturnType<typeof store.getState>;

// type of dispatch
export type AppDispatch = typeof store.dispatch;
