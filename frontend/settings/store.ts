import { configureStore, createSlice } from "@reduxjs/toolkit";

const userInitialState = { isLogin: false, userName: "" };

// slice -> provides reducers and action creators
const userSlice = createSlice({
  name: "userReducer",
  initialState: userInitialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userName = "";
    },
  },
});

// Action Creators for User Reducer
export const userActions = userSlice.actions;

// Store Configuration
export const store = configureStore({ reducer: userSlice.reducer });

// type of state
export type RootState = ReturnType<typeof store.getState>;

// type of dispatch
export type AppDispatch = typeof store.dispatch;
