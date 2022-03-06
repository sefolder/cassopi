import type { NextPage } from "next";
import Image from "next/image";
import Title from "../components/Title";
import { useState } from "react";
import QRCode from "qrcode.react";
import { getAddress } from "../api/useKlip";
import { getBalance } from "../api/useCaver";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
import { User, login, logout, setUserBalance } from "../settings/slices/user";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Link from "next/link";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";
const DEFAULT_BALANCE = "0";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 30px;
  margin-right: 10px;
`;

const AddressBox = styled.div`
  padding: 15px;
  border-radius: 6px;
  background-color: #73d1be;
  color: white;
  display: flex;
  margin: 30px;
`;

const Btn = styled.button`
  border-radius: 6px;
  border: none;
  background-color: ${(props) => props.theme.klipColor};
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 13px;
  margin-top: 30px;
  margin-bottom: 150px;
  transition: opacity 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 90%;
  }
`;

const Profile: NextPage = () => {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  //console.log("key", process.env.NEXT_PUBLIC_ACCESS_KEY_ID);
  const [qrOn, setQrOn] = useState(false);
  const [balance, setBalance] = useState(DEFAULT_BALANCE);
  const [_, setCookie] = useCookies(["userAddress"]);

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);
  const dispatch = useAppDispatch();

  const checkBalance = async () => {
    let _balance = await getBalance(userAddress);
    setBalance(_balance);
    dispatch(setUserBalance(_balance));
  };

  return (
    <Container>
      <Title>Login</Title>

      {isLogin ? (
        <>
          <AddressBox>Address: {userAddress}</AddressBox>
          <h1>로그인이 완료되었습니다.</h1>
          {/* <h1>
            Balance: {userBalance} klay{" "}
            <button onClick={checkBalance}> 새로고침 </button>
          </h1> */}

          <br />
          <Link href="/market">
            <a>
              <Btn>마켓 둘러보기</Btn>
            </a>
          </Link>
        </>
      ) : (
        <>
          {qrOn ? (
            <>
              <AddressBox>Address: {userAddress}</AddressBox>
              <QRCode value={qrvalue} />
            </>
          ) : null}
          <br />
          <br />
          <Btn
            onClick={async () => {
              setQrOn(true);
              getAddress(setQrvalue, async (address) => {
                setAddress(address);
                let _balance = await getBalance(address);
                setBalance(_balance);
                const _user = {
                  userAddress: address,
                  userBalance: _balance,
                  userName: "홍길동",
                };
                dispatch(login(_user as User));
              });
            }}
          >
            <Icon icon={faQrcode} />
            {qrOn ? <>로그인 QR 코드 다시 받기</> : <>로그인 QR 코드 받기</>}
          </Btn>
          <Image
            src="login_guide.png"
            alt="login guide image"
            width={780}
            height={400}
          />
        </>
      )}
    </Container>
  );
};

export default Profile;
