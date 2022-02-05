import type { NextPage } from "next";
import Title from "../components/Title";
import { useState } from "react";
import QRCode from "qrcode.react";
import { getAddress } from "../api/useKlip";
import { getBalance } from "../api/useCaver";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
import { User, login, logout } from "../settings/slices/user";


const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";
const DEFAULT_BALANCE = "0";

const Profile: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  //console.log("key", process.env.NEXT_PUBLIC_ACCESS_KEY_ID);
  const [qrOn, setQrOn] = useState(false);
  const [balance, setBalance] = useState(DEFAULT_BALANCE);

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const dispatch = useAppDispatch();

  return (
    <>
      <Title>Login</Title>

      {isLogin ? (
        <>
          <h1>Address: {address}</h1>
          <h1>Balance: {balance} klay</h1>
          <br/>
          <button
            onClick={ () => {
              setQrOn(false);
              dispatch(logout())
              setQrvalue(DEFAULT_QR_CODE);
              setAddress(DEFAULT_ADDRESS);
              setBalance(DEFAULT_BALANCE);
            }}
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          {qrOn ? (
            <>
              <h1>Address: {address}</h1>
              <QRCode value={qrvalue} />
            </>
          ) : null }
          <br/>
          <br/>
          <button
            onClick={ async () =>
              {
                setQrOn(true);
                getAddress(setQrvalue, async (address) => {
                  setAddress(address);
                  const _user = {
                    isLogin: true,
                    userAddress: address
                  }
                  dispatch(login(_user as User))
                  setBalance(await getBalance(address))
                })
              }
            }
          >
          {qrOn ? (<>로그인 QR 코드 다시 받기</>) : (<>로그인 QR 코드 받기</>) }
          </button>
        </>
      )}
      
    </>
  );
};

export default Profile;
