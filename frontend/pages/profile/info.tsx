import type { NextPage } from "next";
import Title from "../../components/Title";
import styled from "styled-components";
import { useAppSelector } from "../../settings/hooks";

const Greeting = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 30px 30px 0px;

  div {
    font-weight: bold;
    font-size: 1.8rem;
  }

  span {
    color: gray;
  }
`;

const Info: NextPage = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);

  return (
    <>
      <Title>회원정보</Title>
      <Greeting>{"username"}님, 안녕하세요</Greeting>

      <Header>
        <BalanceContainer>
          <span>Balance</span>
          <div>{userBalance} KLAY</div>
        </BalanceContainer>
        <BalanceContainer>
          <span>Royalty</span>
          <div>0 KLAY</div>
        </BalanceContainer>
      </Header>
    </>
  );
};

export default Info;
