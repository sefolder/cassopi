import type { NextPage } from "next";
import Title from "../components/Title";
import { useState } from "react";
import QRCode from "qrcode.react";
import { getAddress } from "../api/useKlip";
import { getBalance } from "../api/useCaver";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
import { User, login } from "../settings/slices/user";


const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

const Profile: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  //console.log("key", process.env.NEXT_PUBLIC_ACCESS_KEY_ID);

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const dispatch = useAppDispatch();

  return (
    <>
      <Title>Login</Title>
      <h1>Address: {address}</h1>
      <QRCode value={qrvalue} />

      <button
        onClick={() =>
          getAddress(setQrvalue, async (address) => {
            setAddress(address);
            const _user = {
              isLogin: true,
              userAddress: address
            }
            dispatch(login(_user as User))
            const _balance = await getBalance(address);
          })
        }
      >
        Login
      </button>
    </>
  );
};

export default Profile;
