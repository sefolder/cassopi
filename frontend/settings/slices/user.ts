import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  isLogin: boolean;
  //userName: string;
  userAddress: string;
}

//slice 안에 들어갈 내용은 name, init, reducers

const userInitialState = { 
  isLogin: false, 
  userName: "undefined",
  userAddress: "0x0000000000", //kakao klip address
  userBalance: "0" //klaytn token (coin)
};

// slice -> provides reducers and action creators
export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { isLogin, userAddress } = action.payload;
      state.isLogin = true;
      //state.userName = 백엔드에서 address별로 저장된 닉네임 가져오기
      state.userAddress = action.payload.userAddress;
      console.log("user logged in, address is ", state.userAddress);
    },
    logout: (state) => {
      state.isLogin = false;
      state.userName = "undefined";
      state.userAddress = "0x0000000000";
      state.userBalance = "0";
    },
    setUserBalance: (state, action: PayloadAction<string>) => {
      state.userBalance = action.payload;
    }
    /* 새로 닉네임 생성 시 userName에 닉네임 추가
    setusername: (state) => {
      //백엔드에서 닉네임 가져오기
    }*/
  },
});

// Action Creators for User Reducer

// export const userActions = userSlice.actions;

//export const { login, logout } = user.actions;
//export default user.reducer;
const { actions, reducer } = userSlice;
export const { login, logout, setUserBalance } = actions;

export default reducer;