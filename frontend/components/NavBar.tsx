import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../settings/hooks";
import { userActions } from "../settings/store";

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.theme.navBarHeight};
  position: fixed;
  top: 0;
  left: 0;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 3px 20px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const NavBar = () => {
  const isLogin = useAppSelector((state) => state.isLogin);
  const userName = useAppSelector((state) => state.userName);
  const dispatch = useAppDispatch();

  // NavBar 로그인/로그아웃 Redux 사용 예시
  return (
    <Container>
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
    </Container>
  );
};

export default NavBar;
