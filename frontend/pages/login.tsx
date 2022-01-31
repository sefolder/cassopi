import type { NextPage } from "next";
import Title from "../components/Title";
import { useState } from "react";
import QRCode from "qrcode.react";
import { getAddress } from "../api/useKlip";
import { getBalance } from "../api/useCaver";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

const Profile: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  //console.log("key", process.env.NEXT_PUBLIC_ACCESS_KEY_ID);

  return (
    <>
      <Title>Login</Title>
      <h1>Address: {address}</h1>
      <QRCode value={qrvalue} />

      <button
        onClick={() =>
          getAddress(setQrvalue, async (address) => {
            setAddress(address);
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
