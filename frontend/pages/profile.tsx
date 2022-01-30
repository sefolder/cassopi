import type { NextPage } from "next";
import Title from "../components/Title";
import { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

const A2A_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";
const APP_NAME = "cassoPi";

const Profile: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);

  const getAddress = () => {
    axios
      .post(A2A_API_PREPARE_URL, {
        bapp: {
          name: APP_NAME,
        },
        type: "auth",
      })
      .then((response) => {
        const { request_key } = response.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
          axios
            .get(
              `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
            )
            .then((res) => {
              if (res.data.result) {
                console.log("result", JSON.stringify(res.data.result));
                //callback(res.data.result.klaytn_address);
                setAddress(res.data.result.klaytn_address);
                clearInterval(timerId);
              }
            });
        }, 1000);
      });
  };

  return (
    <>
      <Title>Profile</Title>
      <h1>Address: {address}</h1>
      <QRCode value={qrvalue} />
      <button onClick={getAddress}>Login</button>
    </>
  );
};

export default Profile;
