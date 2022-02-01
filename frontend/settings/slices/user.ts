import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  isLogin: boolean;
  //userName: string;
  userAddress: string;
}

//slice 안에 들어갈 내용은 name, init, reducers

const userInitialState = { 
  isLogin: false, 
  //userName: "",
  userAddress: "0x0000000000" //kakao klip address
};

// slice -> provides reducers and action creators
export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { isLogin, userAddress } = action.payload;
      state.isLogin = true;
      // state.userName = action.payload.userName;
      state.userAddress = action.payload.userAddress;
      console.log("user logged in, address is ", state.userAddress);
    },
    logout: (state) => {
      state.isLogin = false;
      //state.userName = "";
      state.userAddress = "0x0000000000";
    },
  },
});

// Action Creators for User Reducer

// export const userActions = userSlice.actions;

//export const { login, logout } = user.actions;
//export default user.reducer;
const { actions, reducer } = userSlice;
export const { login, logout } = actions;

export default reducer;