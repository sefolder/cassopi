import type { NextPage } from "next";
import Title from "../components/Title";
import { useState } from "react";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";

const DEFAULT_QR_CODE = "DEFAULT";

const Create: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [qrOn, setQrOn] = useState(false);

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);

  return (
    <>
      <Title>Create</Title>
      <h1>Create</h1>
      {isLogin ? (
        <>
          <h1>Address: {userAddress}</h1>
          
        </>
        ) : (
        <>
          <h1>log in to use</h1>
        </>
      )}
    </>
  );
};

export default Create;
