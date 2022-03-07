import Link from "next/link";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
//import { userActions } from "../settings/store";

import searchIcon from "../public/search.svg";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { navList, userNavList } from "../settings/navlists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../settings/slices/user";

// > 1080 : desktop
// > 800 : tablet
// > 480 : phone


const Container = styled.div`
  width: 100%;
  height: ${(props) => props.theme.navBarHeight};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 3px 20px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const InnerContainer = styled.div`
  width: 1080px;
  height: 100%;
  margin: 0 auto;
  padding: 0 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 50px;
  }
  @media (max-width: 860px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 50px;
  }
  /* @media (max-width: 480px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 50px;
  } */

`;

const NavBarLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavBarRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const TempLogo = styled.div`
  width: 30px;
  height: 30px;
  background-color: #d6d6d6;
  border-radius: 50%;
  margin-right: 10px;
`;

const Subtitle = styled.span`
  visibility: visible;
  @media (max-width: 1080px) {

  }
  @media (max-width: 860px) {
    visibility: hidden;
  }
`

const KlayWord = styled.span`
  margin-left: 10px;
  font-size: 1.2em;
  @media (max-width: 1080px) {
    font-size: 1em;
  }
  @media (max-width: 860px) {
    
  }
`

const HomeLink = styled.a`
  height: inherit;
  display: flex;
  align-items: center;
  margin-right: 27px;

  span {
    font-size: 25px;
    font-weight: 900;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;

  width: 430px;
  height: inherit;
  margin-right: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 0 15px;

  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;

  &:is(:focus, :active) {
    outline: none;
  }

  &:is(:focus, :active, :hover) {
    box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #b0b0b0;
    font-weight: 300;
    letter-spacing: -0.5px;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0px 30px;
`;

const NavLi = styled.li`
  margin-right: 15px;
  &:last-child {
    margin: 0;
  }
`;

const NavBtn = styled.a<{ isCurrent: boolean }>`
  font-size: 17px;
  color: ${(props) => (props.isCurrent ? "black" : "rgba(0,0,0,0.6)")};
  transition: color 0.1s ease-in-out;

  &:hover {
    color: black;
  }
`;

const LoginBtn = styled.button<{ isLogin: boolean }>`
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme.klipColor};
  height: 40px;
  width: 150px;
  transition: opacity 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 90%;
  }

  svg {
    height: 12px;
    margin-right: 5px;
  }
  span {
    color: white;
    font-size: 12px;
    font-weight: 400;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const UserList = styled.ul`
  position: absolute;
  background-color: white;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  width: 100px;
  height: max-content;
  padding: 10px 0;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);

  visibility: hidden;
  opacity: 0;
  transition: all 0.1s ease-in-out;
`;

const UserLi = styled.li`
  margin: 0 auto;
  width: 100%;
  background-color: white;
  transition: background-color 0.1s ease-in-out;
  a,
  span {
    display: block;
    margin: 0 auto;
    padding: 7px 0;
    font-size: 15px;
    font-weight: 300;
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const UserContainer = styled.div`
  position: relative;
  &:hover ${UserList} {
    visibility: visible;
    opacity: 1;
  }
`;

const UserIcon = styled.a`
  position: relative;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.5);
  transition: color 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const NavBar = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userAddress = useAppSelector((state) => state.user.userAddress);
  const userBalance = useAppSelector((state) => state.user.userBalance);
  //const userName = useAppSelector((state) => state.user.userName);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchInput = useInput("");

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/market",
      query: {
        search: searchInput.value,
      },
    });
  };

  const onLoginClick = () => {
    router.push("/login");
  };

  return (
    <Container>
      <InnerContainer>
        <NavBarLeft>
          <Link href="/" passHref>
            <HomeLink>
              <object
                type="image/svg+xml"
                data="templogo5.svg"
                className="logo"
                width="35"
                height="35"
              >
                Logo
              </object>
              <span style={{ paddingLeft: "10px" }}>cassoPi</span>
            </HomeLink>
          </Link>
          <Subtitle>유명 예술가를 꿈꾸는 이들을 위하여</Subtitle>
          {/* <SearchForm onSubmit={onSearchSubmit}>
            <SearchInput placeholder="cassoPi에서 검색..." {...searchInput} />
            <SearchBtn>
              <Image src={searchIcon} alt="search" />
            </SearchBtn>
          </SearchForm> */}
          
        </NavBarLeft>
        <NavBarRight>
        <NavList>
            {navList.map(({ id, pathname, name }) => (
              <NavLi key={id}>
                <Link passHref href={pathname}>
                  <NavBtn isCurrent={router.pathname === pathname}>
                    {name}
                  </NavBtn>
                </Link>
              </NavLi>
            ))}
          </NavList>
          {isLogin ? (
            <UserContainer>
              <Link href="/profile" passHref>
                <UserIcon>
                  <FontAwesomeIcon icon={faUserCircle} />
                </UserIcon>
              </Link>
              <UserList>
                {userNavList.map(({ id, pathname, name }) => (
                  <UserLi key={id}>
                    <Link href={pathname}>
                      <a>{name}</a>
                    </Link>
                  </UserLi>
                ))}
                <UserLi
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <span>로그아웃</span>
                </UserLi>
              </UserList>
              <KlayWord>
                {userBalance}KLAY
              </KlayWord>
            </UserContainer>
          ) : (
            <LoginBtn isLogin={isLogin} onClick={onLoginClick}>
              <svg
                width="26"
                height="14"
                viewBox="0 0 26 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.3683 3.55054L25.3362 3.39516C24.9951 1.76959 23.5998 0.770813 21.6728 0.770813L17.5377 0.771106L4.34028 0.771252C2.41327 0.771252 1.00439 1.78116 0.663287 3.40673L0.631207 3.56211C0.570137 3.91652 0.539676 4.2696 0.541589 4.70031V9.25001C0.543943 9.81559 0.601628 10.2196 0.602217 10.2236L0.604572 10.2407C0.831781 12.1119 2.22815 13.2291 4.34028 13.2291H16.1484H16.1859H16.8686C16.869 13.2291 16.8693 13.2289 16.8696 13.2289C16.8697 13.2289 16.87 13.229 16.8702 13.229C16.9795 13.229 17.0681 13.1408 17.0681 13.0322C17.0681 13.032 17.068 13.0319 17.068 13.0317C17.068 13.0313 17.0683 13.0309 17.0683 13.0303V5.66393C17.0683 5.66335 17.068 5.66291 17.068 5.66232C17.068 5.66218 17.0681 5.66218 17.0681 5.66203C17.0681 5.55337 16.9795 5.46506 16.8702 5.46506C16.8699 5.46506 16.8696 5.46535 16.8693 5.46535C16.869 5.46535 16.8689 5.4652 16.8686 5.4652H16.1484C16.1481 5.4652 16.1479 5.46535 16.1477 5.46535C16.1472 5.46535 16.1466 5.46506 16.1462 5.46506C16.0368 5.46506 15.9483 5.55322 15.9483 5.66188C15.9483 5.66247 15.9485 5.66291 15.9485 5.6635C15.9485 5.66364 15.9485 5.66379 15.9485 5.66393V12.1204H4.62002C2.74408 12.1204 1.66719 10.9813 1.66586 9.2894L1.66704 4.68976C1.66704 2.9832 2.74319 1.88338 4.62002 1.88338L19.5776 1.88323L21.3941 1.88338C23.2709 1.88338 24.3345 2.97163 24.3345 4.67834L24.3357 9.27769C24.3342 10.9697 23.2688 12.1145 21.393 12.1145L21.0091 12.1198C20.8502 12.1208 20.7118 12.1217 20.5514 12.1224C20.5514 12.1224 20.3365 12.1223 20.336 12.1223C20.2268 12.1223 20.1382 12.2105 20.1382 12.3191C20.1382 12.3199 20.1378 12.3204 20.1378 12.3212V13.0276C20.1378 13.0278 20.1379 13.0279 20.1379 13.0281C20.1379 13.0287 20.1376 13.029 20.1376 13.0294C20.1376 13.1381 20.2262 13.2262 20.3356 13.2262C20.3357 13.2262 20.4793 13.2264 20.4793 13.2264L20.8384 13.2255C20.9061 13.2249 20.9741 13.2243 21.0416 13.2233H21.6728C23.7849 13.2233 25.1677 12.1005 25.3949 10.2292L25.3973 10.212C25.3979 10.2081 25.4556 9.80402 25.4579 9.23844V4.68874C25.4598 4.25803 25.4294 3.90495 25.3683 3.55054Z"
                  fill="white"
                />
              </svg>
              <span>Klip으로 로그인</span>
            </LoginBtn>
          )}
        </NavBarRight>
      </InnerContainer>
    </Container>
  );
};

export default NavBar;
