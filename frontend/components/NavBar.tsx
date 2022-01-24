import Link from "next/link";
import styled from "styled-components";
import { useAppDispatch, useAppSelector, useInput } from "../settings/hooks";
import { userActions } from "../settings/store";

import searchIcon from "../assets/search.svg";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import navlist from "../settings/navlist";

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.theme.navBarHeight};
  position: fixed;
  top: 0;
  left: 0;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 3px 20px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const InnerContainer = styled.div`
  width: 1080px;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

const NavBar = () => {
  const isLogin = useAppSelector((state) => state.isLogin);
  const userName = useAppSelector((state) => state.userName);
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

  return (
    <Container>
      <InnerContainer>
        <NavBarLeft>
          <Link href="/" passHref>
            <HomeLink>
              <TempLogo />
              <span>cassoPi</span>
            </HomeLink>
          </Link>
          <SearchForm onSubmit={onSearchSubmit}>
            <SearchInput placeholder="cassoPi에서 검색..." {...searchInput} />
            <SearchBtn>
              <Image src={searchIcon} alt="search" />
            </SearchBtn>
          </SearchForm>
          <NavList>
            {navlist.map(({ id, pathname, name }) => (
              <NavLi key={id}>
                <Link passHref href={pathname}>
                  <NavBtn isCurrent={router.pathname === pathname}>
                    {name}
                  </NavBtn>
                </Link>
              </NavLi>
            ))}
          </NavList>
        </NavBarLeft>
        <NavBarRight>
          {/* NavBar 로그인/로그아웃 Redux 사용 예시 */}
          <button
            onClick={() => {
              dispatch(userActions.login({ userName: "유정민" }));
              console.log(isLogin, userName);
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              dispatch(userActions.logout());
              console.log(isLogin, userName);
            }}
          >
            Logout
          </button>
        </NavBarRight>
      </InnerContainer>
    </Container>
  );
};

export default NavBar;
