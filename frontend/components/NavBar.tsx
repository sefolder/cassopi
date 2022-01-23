import { useAppDispatch, useAppSelector } from "../settings/hooks";
import { userActions } from "../settings/store";

const NavBar = () => {
  const isLogin = useAppSelector((state) => state.isLogin);
  const userName = useAppSelector((state) => state.userName);
  const dispatch = useAppDispatch();

  // NavBar 로그인/로그아웃 Redux 사용 예시
  return (
    <>
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
    </>
  );
};

export default NavBar;
